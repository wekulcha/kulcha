package org.kulcha.backend.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.dto.OrderPositionDto;
import org.kulcha.backend.exception.OrderPositionNotFoundException;
import org.kulcha.backend.model.Meal;
import org.kulcha.backend.model.Order;
import org.kulcha.backend.model.OrderPosition;
import org.kulcha.backend.service.OrderPositionService;
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
@RequestMapping("/api/v1/order-positions")
@RequiredArgsConstructor
public class OrderPositionController {

    private final OrderPositionService orderPositionService;

    @GetMapping
    public List<OrderPositionDto> getAll(@RequestParam(required = false) Long orderId,
                                         @RequestParam(required = false) Long mealId) {
        if (orderId != null) {
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
    public OrderPositionDto create(@RequestBody OrderPositionDto dto) {
        return toDto(orderPositionService.create(toEntity(dto)));
    }

    @PutMapping("/{id}")
    public OrderPositionDto update(@PathVariable Long id, @RequestBody OrderPositionDto dto) {
        return toDto(orderPositionService.update(id, toEntity(dto)));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        orderPositionService.deleteById(id);
    }

    private OrderPositionDto toDto(OrderPosition position) {
        return new OrderPositionDto(
                position.getId(),
                position.getMeal().getId(),
                position.getOrder().getId(),
                position.getQuantity(),
                position.getUnitPrice(),
                position.getTotalPrice()
        );
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
