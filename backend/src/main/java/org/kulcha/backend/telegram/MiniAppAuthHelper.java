package org.kulcha.backend.telegram;

import lombok.RequiredArgsConstructor;
import org.kulcha.backend.config.KulchaProperties;
import org.kulcha.backend.model.User;
import org.kulcha.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
@RequiredArgsConstructor
public class MiniAppAuthHelper {

    private final TelegramWebAppService telegramWebAppService;
    private final KulchaProperties kulchaProperties;
    private final UserService userService;

    public long requireCustomerDbUserId(String initData) {
        var tg = telegramWebAppService.requireUser(initData, kulchaProperties.getTelegram().getUserBotToken());
        return userService
                .findById(tg.id())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not registered"))
                .getId();
    }

    public User requireAdminUser(String initData) {
        var tg = telegramWebAppService.requireUser(initData, kulchaProperties.getTelegram().getAdminBotToken());
        return userService
                .findById(tg.id())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Unknown user"));
    }
}
