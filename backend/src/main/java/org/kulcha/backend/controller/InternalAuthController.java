package org.kulcha.backend.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.config.KulchaProperties;
import org.kulcha.backend.dto.AdminWebAppSessionDto;
import org.kulcha.backend.dto.UserDto;
import org.kulcha.backend.dto.UserRestaurantDto;
import org.kulcha.backend.dto.internal.InternalWebappUserRequest;
import org.kulcha.backend.model.User;
import org.kulcha.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 * Server-to-server auth: only the Python auth-gateway should call these after validating initData.
 */
@RestController
@RequestMapping("/api/v1/internal/auth")
@RequiredArgsConstructor
public class InternalAuthController {

    private final KulchaProperties kulchaProperties;
    private final UserService userService;

    @PostMapping("/webapp-user")
    public UserDto webappUser(
            @RequestHeader(value = "X-Kulcha-Internal-Secret", required = false) String secret,
            @RequestBody InternalWebappUserRequest body) {
        kulchaProperties.requireInternalSecret(secret);
        User user = userService.ensureCustomerFromTelegram(body.telegramId(), body.username());
        return toUserDto(user);
    }

    @PostMapping("/webapp-admin")
    public AdminWebAppSessionDto webappAdmin(
            @RequestHeader(value = "X-Kulcha-Internal-Secret", required = false) String secret,
            @RequestBody InternalWebappUserRequest body) {
        kulchaProperties.requireInternalSecret(secret);
        User user = userService
                .findById(body.telegramId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.FORBIDDEN, "Пользователь не найден. Добавьте сотрудника в ресторане."));
        List<UserRestaurantDto> restaurants = userService.listRestaurantsForStaffUser(user.getId());
        if (restaurants.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Нет доступа к ресторанам");
        }
        return new AdminWebAppSessionDto(toUserDto(user), restaurants);
    }

    private static UserDto toUserDto(User user) {
        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getPhone(),
                user.getEmail(),
                user.getAddress(),
                user.getRegisteredAt());
    }
}
