package org.kulcha.mvp.repository;

import lombok.NonNull;
import org.kulcha.mvp.model.OrderPosition;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderPositionRepository extends JpaRepository<@NonNull OrderPosition, @NonNull Long> {

    List<OrderPosition> findByOrderId(Long orderId);

    @EntityGraph(attributePaths = {"meal"})
    List<OrderPosition> findWithMealByOrderId(Long orderId);

    void deleteByOrderId(Long orderId);
}
