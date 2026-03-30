package org.kulcha.backend.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.dto.SubscriptionLogDto;
import org.kulcha.backend.exception.SubscriptionLogNotFoundException;
import org.kulcha.backend.model.Restaurant;
import org.kulcha.backend.model.SubscriptionLog;
import org.kulcha.backend.service.SubscriptionLogService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/subscription-logs")
@RequiredArgsConstructor
public class SubscriptionLogController {

    private final SubscriptionLogService subscriptionLogService;

    @GetMapping
    public List<SubscriptionLogDto> getAll(@RequestParam(required = false) Long restaurantId,
                                           @RequestParam(required = false, defaultValue = "false")
                                           boolean activeOnly) {
        if (activeOnly) {
            return subscriptionLogService.findAllActiveDetailed().stream().map(this::toDto).toList();
        }
        if (restaurantId != null) {
            return subscriptionLogService.findAllByRestaurantIdDetailed(restaurantId).stream().map(this::toDto).toList();
        }
        return subscriptionLogService.findAll().stream().map(this::toDto).toList();
    }

    @GetMapping("/{id}")
    public SubscriptionLogDto getById(@PathVariable Long id) {
        return subscriptionLogService.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new SubscriptionLogNotFoundException(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SubscriptionLogDto create(@RequestBody SubscriptionLogDto dto) {
        return toDto(subscriptionLogService.create(toEntity(dto)));
    }

    @PutMapping("/{id}")
    public SubscriptionLogDto update(@PathVariable Long id, @RequestBody SubscriptionLogDto dto) {
        return toDto(subscriptionLogService.update(id, toEntity(dto)));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        subscriptionLogService.deleteById(id);
    }

    private SubscriptionLogDto toDto(SubscriptionLog log) {
        return new SubscriptionLogDto(
                log.getId(),
                log.getRestaurant().getId(),
                log.getPrice(),
                log.getStartDttm(),
                log.getEndDttm()
        );
    }

    private SubscriptionLog toEntity(SubscriptionLogDto dto) {
        SubscriptionLog log = new SubscriptionLog();
        log.setId(dto.getId());
        log.setRestaurant(restaurantRef(dto.getRestaurantId()));
        log.setPrice(dto.getPrice());
        log.setStartDttm(dto.getStartDttm());
        log.setEndDttm(dto.getEndDttm());
        return log;
    }

    private Restaurant restaurantRef(Long id) {
        Restaurant restaurant = new Restaurant();
        restaurant.setId(id);
        return restaurant;
    }
}
