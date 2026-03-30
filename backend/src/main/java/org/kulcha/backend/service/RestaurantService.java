package org.kulcha.backend.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.model.Restaurant;
import org.kulcha.backend.repository.RestaurantRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    @Transactional
    public Restaurant create(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Optional<Restaurant> findById(Long id) {
        return restaurantRepository.findById(id);
    }

    public Optional<Restaurant> findDetailedById(Long id) {
        return restaurantRepository.findDetailedById(id);
    }

    public List<Restaurant> findAll() {
        return restaurantRepository.findAll();
    }

    public List<Restaurant> findAllDetailed() {
        return restaurantRepository.findAllDetailed();
    }

    public List<Restaurant> findAllByStaffUserIdDetailed(Long userId) {
        return restaurantRepository.findAllByStaffUserIdDetailed(userId);
    }
}
