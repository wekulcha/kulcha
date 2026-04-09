package org.kulcha.backend.service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.dto.UserDto;
import org.kulcha.backend.dto.UserRestaurantDto;
import org.kulcha.backend.exception.UserNotFoundException;
import org.kulcha.backend.model.Staff;
import org.kulcha.backend.model.User;
import org.kulcha.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final StaffService staffService;

    @Transactional
    public User create(User user) {
        if (user.getRegisteredAt() == null) {
            user.setRegisteredAt(LocalDateTime.now());
        }
        return userRepository.save(user);
    }

    /**
     * Registration from the user bot: upsert by Telegram id ({@code users.id}), or attach Telegram id to
     * existing phone (migrates FKs from legacy row if needed).
     */
    @Transactional
    public User registerOrUpdateFromBot(UserDto dto) {
        Long tgId = dto.getId();
        if (tgId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "id (Telegram) is required");
        }
        Optional<User> byTg = userRepository.findById(tgId);
        if (byTg.isPresent()) {
            User u = byTg.get();
            applyRegistrationDto(u, dto);
            return userRepository.save(u);
        }
        Optional<User> byPhone = userRepository.findByPhone(dto.getPhone());
        if (byPhone.isPresent()) {
            User legacy = byPhone.get();
            if (!legacy.getId().equals(tgId)) {
                migrateUserReferencesAndRemoveLegacy(legacy.getId(), tgId);
            }
            User u = new User();
            u.setId(tgId);
            fillNewUserFromRegistration(u, dto);
            return userRepository.save(u);
        }
        User user = new User();
        user.setId(tgId);
        fillNewUserFromRegistration(user, dto);
        return userRepository.save(user);
    }

    private void migrateUserReferencesAndRemoveLegacy(long oldId, long newTelegramId) {
        userRepository.reassignOrdersUserId(oldId, newTelegramId);
        userRepository.reassignStaffUserId(oldId, newTelegramId);
        userRepository.reassignCourierUserId(oldId, newTelegramId);
        userRepository.deleteById(oldId);
    }

    private static void applyRegistrationDto(User u, UserDto dto) {
        u.setUsername(dto.getUsername());
        u.setPhone(dto.getPhone());
        if (dto.getEmail() != null) {
            u.setEmail(dto.getEmail());
        }
        if (dto.getAddress() != null) {
            u.setAddress(dto.getAddress());
        }
    }

    private static void fillNewUserFromRegistration(User u, UserDto dto) {
        u.setUsername(dto.getUsername());
        u.setPhone(dto.getPhone());
        u.setEmail(dto.getEmail());
        u.setAddress(dto.getAddress());
        u.setRegisteredAt(dto.getRegisteredAt() != null ? dto.getRegisteredAt() : LocalDateTime.now());
    }

    public List<UserRestaurantDto> listRestaurantsForStaffUser(long userId) {
        userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        Map<Long, List<Staff>> grouped = staffService.findByUserIdDetailed(userId).stream()
                .collect(Collectors.groupingBy(s -> s.getRestaurant().getId()));
        return grouped.values().stream()
                .map(this::toUserRestaurantDto)
                .sorted(Comparator.comparing(UserRestaurantDto::getName))
                .toList();
    }

    private UserRestaurantDto toUserRestaurantDto(List<Staff> assignments) {
        Staff first = assignments.get(0);
        return new UserRestaurantDto(
                first.getRestaurant().getId(),
                first.getRestaurant().getName(),
                first.getRestaurant().getAddress(),
                assignments.stream().map(Staff::getPermission).distinct().toList());
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Transactional
    public User update(Long id, User updatedUser) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));

        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setPhone(updatedUser.getPhone());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setAddress(updatedUser.getAddress());
        if (updatedUser.getRegisteredAt() != null) {
            existingUser.setRegisteredAt(updatedUser.getRegisteredAt());
        }

        return userRepository.save(existingUser);
    }

    @Transactional
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return userRepository.existsById(id);
    }
}
