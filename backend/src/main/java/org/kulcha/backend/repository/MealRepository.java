package org.kulcha.backend.repository;

import java.util.List;
import java.util.Optional;
import org.kulcha.backend.model.Meal;
import org.kulcha.backend.model.enums.MealCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MealRepository extends JpaRepository<Meal, Long> {

    @Query("""
            SELECT m FROM Meal m
            JOIN FETCH m.restaurant r
            WHERE m.id = :id
            """)
    Optional<Meal> findDetailedById(@Param("id") Long id);

    @Query("""
            SELECT m FROM Meal m
            JOIN FETCH m.restaurant r
            WHERE r.id = :restaurantId
            """)
    List<Meal> findAllByRestaurantIdDetailed(@Param("restaurantId") Long restaurantId);

    @Query("""
            SELECT m FROM Meal m
            JOIN FETCH m.restaurant r
            WHERE r.id = :restaurantId AND m.available = true
            """)
    List<Meal> findAllAvailableByRestaurantIdDetailed(@Param("restaurantId") Long restaurantId);

    @Query("""
            SELECT m FROM Meal m
            JOIN FETCH m.restaurant r
            WHERE r.id = :restaurantId AND m.category = :category AND m.available = true
            """)
    List<Meal> findAllAvailableByRestaurantIdAndCategoryDetailed(@Param("restaurantId") Long restaurantId,
                                                                 @Param("category") MealCategory category);
}
