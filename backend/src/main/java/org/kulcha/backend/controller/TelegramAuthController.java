package org.kulcha.backend.controller;

import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.config.KulchaProperties;
import org.kulcha.backend.dto.AdminWebAppSessionDto;
import org.kulcha.backend.dto.UserDto;
import org.kulcha.backend.dto.UserRestaurantDto;
import org.kulcha.backend.model.User;
import org.kulcha.backend.service.UserService;
import org.kulcha.backend.telegram.TelegramWebAppService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class TelegramAuthController {

    private final TelegramWebAppService telegramWebAppService;
    private final KulchaProperties kulchaProperties;
    private final UserService userService;

    /**
     * Public Telegram WebApp initData login (used directly by mini-app frontends).
     * Kept alongside internal/auth endpoints for compatibility with auth-gateway flows.
     */
    @PostMapping("/webapp-user")
    public UserDto authUser(
            @RequestBody(required = false) Map<String, String> body,
            @RequestHeader(value = "X-Telegram-Init-Data", required = false) String headerInit,
            @RequestHeader(value = "X-Init-Data", required = false) String headerInitAlias) {
        String init = firstNonBlank(headerInit, headerInitAlias, body != null ? body.get("initData") : null);
        var tg = telegramWebAppService.requireUser(init, kulchaProperties.getTelegram().getUserBotToken());
        User user = userService.ensureCustomerFromTelegram(tg.id(), tg.username());
        return toUserDto(user);
    }

    @PostMapping("/webapp-admin")
    public AdminWebAppSessionDto authAdmin(
            @RequestBody(required = false) Map<String, String> body,
            @RequestHeader(value = "X-Telegram-Init-Data", required = false) String headerInit,
            @RequestHeader(value = "X-Init-Data", required = false) String headerInitAlias) {
        String init = firstNonBlank(headerInit, headerInitAlias, body != null ? body.get("initData") : null);
        var tg = telegramWebAppService.requireUser(init, kulchaProperties.getTelegram().getAdminBotToken());
        User user = userService
                .findById(tg.id())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.FORBIDDEN, "Пользователь не найден. Добавьте сотрудника в ресторане."));
        List<UserRestaurantDto> restaurants = userService.listRestaurantsForStaffUser(user.getId());
        if (restaurants.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Нет доступа к ресторанам");
        }
        return new AdminWebAppSessionDto(toUserDto(user), restaurants);
    }

    /**
     * Verifies a bot-generated HMAC token for the user mini-app.
     * Works in any browser (no Telegram WebView required).
     * Body: { "token": "{telegramId}_{expiry}_{hmac}" }
     */
    @PostMapping("/verify-user-bot-token")
    public UserDto verifyUserBotToken(@RequestBody Map<String, String> body) {
        String token = body != null ? body.get("token") : null;
        long telegramId = telegramWebAppService.verifyBotAuthToken(
                token, kulchaProperties.getTelegram().getUserBotToken());
        User user = userService.ensureCustomerFromTelegram(telegramId, null);
        return toUserDto(user);
    }

    /**
     * Verifies a bot-generated HMAC token for the admin mini-app.
     * Body: { "token": "{telegramId}_{expiry}_{hmac}" }
     */
    @PostMapping("/verify-admin-bot-token")
    public AdminWebAppSessionDto verifyAdminBotToken(@RequestBody Map<String, String> body) {
        String token = body != null ? body.get("token") : null;
        long telegramId = telegramWebAppService.verifyBotAuthToken(
                token, kulchaProperties.getTelegram().getAdminBotToken());
        User user = userService
                .findById(telegramId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.FORBIDDEN, "Пользователь не найден. Добавьте сотрудника в ресторане."));
        List<UserRestaurantDto> restaurants = userService.listRestaurantsForStaffUser(user.getId());
        if (restaurants.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Нет доступа к ресторанам");
        }
        return new AdminWebAppSessionDto(toUserDto(user), restaurants);
    }

    private static String firstNonBlank(String... values) {
        for (String value : values) {
            if (value != null && !value.isBlank()) {
                return value;
            }
        }
        return "";
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
