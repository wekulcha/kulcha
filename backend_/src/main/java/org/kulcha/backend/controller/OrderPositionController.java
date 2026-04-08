package org.kulcha.backend.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.config.KulchaProperties;
import org.kulcha.backend.dto.OrderPositionDto;
import org.kulcha.backend.exception.OrderNotFoundException;
import org.kulcha.backend.exception.OrderPositionNotFoundException;
import org.kulcha.backend.model.Meal;
import org.kulcha.backend.model.Order;
import org.kulcha.backend.model.OrderPosition;
import org.kulcha.backend.model.User;
import org.kulcha.backend.service.OrderPositionService;
import org.kulcha.backend.service.OrderService;
import org.kulcha.backend.service.StaffAccessService;
import org.kulcha.backend.telegram.MiniAppAuthHelper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
@RequestMapping("/api/v1/order-positions")
@RequiredArgsConstructor
public class OrderPositionController {

    private final OrderPositionService orderPositionService;
    private final OrderService orderService;
    private final MiniAppAuthHelper miniAppAuthHelper;
    private final StaffAccessService staffAccessService;
    private final KulchaProperties kulchaProperties;

    @GetMapping
    public List<OrderPositionDto> getAll(
            @RequestParam(required = false) Long orderId,
            @RequestParam(required = false) Long mealId,
            @RequestHeader(value = "X-Telegram-Init-Data", required = false) String initData) {
        if (orderId != null) {
            if (initData == null || initData.isBlank()) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Telegram init data required");
            }
            var order =
                    orderService.findDetailedById(orderId).orElseThrow(() -> new OrderNotFoundException(orderId));
            User u = miniAppAuthHelper.requireAdminUser(initData);
            staffAccessService.requireRestaurantStaff(u.getId(), order.getRestaurant().getId());
            return orderPositionService.findAllByOrderIdDetailed(orderId).stream().map(this::toDto).toList();
        }
        if (mealId != null) {
            return orderPositionService.findAllByMealIdDetailed(mealId).stream().map(this::toDto).toList();
        }
        return orderPositionService.findAll().stream().map(this::toDto).toList();
    }

    @GetMapping("/{id}")
    public OrderPositionDto getById(@PathVariable Long id) {
        return orderPositionService.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new OrderPositionNotFoundException(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderPositionDto create(
            @RequestHeader("X-Kulcha-Internal-Secret") String secret, @RequestBody OrderPositionDto dto) {
        kulchaProperties.requireInternalSecret(secret);
        return toDto(orderPositionService.create(toEntity(dto)));
    }

    @PutMapping("/{id}")
    public OrderPositionDto update(
            @PathVariable Long id,
            @RequestHeader("X-Kulcha-Internal-Secret") String secret,
            @RequestBody OrderPositionDto dto) {
        kulchaProperties.requireInternalSecret(secret);
        return toDto(orderPositionService.update(id, toEntity(dto)));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id, @RequestHeader("X-Kulcha-Internal-Secret") String secret) {
        kulchaProperties.requireInternalSecret(secret);
        orderPositionService.deleteById(id);
    }

    private OrderPositionDto toDto(OrderPosition position) {
        return new OrderPositionDto(
                position.getId(),
                position.getMeal().getId(),
                position.getOrder().getId(),
                position.getQuantity(),
                position.getUnitPrice(),
                position.getTotalPrice());
    }

    private OrderPosition toEntity(OrderPositionDto dto) {
        OrderPosition position = new OrderPosition();
        position.setId(dto.getId());
        position.setMeal(mealRef(dto.getMealId()));
        position.setOrder(orderRef(dto.getOrderId()));
        position.setQuantity(dto.getQuantity());
        position.setUnitPrice(dto.getUnitPrice());
        position.setTotalPrice(dto.getTotalPrice());
        return position;
    }

    private Meal mealRef(Long id) {
        Meal meal = new Meal();
        meal.setId(id);
        return meal;
    }

    private Order orderRef(Long id) {
        Order order = new Order();
        order.setId(id);
        return order;
    }
}
