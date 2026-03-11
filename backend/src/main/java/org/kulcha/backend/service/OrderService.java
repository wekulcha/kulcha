package org.kulcha.backend.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.exception.OrderNotFoundException;
import org.kulcha.backend.model.Order;
import org.kulcha.backend.model.enums.OrderStatus;
import org.kulcha.backend.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {

    private final OrderRepository orderRepository;

    @Transactional
    public Order create(Order order) {
        return orderRepository.save(order);
    }

    public Optional<Order> findById(Long id) {
        return orderRepository.findById(id);
    }

    public Optional<Order> findDetailedById(Long id) {
        return orderRepository.findDetailedById(id);
    }

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public List<Order> findAllByUserIdDetailed(Long userId) {
        return orderRepository.findAllByUserIdDetailed(userId);
    }

    public List<Order> findAllByRestaurantIdDetailed(Long restaurantId) {
        return orderRepository.findAllByRestaurantIdDetailed(restaurantId);
    }

    public List<Order> findAllByStatusDetailed(OrderStatus status) {
        return orderRepository.findAllByStatusDetailed(status);
    }

    public List<Order> findAllByCourierIdDetailed(Long courierId) {
        return orderRepository.findAllByCourierIdDetailed(courierId);
    }

    @Transactional
    public Order update(Long id, Order updatedOrder) {
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(id));

        existingOrder.setStatus(updatedOrder.getStatus());
        existingOrder.setUser(updatedOrder.getUser());
        existingOrder.setDeliveryAddress(updatedOrder.getDeliveryAddress());
        existingOrder.setRestaurant(updatedOrder.getRestaurant());
        existingOrder.setCreatedAt(updatedOrder.getCreatedAt());
        existingOrder.setUpdatedAt(updatedOrder.getUpdatedAt());
        existingOrder.setCourier(updatedOrder.getCourier());
        existingOrder.setOrderType(updatedOrder.getOrderType());
        existingOrder.setItemsTotal(updatedOrder.getItemsTotal());
        existingOrder.setDeliveryFee(updatedOrder.getDeliveryFee());
        existingOrder.setServiceFee(updatedOrder.getServiceFee());
        existingOrder.setTotal(updatedOrder.getTotal());

        return orderRepository.save(existingOrder);
    }

    @Transactional
    public void deleteById(Long id) {
        orderRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return orderRepository.existsById(id);
    }
}
