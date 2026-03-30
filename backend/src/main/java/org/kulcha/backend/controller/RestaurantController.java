package org.kulcha.backend.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.dto.MealDto;
import org.kulcha.backend.dto.RestaurantDto;
import org.kulcha.backend.exception.RestaurantNotFoundException;
import org.kulcha.backend.model.Meal;
import org.kulcha.backend.model.Restaurant;
import org.kulcha.backend.model.enums.MealCategory;
import org.kulcha.backend.service.MealService;
import org.kulcha.backend.service.RestaurantService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;
    private final MealService mealService;

    @GetMapping
    public List<RestaurantDto> getAllRestaurants() {
        return restaurantService.findAllDetailed().stream().map(this::toRestaurantDto).toList();
    }

    @GetMapping("/{id}")
    public RestaurantDto getRestaurantById(@PathVariable Long id) {
        return restaurantService.findById(id)
                .map(this::toRestaurantDto)
                .orElseThrow(() -> new RestaurantNotFoundException(id));
    }

    @GetMapping("/{id}/meals")
    public List<MealDto> getRestaurantMeals(@PathVariable Long id,
                                            @RequestParam(required = false) MealCategory category,
                                            @RequestParam(required = false, defaultValue = "true")
                                            boolean availableOnly) {
        restaurantService.findById(id).orElseThrow(() -> new RestaurantNotFoundException(id));

        if (availableOnly && category != null) {
            return mealService.findAllAvailableByRestaurantIdAndCategoryDetailed(id, category)
                    .stream()
                    .map(this::toMealDto)
                    .toList();
        }
        if (availableOnly) {
            return mealService.findAllAvailableByRestaurantIdDetailed(id)
                    .stream()
                    .map(this::toMealDto)
                    .toList();
        }
        return mealService.findAllByRestaurantIdDetailed(id)
                .stream()
                .map(this::toMealDto)
                .toList();
    }

    private RestaurantDto toRestaurantDto(Restaurant restaurant) {
        return new RestaurantDto(restaurant.getId(), restaurant.getName(), restaurant.getAddress());
    }

    private MealDto toMealDto(Meal meal) {
        return new MealDto(
                meal.getId(),
                meal.getRestaurant().getId(),
                meal.getName(),
                meal.getDescription(),
                meal.getWeight(),
                meal.getCalorie(),
                meal.getImageLink(),
                meal.getCategory(),
                meal.getPrice(),
                meal.getAvailable()
        );
    }
}
