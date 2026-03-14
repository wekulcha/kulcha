package org.kulcha.backend.repository;

import java.util.List;
import org.kulcha.backend.model.OrderPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderPositionRepository extends JpaRepository<OrderPosition, Long> {

    @Query("""
            SELECT op FROM OrderPosition op
            JOIN FETCH op.order o
            JOIN FETCH o.user u
            JOIN FETCH op.meal m
            JOIN FETCH m.restaurant r
            WHERE o.id = :orderId
            """)
    List<OrderPosition> findAllByOrderIdDetailed(@Param("orderId") Long orderId);

    @Query("""
            SELECT op FROM OrderPosition op
            JOIN FETCH op.order o
            JOIN FETCH op.meal m
            JOIN FETCH m.restaurant r
            WHERE m.id = :mealId
            """)
    List<OrderPosition> findAllByMealIdDetailed(@Param("mealId") Long mealId);
}
