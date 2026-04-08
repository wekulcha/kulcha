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

    @PostMapping("/webapp-user")
    public UserDto authUser(
            @RequestBody(required = false) Map<String, String> body,
            @RequestHeader(value = "X-Telegram-Init-Data", required = false) String headerInit) {
        String init = firstNonBlank(headerInit, body != null ? body.get("initData") : null);
        var tg = telegramWebAppService.requireUser(init, kulchaProperties.getTelegram().getUserBotToken());
        User user = userService
                .findByTelegramId(tg.id())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Зарегистрируйтесь через бота KULCHA (/start)"));
        return toUserDto(user);
    }

    @PostMapping("/webapp-admin")
    public AdminWebAppSessionDto authAdmin(
            @RequestBody(required = false) Map<String, String> body,
            @RequestHeader(value = "X-Telegram-Init-Data", required = false) String headerInit) {
        String init = firstNonBlank(headerInit, body != null ? body.get("initData") : null);
        var tg = telegramWebAppService.requireUser(init, kulchaProperties.getTelegram().getAdminBotToken());
        User user = userService
                .findByTelegramId(tg.id())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.FORBIDDEN, "Пользователь не найден. Добавьте сотрудника в ресторане."));
        List<UserRestaurantDto> restaurants = userService.listRestaurantsForStaffUser(user.getId());
        if (restaurants.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Нет доступа к ресторанам");
        }
        return new AdminWebAppSessionDto(toUserDto(user), restaurants);
    }

    private static String firstNonBlank(String a, String b) {
        if (a != null && !a.isBlank()) {
            return a;
        }
        if (b != null && !b.isBlank()) {
            return b;
        }
        return "";
    }

    private static UserDto toUserDto(User user) {
        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getPhone(),
                user.getTelegramId(),
                user.getEmail(),
                user.getAddress(),
                user.getRegisteredAt());
    }
}
