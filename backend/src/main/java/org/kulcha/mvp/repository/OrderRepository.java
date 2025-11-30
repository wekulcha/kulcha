package org.kulcha.mvp.repository;

import org.kulcha.mvp.model.Order;
import org.kulcha.mvp.model.enums.Status;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByRestaurantIdOrderByCreatedAtDesc(Long restaurantId);

    List<Order> findByCustomerIdOrderByCreatedAtDesc(Long customerId);

    List<Order> findByRestaurantIdAndStatusOrderByCreatedAtDesc(Long restaurantId, Status status);


    @EntityGraph(attributePaths = {"customer", "restaurant"})
    List<Order> findWithCustomerAndRestaurantByRestaurantIdOrderByCreatedAtDesc(Long restaurantId);

    @EntityGraph(attributePaths = {"customer", "restaurant", "courier"})
    List<Order> findWithAllRelationsByRestaurantIdOrderByCreatedAtDesc(Long restaurantId);


    List<Order> findByRestaurantIdAndStatusInOrderByCreatedAtDesc(
            Long restaurantId,
            List<Status> statuses
    );

    Optional<Order> findTopByCustomerIdAndStatusInOrderByCreatedAtDesc(
            Long customerId,
            List<Status> statuses
    );


    List<Order> findByCourierIdOrderByCreatedAtDesc(Long courierId);

    Optional<Order> findTopByCourierIdAndStatusInOrderByCreatedAtDesc(
            Long courierId,
            List<Status> statuses
    );
}
