package org.kulcha.backend.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.config.KulchaProperties;
import org.kulcha.backend.dto.AddStaffRequestDto;
import org.kulcha.backend.dto.StaffMemberDto;
import org.kulcha.backend.model.Restaurant;
import org.kulcha.backend.model.Staff;
import org.kulcha.backend.model.User;
import org.kulcha.backend.service.StaffAccessService;
import org.kulcha.backend.service.StaffService;
import org.kulcha.backend.service.UserService;
import org.kulcha.backend.telegram.TelegramWebAppService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/restaurants/{restaurantId}/staff")
@RequiredArgsConstructor
public class RestaurantStaffController {

    private final TelegramWebAppService telegramWebAppService;
    private final KulchaProperties kulchaProperties;
    private final UserService userService;
    private final StaffService staffService;
    private final StaffAccessService staffAccessService;

    @GetMapping
    public List<StaffMemberDto> list(
            @PathVariable long restaurantId, @RequestHeader("X-Telegram-Init-Data") String initData) {
        requireAdminActor(initData, restaurantId, false);
        return staffService.findAllByRestaurantIdDetailed(restaurantId).stream()
                .map(this::toMember)
                .toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public StaffMemberDto add(
            @PathVariable long restaurantId,
            @RequestHeader("X-Telegram-Init-Data") String initData,
            @RequestBody AddStaffRequestDto body) {
        requireAdminActor(initData, restaurantId, true);
        if (body.getTelegramId() == null || body.getPermission() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "telegramId and permission required");
        }
        User target = userService
                .findById(body.getTelegramId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Пользователь с таким Telegram ID не найден. Сначала /start в боте KULCHA."));
        if (staffService.existsByUserAndRestaurantAndPermission(
                target.getId(), restaurantId, body.getPermission())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Уже есть такая роль");
        }
        Staff staff = new Staff();
        staff.setUser(target);
        Restaurant r = new Restaurant();
        r.setId(restaurantId);
        staff.setRestaurant(r);
        staff.setPermission(body.getPermission());
        Staff saved = staffService.create(staff);
        Staff hydrated =
                staffService.findWithUserById(saved.getId()).orElse(saved);
        return toMember(hydrated);
    }

    @DeleteMapping("/{staffId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(
            @PathVariable long restaurantId,
            @PathVariable long staffId,
            @RequestHeader("X-Telegram-Init-Data") String initData) {
        long dbUserId = requireAdminActor(initData, restaurantId, true);
        staffAccessService.requireCanEditMenu(dbUserId, restaurantId);
        Staff s = staffService
                .findWithUserById(staffId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Staff not found"));
        if (!s.getRestaurant().getId().equals(restaurantId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Staff not found");
        }
        if (s.getUser().getId().equals(dbUserId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Нельзя удалить самого себя");
        }
        staffService.deleteById(staffId);
    }

    private long requireAdminActor(String initData, long restaurantId, boolean menu) {
        var tg = telegramWebAppService.requireUser(initData, kulchaProperties.getTelegram().getAdminBotToken());
        User actor = userService
                .findById(tg.id())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Unknown admin user"));
        if (menu) {
            staffAccessService.requireCanEditMenu(actor.getId(), restaurantId);
        } else {
            staffAccessService.requireRestaurantStaff(actor.getId(), restaurantId);
        }
        return actor.getId();
    }

    private StaffMemberDto toMember(Staff s) {
        User u = s.getUser();
        return new StaffMemberDto(s.getId(), u.getId(), u.getUsername(), u.getPhone(), s.getPermission());
    }
}
