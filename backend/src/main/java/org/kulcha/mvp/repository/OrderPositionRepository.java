package org.kulcha.mvp.repository;

import lombok.NonNull;
import org.kulcha.mvp.model.OrderPosition;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderPositionRepository extends JpaRepository<@NonNull OrderPosition, @NonNull Long> {

    List<OrderPosition> findByOrderId(Long orderId);

    @EntityGraph(attributePaths = {"meal"})
    List<OrderPosition> findWithMealByOrderId(Long orderId);

    void deleteByOrderId(Long orderId);
}
