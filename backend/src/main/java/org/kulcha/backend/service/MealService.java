package org.kulcha.backend.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.exception.MealNotFoundException;
import org.kulcha.backend.model.Meal;
import org.kulcha.backend.model.enums.MealCategory;
import org.kulcha.backend.repository.MealRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MealService {

    private final MealRepository mealRepository;

    @Transactional
    public Meal create(Meal meal) {
        return mealRepository.save(meal);
    }

    public Optional<Meal> findById(Long id) {
        return mealRepository.findById(id);
    }

    public Optional<Meal> findDetailedById(Long id) {
        return mealRepository.findDetailedById(id);
    }

    public List<Meal> findAll() {
        return mealRepository.findAll();
    }

    public List<Meal> findAllByRestaurantIdDetailed(Long restaurantId) {
        return mealRepository.findAllByRestaurantIdDetailed(restaurantId);
    }

    public List<Meal> findAllAvailableByRestaurantIdDetailed(Long restaurantId) {
        return mealRepository.findAllAvailableByRestaurantIdDetailed(restaurantId);
    }

    public List<Meal> findAllAvailableByRestaurantIdAndCategoryDetailed(Long restaurantId,
                                                                         MealCategory category) {
        return mealRepository.findAllAvailableByRestaurantIdAndCategoryDetailed(restaurantId, category);
    }

    @Transactional
    public Meal update(Long id, Meal updatedMeal) {
        Meal existingMeal = mealRepository.findById(id)
                .orElseThrow(() -> new MealNotFoundException(id));

        existingMeal.setRestaurant(updatedMeal.getRestaurant());
        existingMeal.setName(updatedMeal.getName());
        existingMeal.setDescription(updatedMeal.getDescription());
        existingMeal.setWeight(updatedMeal.getWeight());
        existingMeal.setCalorie(updatedMeal.getCalorie());
        existingMeal.setImageLink(updatedMeal.getImageLink());
        existingMeal.setCategory(updatedMeal.getCategory());
        existingMeal.setPrice(updatedMeal.getPrice());
        existingMeal.setAvailable(updatedMeal.getAvailable());

        return mealRepository.save(existingMeal);
    }

    @Transactional
    public void deleteById(Long id) {
        mealRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return mealRepository.existsById(id);
    }
}
