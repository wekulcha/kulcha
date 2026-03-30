package org.kulcha.backend.controller;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.dto.UserRestaurantDto;
import org.kulcha.backend.dto.UserDto;
import org.kulcha.backend.exception.UserNotFoundException;
import org.kulcha.backend.model.Staff;
import org.kulcha.backend.model.User;
import org.kulcha.backend.service.StaffService;
import org.kulcha.backend.service.UserService;
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
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final StaffService staffService;

    @GetMapping
    public List<UserDto> getAll(@RequestParam(required = false) String phone,
                                @RequestParam(required = false) String username) {
        if (phone != null && !phone.isBlank()) {
            return userService.findByPhone(phone).map(this::toDto).stream().toList();
        }
        if (username != null && !username.isBlank()) {
            return userService.findByUsername(username).map(this::toDto).stream().toList();
        }
        return userService.findAll().stream().map(this::toDto).toList();
    }

    @GetMapping("/{id}")
    public UserDto getById(@PathVariable Long id) {
        return userService.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @GetMapping("/{id}/my-restaurants")
    public List<UserRestaurantDto> getMyRestaurants(@PathVariable Long id) {
        userService.findById(id).orElseThrow(() -> new UserNotFoundException(id));

        Map<Long, List<Staff>> groupedByRestaurant = staffService.findByUserIdDetailed(id).stream()
                .collect(Collectors.groupingBy(staff -> staff.getRestaurant().getId()));

        return groupedByRestaurant.values().stream()
                .map(this::toRestaurantDto)
                .sorted(Comparator.comparing(UserRestaurantDto::getName))
                .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto create(@RequestBody UserDto dto) {
        return toDto(userService.create(toEntity(dto)));
    }

    @PutMapping("/{id}")
    public UserDto update(@PathVariable Long id, @RequestBody UserDto dto) {
        return toDto(userService.update(id, toEntity(dto)));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        userService.deleteById(id);
    }

    private UserDto toDto(User user) {
        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getPhone(),
                user.getEmail(),
                user.getAddress(),
                user.getRegisteredAt()
        );
    }

    private User toEntity(UserDto dto) {
        User user = new User();
        user.setId(dto.getId());
        user.setUsername(dto.getUsername());
        user.setPhone(dto.getPhone());
        user.setEmail(dto.getEmail());
        user.setAddress(dto.getAddress());
        user.setRegisteredAt(dto.getRegisteredAt());
        return user;
    }

    private UserRestaurantDto toRestaurantDto(List<Staff> assignments) {
        Staff first = assignments.get(0);
        return new UserRestaurantDto(
                first.getRestaurant().getId(),
                first.getRestaurant().getName(),
                first.getRestaurant().getAddress(),
                assignments.stream().map(Staff::getPermission).distinct().toList()
        );
    }
}
