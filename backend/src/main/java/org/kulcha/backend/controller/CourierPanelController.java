package org.kulcha.backend.controller;

import java.util.EnumSet;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.dto.CourierPanelOverviewDto;
import org.kulcha.backend.dto.OrderDto;
import org.kulcha.backend.exception.CourierProfileNotFoundException;
import org.kulcha.backend.model.Courier;
import org.kulcha.backend.model.Order;
import org.kulcha.backend.model.enums.OrderStatus;
import org.kulcha.backend.service.CourierService;
import org.kulcha.backend.service.OrderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/courier-panel")
@RequiredArgsConstructor
public class CourierPanelController {

    private static final EnumSet<OrderStatus> ACTIVE_DELIVERY_STATUSES = EnumSet.of(
            OrderStatus.CREATED,
            OrderStatus.ACCEPTED,
            OrderStatus.COOKING,
            OrderStatus.DELIVERY
    );

    private final CourierService courierService;
    private final OrderService orderService;

    @GetMapping("/{userId}")
    public CourierPanelOverviewDto getOverview(@PathVariable Long userId) {
        Courier courier = resolveCourierByUserId(userId);
        List<OrderDto> courierOrders = orderService.findAllByCourierIdDetailed(courier.getId()).stream()
                .map(this::toOrderDto)
                .toList();

        List<OrderDto> deliveryOrders = courierOrders.stream()
                .filter(order -> ACTIVE_DELIVERY_STATUSES.contains(order.getStatus()))
                .toList();

        List<OrderDto> deliveryHistory = courierOrders.stream()
                .filter(order -> order.getStatus() == OrderStatus.DONE)
                .toList();

        List<OrderDto> createdOrders = orderService.findAllByUserIdDetailed(userId).stream()
                .map(this::toOrderDto)
                .toList();

        return new CourierPanelOverviewDto(
                courier.getId(),
                userId,
                deliveryOrders,
                deliveryHistory,
                createdOrders
        );
    }

    @GetMapping("/{userId}/delivery-orders")
    public List<OrderDto> getDeliveryOrders(@PathVariable Long userId) {
        Courier courier = resolveCourierByUserId(userId);
        return orderService.findAllByCourierIdDetailed(courier.getId()).stream()
                .map(this::toOrderDto)
                .filter(order -> ACTIVE_DELIVERY_STATUSES.contains(order.getStatus()))
                .toList();
    }

    @GetMapping("/{userId}/delivery-history")
    public List<OrderDto> getDeliveryHistory(@PathVariable Long userId) {
        Courier courier = resolveCourierByUserId(userId);
        return orderService.findAllByCourierIdDetailed(courier.getId()).stream()
                .map(this::toOrderDto)
                .filter(order -> order.getStatus() == OrderStatus.DONE)
                .toList();
    }

    @GetMapping("/{userId}/created-orders")
    public List<OrderDto> getCreatedOrders(@PathVariable Long userId) {
        resolveCourierByUserId(userId);
        return orderService.findAllByUserIdDetailed(userId).stream()
                .map(this::toOrderDto)
                .toList();
    }

    private Courier resolveCourierByUserId(Long userId) {
        return courierService.findByUserIdDetailed(userId)
                .orElseThrow(() -> new CourierProfileNotFoundException(userId));
    }

    private OrderDto toOrderDto(Order order) {
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
}
