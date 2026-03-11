package org.kulcha.backend.repository;

import java.util.List;
import java.util.Optional;
import org.kulcha.backend.model.Order;
import org.kulcha.backend.model.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("""
            select o from Order o
            join fetch o.user u
            join fetch o.restaurant r
            left join fetch o.courier c
            left join fetch c.user cu
            where o.id = :id
            """)
    Optional<Order> findDetailedById(@Param("id") Long id);

    @Query("""
            select o from Order o
            join fetch o.user u
            join fetch o.restaurant r
            left join fetch o.courier c
            left join fetch c.user cu
            where u.id = :userId
            order by o.createdAt desc
            """)
    List<Order> findAllByUserIdDetailed(@Param("userId") Long userId);

    @Query("""
            select o from Order o
            join fetch o.user u
            join fetch o.restaurant r
            left join fetch o.courier c
            left join fetch c.user cu
            where r.id = :restaurantId
            order by o.createdAt desc
            """)
    List<Order> findAllByRestaurantIdDetailed(@Param("restaurantId") Long restaurantId);

    @Query("""
            select o from Order o
            join fetch o.user u
            join fetch o.restaurant r
            left join fetch o.courier c
            left join fetch c.user cu
            where o.status = :status
            order by o.createdAt desc
            """)
    List<Order> findAllByStatusDetailed(@Param("status") OrderStatus status);

    @Query("""
            select o from Order o
            join fetch o.user u
            join fetch o.restaurant r
            left join fetch o.courier c
            left join fetch c.user cu
            where c.id = :courierId
            order by o.createdAt desc
            """)
    List<Order> findAllByCourierIdDetailed(@Param("courierId") Long courierId);
}
