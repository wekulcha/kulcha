package org.kulcha.mvp.repository;

import lombok.NonNull;
import org.kulcha.mvp.model.Staff;
import org.kulcha.mvp.model.enums.Role;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StaffRepository extends JpaRepository<@NonNull Staff, @NonNull Long> {

    List<Staff> findByRestaurantId(Long restaurantId);

    @EntityGraph(attributePaths = {"user"})
    List<Staff> findByRestaurantIdOrderById(Long restaurantId);

    Optional<Staff> findByRestaurantIdAndUserId(Long restaurantId, Long userId);

    boolean existsByRestaurantIdAndUserId(Long restaurantId, Long userId);

    List<Staff> findByUserId(Long userId);

    List<Staff> findByRestaurantIdAndRole(Long restaurantId, Role role);

    boolean existsByRestaurantIdAndUserIdAndRole(Long restaurantId, Long userId, Role role);

    Optional<Staff> findTopByUserIdAndRestaurantId(Long userId, Long restaurantId);
}
