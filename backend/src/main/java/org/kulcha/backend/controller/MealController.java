package org.kulcha.backend.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.config.KulchaProperties;
import org.kulcha.backend.dto.MealDto;
import org.kulcha.backend.exception.MealNotFoundException;
import org.kulcha.backend.model.Meal;
import org.kulcha.backend.model.Restaurant;
import org.kulcha.backend.model.User;
import org.kulcha.backend.model.enums.MealCategory;
import org.kulcha.backend.service.MealService;
import org.kulcha.backend.service.StaffAccessService;
import org.kulcha.backend.service.UserService;
import org.kulcha.backend.telegram.TelegramWebAppService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/meals")
@RequiredArgsConstructor
public class MealController {

    private final MealService mealService;
    private final TelegramWebAppService telegramWebAppService;
    private final KulchaProperties kulchaProperties;
    private final UserService userService;
    private final StaffAccessService staffAccessService;

    @GetMapping
    public List<MealDto> getAll(@RequestParam(required = false) Long restaurantId,
                                @RequestParam(required = false) MealCategory category) {
        if (restaurantId != null && category != null) {
            return mealService.findAllAvailableByRestaurantIdAndCategoryDetailed(restaurantId, category)
                    .stream()
                    .map(this::toDto)
                    .toList();
        }
        if (restaurantId != null) {
            return mealService.findAllAvailableByRestaurantIdDetailed(restaurantId)
                    .stream()
                    .map(this::toDto)
                    .toList();
        }
        return mealService.findAll().stream().map(this::toDto).toList();
    }

    @GetMapping("/{id}")
    public MealDto getById(@PathVariable Long id) {
        return mealService.findDetailedById(id)
                .map(this::toDto)
                .orElseThrow(() -> new MealNotFoundException(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MealDto create(
            @RequestHeader("X-Telegram-Init-Data") String initData, @RequestBody MealDto dto) {
        requireMenuEditor(initData, dto.getRestaurantId());
        return toDto(mealService.create(toEntity(dto)));
    }

    @PutMapping("/{id}")
    public MealDto update(
            @PathVariable Long id,
            @RequestHeader("X-Telegram-Init-Data") String initData,
            @RequestBody MealDto dto) {
        Meal existing =
                mealService.findDetailedById(id).orElseThrow(() -> new MealNotFoundException(id));
        requireMenuEditor(initData, existing.getRestaurant().getId());
        return toDto(mealService.update(id, toEntity(dto)));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id, @RequestHeader("X-Telegram-Init-Data") String initData) {
        Meal existing =
                mealService.findDetailedById(id).orElseThrow(() -> new MealNotFoundException(id));
        requireMenuEditor(initData, existing.getRestaurant().getId());
        mealService.deleteById(id);
    }

    private void requireMenuEditor(String initData, long restaurantId) {
        var tg = telegramWebAppService.requireUser(initData, kulchaProperties.getTelegram().getAdminBotToken());
        User u = userService
                .findById(tg.id())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Unknown user"));
        staffAccessService.requireCanEditMenu(u.getId(), restaurantId);
    }

    private MealDto toDto(Meal meal) {
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

    private Meal toEntity(MealDto dto) {
        Meal meal = new Meal();
        meal.setId(dto.getId());
        meal.setRestaurant(restaurantRef(dto.getRestaurantId()));
        meal.setName(dto.getName());
        meal.setDescription(dto.getDescription());
        meal.setWeight(dto.getWeight());
        meal.setCalorie(dto.getCalorie());
        meal.setImageLink(dto.getImageLink());
        meal.setCategory(dto.getCategory());
        meal.setPrice(dto.getPrice());
        meal.setAvailable(dto.getAvailable());
        return meal;
    }

    private Restaurant restaurantRef(Long id) {
        Restaurant restaurant = new Restaurant();
        restaurant.setId(id);
        return restaurant;
    }
}
