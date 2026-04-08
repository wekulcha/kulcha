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
     * Registration from the user bot: upsert by {@code telegram_id}, or attach telegram to existing phone.
     */
    @Transactional
    public User registerOrUpdateFromBot(UserDto dto) {
        if (dto.getTelegramId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "telegramId is required");
        }
        Optional<User> byTg = userRepository.findByTelegramId(dto.getTelegramId());
        if (byTg.isPresent()) {
            User u = byTg.get();
            u.setUsername(dto.getUsername());
            u.setPhone(dto.getPhone());
            if (dto.getEmail() != null) {
                u.setEmail(dto.getEmail());
            }
            if (dto.getAddress() != null) {
                u.setAddress(dto.getAddress());
            }
            return userRepository.save(u);
        }
        Optional<User> byPhone = userRepository.findByPhone(dto.getPhone());
        if (byPhone.isPresent()) {
            User u = byPhone.get();
            if (u.getTelegramId() != null && !u.getTelegramId().equals(dto.getTelegramId())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Phone already linked to another Telegram account");
            }
            u.setTelegramId(dto.getTelegramId());
            u.setUsername(dto.getUsername());
            return userRepository.save(u);
        }
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPhone(dto.getPhone());
        user.setTelegramId(dto.getTelegramId());
        user.setEmail(dto.getEmail());
        user.setAddress(dto.getAddress());
        user.setRegisteredAt(dto.getRegisteredAt() != null ? dto.getRegisteredAt() : LocalDateTime.now());
        return userRepository.save(user);
    }

    public Optional<User> findByTelegramId(Long telegramId) {
        return userRepository.findByTelegramId(telegramId);
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
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setPhone(updatedUser.getPhone());
        if (updatedUser.getTelegramId() != null) {
            existingUser.setTelegramId(updatedUser.getTelegramId());
        }
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
