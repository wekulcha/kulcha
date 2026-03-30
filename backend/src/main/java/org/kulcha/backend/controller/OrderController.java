package org.kulcha.backend.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.dto.OrderDto;
import org.kulcha.backend.exception.OrderNotFoundException;
import org.kulcha.backend.model.Courier;
import org.kulcha.backend.model.Order;
import org.kulcha.backend.model.Restaurant;
import org.kulcha.backend.model.User;
import org.kulcha.backend.model.enums.OrderStatus;
import org.kulcha.backend.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public List<OrderDto> getAll(@RequestParam(required = false) Long userId,
                                 @RequestParam(required = false) Long restaurantId,
                                 @RequestParam(required = false) OrderStatus status) {
        if (userId != null) {
            return orderService.findAllByUserIdDetailed(userId).stream().map(this::toDto).toList();
        }
        if (restaurantId != null) {
            return orderService.findAllByRestaurantIdDetailed(restaurantId).stream().map(this::toDto).toList();
        }
        if (status != null) {
            return orderService.findAllByStatusDetailed(status).stream().map(this::toDto).toList();
        }
        return orderService.findAll().stream().map(this::toDto).toList();
    }

    @GetMapping("/{id}")
    public OrderDto getById(@PathVariable Long id) {
        return orderService.findDetailedById(id)
                .map(this::toDto)
                .orElseThrow(() -> new OrderNotFoundException(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderDto create(@RequestBody OrderDto dto) {
        return toDto(orderService.create(toEntity(dto)));
    }

    @PutMapping("/{id}")
    public OrderDto update(@PathVariable Long id, @RequestBody OrderDto dto) {
        return toDto(orderService.update(id, toEntity(dto)));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        orderService.deleteById(id);
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
                order.getTotal()
        );
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
