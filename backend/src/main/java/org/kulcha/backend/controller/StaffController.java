package org.kulcha.backend.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.dto.StaffDto;
import org.kulcha.backend.exception.StaffNotFoundException;
import org.kulcha.backend.model.Restaurant;
import org.kulcha.backend.model.Staff;
import org.kulcha.backend.model.User;
import org.kulcha.backend.model.enums.StaffPermission;
import org.kulcha.backend.service.StaffService;
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
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/staff")
@RequiredArgsConstructor
public class StaffController {

    private final StaffService staffService;

    @GetMapping
    public List<StaffDto> getAll(@RequestParam(required = false) Long userId,
                                 @RequestParam(required = false) Long restaurantId,
                                 @RequestParam(required = false) StaffPermission permission) {
        if (userId != null) {
            return staffService.findByUserIdDetailed(userId).stream().map(this::toDto).toList();
        }
        if (restaurantId != null) {
            return staffService.findAllByRestaurantIdDetailed(restaurantId).stream().map(this::toDto).toList();
        }
        if (permission != null) {
            return staffService.findAllByPermissionDetailed(permission).stream().map(this::toDto).toList();
        }
        return staffService.findAll().stream().map(this::toDto).toList();
    }

    @GetMapping("/{id}")
    public StaffDto getById(@PathVariable Long id) {
        return staffService.findWithUserById(id)
                .map(this::toDto)
                .orElseThrow(() -> new StaffNotFoundException(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public StaffDto create(@RequestBody StaffDto dto) {
        validateStaffDto(dto);
        return toDto(staffService.create(toEntity(dto)));
    }

    @PutMapping("/{id}")
    public StaffDto update(@PathVariable Long id, @RequestBody StaffDto dto) {
        validateStaffDto(dto);
        return toDto(staffService.update(id, toEntity(dto)));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        staffService.deleteById(id);
    }

    private StaffDto toDto(Staff staff) {
        return new StaffDto(
                staff.getId(),
                staff.getUser().getId(),
                staff.getRestaurant().getId(),
                staff.getPermission()
        );
    }

    private Staff toEntity(StaffDto dto) {
        Staff staff = new Staff();
        staff.setId(dto.getId());
        staff.setUser(userRef(dto.getUserId()));
        staff.setRestaurant(restaurantRef(dto.getRestaurantId()));
        staff.setPermission(dto.getPermission());
        return staff;
    }

    private User userRef(Long id) {
        User user = new User();
        user.setId(id);
        return user;
    }

    private Restaurant restaurantRef(Long id) {
        Restaurant restaurant = new Restaurant();
        restaurant.setId(id);
        return restaurant;
    }

    private void validateStaffDto(StaffDto dto) {
        if (dto.getUserId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "userId is required");
        }
        if (dto.getRestaurantId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "restaurantId is required");
        }
        if (dto.getPermission() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "permission is required");
        }
    }
}
