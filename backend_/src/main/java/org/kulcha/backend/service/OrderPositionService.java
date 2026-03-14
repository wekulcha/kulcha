package org.kulcha.backend.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.exception.OrderPositionNotFoundException;
import org.kulcha.backend.model.OrderPosition;
import org.kulcha.backend.repository.OrderPositionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderPositionService {

    private final OrderPositionRepository orderPositionRepository;

    @Transactional
    public OrderPosition create(OrderPosition orderPosition) {
        return orderPositionRepository.save(orderPosition);
    }

    public Optional<OrderPosition> findById(Long id) {
        return orderPositionRepository.findById(id);
    }

    public List<OrderPosition> findAll() {
        return orderPositionRepository.findAll();
    }

    public List<OrderPosition> findAllByOrderIdDetailed(Long orderId) {
        return orderPositionRepository.findAllByOrderIdDetailed(orderId);
    }

    public List<OrderPosition> findAllByMealIdDetailed(Long mealId) {
        return orderPositionRepository.findAllByMealIdDetailed(mealId);
    }

    @Transactional
    public OrderPosition update(Long id, OrderPosition updatedOrderPosition) {
        OrderPosition existingOrderPosition = orderPositionRepository.findById(id)
                .orElseThrow(() -> new OrderPositionNotFoundException(id));

        existingOrderPosition.setMeal(updatedOrderPosition.getMeal());
        existingOrderPosition.setOrder(updatedOrderPosition.getOrder());
        existingOrderPosition.setQuantity(updatedOrderPosition.getQuantity());
        existingOrderPosition.setUnitPrice(updatedOrderPosition.getUnitPrice());
        existingOrderPosition.setTotalPrice(updatedOrderPosition.getTotalPrice());

        return orderPositionRepository.save(existingOrderPosition);
    }

    @Transactional
    public void deleteById(Long id) {
        orderPositionRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return orderPositionRepository.existsById(id);
    }
}
