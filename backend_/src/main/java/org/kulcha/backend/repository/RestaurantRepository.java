package org.kulcha.backend.repository;

import java.util.List;
import java.util.Optional;
import org.kulcha.backend.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    @Query("""
            select r from Restaurant r
            where r.id = :id
            """)
    Optional<Restaurant> findDetailedById(@Param("id") Long id);

    @Query("""
            select r from Restaurant r
            order by r.name asc
            """)
    List<Restaurant> findAllDetailed();

    @Query("""
            select distinct r from Restaurant r
            join Staff s on s.restaurant = r
            where s.user.id = :userId
            """)
    List<Restaurant> findAllByStaffUserIdDetailed(@Param("userId") Long userId);
}
