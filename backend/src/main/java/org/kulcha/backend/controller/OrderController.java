package org.kulcha.backend.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.config.KulchaProperties;
import org.kulcha.backend.dto.OrderCheckoutRequest;
import org.kulcha.backend.dto.OrderDto;
import org.kulcha.backend.dto.OrderStatusPatchDto;
import org.kulcha.backend.exception.OrderNotFoundException;
import org.kulcha.backend.model.Courier;
import org.kulcha.backend.model.Order;
import org.kulcha.backend.model.Restaurant;
import org.kulcha.backend.model.User;
import org.kulcha.backend.model.enums.OrderStatus;
import org.kulcha.backend.service.OrderPlacementService;
import org.kulcha.backend.service.OrderService;
import org.kulcha.backend.service.StaffAccessService;
import org.kulcha.backend.service.UserService;
import org.kulcha.backend.telegram.MiniAppAuthHelper;
import org.kulcha.backend.telegram.TelegramWebAppService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final OrderPlacementService orderPlacementService;
    private final TelegramWebAppService telegramWebAppService;
    private final KulchaProperties kulchaProperties;
    private final UserService userService;
    private final StaffAccessService staffAccessService;
    private final MiniAppAuthHelper miniAppAuthHelper;

    @GetMapping
    public List<OrderDto> getAll(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) Long restaurantId,
            @RequestParam(required = false) OrderStatus status,
            @RequestHeader(value = "X-Telegram-Init-Data", required = false) String initData) {
        if (userId != null) {
            long dbId = miniAppAuthHelper.requireCustomerDbUserId(initData);
            if (dbId != userId) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Cannot read other users orders");
            }
            return orderService.findAllByUserIdDetailed(userId).stream().map(this::toDto).toList();
        }
        if (restaurantId != null) {
            requireRestaurantStaff(initData, restaurantId);
            return orderService.findAllByRestaurantIdDetailed(restaurantId).stream().map(this::toDto).toList();
        }
        if (status != null) {
            return orderService.findAllByStatusDetailed(status).stream().map(this::toDto).toList();
        }
        return orderService.findAll().stream().map(this::toDto).toList();
    }

    @GetMapping("/{id}")
    public OrderDto getById(
            @PathVariable Long id,
            @RequestHeader(value = "X-Telegram-Init-Data", required = false) String initData,
            @RequestHeader(value = "X-Kulcha-Internal-Secret", required = false) String internalSecret) {
        Order order =
                orderService.findDetailedById(id).orElseThrow(() -> new OrderNotFoundException(id));
        if (kulchaProperties.isInternalOk(internalSecret)) {
            return toDto(order);
        }
        if (initData == null || initData.isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Telegram init data required");
        }
        try {
            var tgAdm = telegramWebAppService.requireUser(initData, kulchaProperties.getTelegram().getAdminBotToken());
            User adminUser = userService
                    .findById(tgAdm.id())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Unknown user"));
            staffAccessService.requireRestaurantStaff(adminUser.getId(), order.getRestaurant().getId());
            return toDto(order);
        } catch (ResponseStatusException ex) {
            if (ex.getStatusCode().value() != HttpStatus.UNAUTHORIZED.value()) {
                throw ex;
            }
        }
        long dbId = miniAppAuthHelper.requireCustomerDbUserId(initData);
        if (!order.getUser().getId().equals(dbId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }
        return toDto(order);
    }

    @PostMapping("/checkout")
    @ResponseStatus(HttpStatus.CREATED)
    public OrderDto checkout(
            @RequestHeader("X-Telegram-Init-Data") String initData, @RequestBody OrderCheckoutRequest body) {
        long dbUserId = miniAppAuthHelper.requireCustomerDbUserId(initData);
        Order saved = orderPlacementService.checkout(dbUserId, body);
        return orderService.findDetailedById(saved.getId()).map(this::toDto).orElseThrow();
    }

    @PutMapping("/{id}")
    public OrderDto update(
            @PathVariable Long id,
            @RequestBody OrderDto dto,
            @RequestHeader("X-Telegram-Init-Data") String adminInitData) {
        Order existing =
                orderService.findDetailedById(id).orElseThrow(() -> new OrderNotFoundException(id));
        requireRestaurantStaff(adminInitData, existing.getRestaurant().getId());
        return toDto(orderService.update(id, toEntity(dto)));
    }

    @PatchMapping("/{id}/status")
    public OrderDto patchStatus(
            @PathVariable Long id,
            @RequestBody OrderStatusPatchDto patch,
            @RequestHeader("X-Kulcha-Internal-Secret") String secret) {
        kulchaProperties.requireInternalSecret(secret);
        if (patch.getStatus() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "status required");
        }
        return toDto(orderService.updateStatus(id, patch.getStatus()));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        orderService.deleteById(id);
    }

    private void requireRestaurantStaff(String initData, long restaurantId) {
        User u = miniAppAuthHelper.requireAdminUser(initData);
        staffAccessService.requireRestaurantStaff(u.getId(), restaurantId);
    }

    private OrderDto toDto(Order order) {
        return new OrderDto(
                order.getId(),
                order.getStatus(),
                order.getUser().getId(),
                order.getDeliveryAddress(),
                order.getRestaurant().getId(),
                order.getCreatedAt(),
                order.getUpdatedAt(),
                order.getCourier() == null ? null : order.getCourier().getId(),
                order.getOrderType(),
                order.getItemsTotal(),
                order.getDeliveryFee(),
                order.getServiceFee(),
                order.getTotal());
    }

    private Order toEntity(OrderDto dto) {
        Order order = new Order();
        order.setId(dto.getId());
        order.setStatus(dto.getStatus());
        order.setUser(userRef(dto.getUserId()));
        order.setDeliveryAddress(dto.getDeliveryAddress());
        order.setRestaurant(restaurantRef(dto.getRestaurantId()));
        order.setCreatedAt(dto.getCreatedAt());
        order.setUpdatedAt(dto.getUpdatedAt());
        order.setCourier(dto.getCourierId() == null ? null : courierRef(dto.getCourierId()));
        order.setOrderType(dto.getOrderType());
        order.setItemsTotal(dto.getItemsTotal());
        order.setDeliveryFee(dto.getDeliveryFee());
        order.setServiceFee(dto.getServiceFee());
        order.setTotal(dto.getTotal());
        return order;
    }

    private User userRef(Long id) {
        User user = new User();
        user.setId(id);
        return user;
    }

    private Restaurant restaurantRef(Long id) {
        Restaurant restaurant = new Restaurant();
        restaurant.setId(id);
        return restaurant;
    }

    private Courier courierRef(Long id) {
        Courier courier = new Courier();
        courier.setId(id);
        return courier;
    }
}
