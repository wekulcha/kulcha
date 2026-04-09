package org.kulcha.backend.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.config.KulchaProperties;
import org.kulcha.backend.dto.UserRestaurantDto;
import org.kulcha.backend.dto.UserDto;
import org.kulcha.backend.exception.UserNotFoundException;
import org.kulcha.backend.model.User;
import org.kulcha.backend.service.UserService;
import org.kulcha.backend.telegram.MiniAppAuthHelper;
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
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final KulchaProperties kulchaProperties;
    private final MiniAppAuthHelper miniAppAuthHelper;

    @GetMapping
    public List<UserDto> getAll(@RequestParam(required = false) String phone,
                                @RequestParam(required = false) String username,
                                @RequestParam(required = false) Long telegramId) {
        if (telegramId != null) {
            return userService.findByTelegramId(telegramId).map(this::toDto).stream().toList();
        }
        if (phone != null && !phone.isBlank()) {
            return userService.findByPhone(phone).map(this::toDto).stream().toList();
        }
        if (username != null && !username.isBlank()) {
            return userService.findByUsername(username).map(this::toDto).stream().toList();
        }
        return userService.findAll().stream().map(this::toDto).toList();
    }

    @GetMapping("/{id}")
    public UserDto getById(
            @PathVariable Long id, @RequestHeader("X-Telegram-Init-Data") String initData) {
        try {
            User admin = miniAppAuthHelper.requireAdminUser(initData);
            if (userService.listRestaurantsForStaffUser(admin.getId()).isEmpty()) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not a staff member");
            }
            return userService.findById(id)
                    .map(this::toDto)
                    .orElseThrow(() -> new UserNotFoundException(id));
        } catch (ResponseStatusException ex) {
            if (ex.getStatusCode().value() != HttpStatus.UNAUTHORIZED.value()) {
                throw ex;
            }
        }
        long dbId = miniAppAuthHelper.requireCustomerDbUserId(initData);
        if (dbId != id) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Cannot access another user");
        }
        return userService.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @GetMapping("/{id}/my-restaurants")
    public List<UserRestaurantDto> getMyRestaurants(
            @PathVariable Long id, @RequestHeader("X-Telegram-Init-Data") String initData) {
        User u = miniAppAuthHelper.requireAdminUser(initData);
        if (!u.getId().equals(id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Cannot access another user");
        }
        return userService.listRestaurantsForStaffUser(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto create(
            @RequestBody UserDto dto,
            @RequestHeader(value = "X-Kulcha-Bot-Secret", required = false) String botSecret) {
        kulchaProperties.requireBotApiSecret(botSecret);
        return toDto(userService.registerOrUpdateFromBot(dto));
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
                user.getTelegramId(),
                user.getEmail(),
                user.getAddress(),
                user.getRegisteredAt());
    }

    private User toEntity(UserDto dto) {
        User user = new User();
        user.setId(dto.getId());
        user.setUsername(dto.getUsername());
        user.setPhone(dto.getPhone());
        user.setTelegramId(dto.getTelegramId());
        user.setEmail(dto.getEmail());
        user.setAddress(dto.getAddress());
        user.setRegisteredAt(dto.getRegisteredAt());
        return user;
    }
}
