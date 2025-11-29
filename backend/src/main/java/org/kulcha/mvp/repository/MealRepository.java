package org.kulcha.mvp.repository;

import org.kulcha.mvp.model.Meal;
import org.kulcha.mvp.model.enums.Category;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MealRepository extends JpaRepository<Meal, Long> {

    List<Meal> findByRestaurantId(Long restaurantId);

    List<Meal> findByRestaurantIdAndAvailableTrue(Long restaurantId);

    List<Meal> findByRestaurantIdAndCategory(Long restaurantId, Category category);

    List<Meal> findByRestaurantIdAndNameContainingIgnoreCase(Long restaurantId, String name);

    Optional<Meal> findByRestaurantIdAndName(Long restaurantId, String name);

    @EntityGraph(attributePaths = {"restaurant"})
    List<Meal> findWithRestaurantByRestaurantId(Long restaurantId);

    @EntityGraph(attributePaths = {"restaurant"})
    Optional<Meal> findWithRestaurantById(Long mealId);
}
