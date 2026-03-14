package org.kulcha.backend.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.dto.CourierDto;
import org.kulcha.backend.exception.CourierNotFoundException;
import org.kulcha.backend.model.Courier;
import org.kulcha.backend.model.User;
import org.kulcha.backend.service.CourierService;
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
@RequestMapping("/api/v1/couriers")
@RequiredArgsConstructor
public class CourierController {

    private final CourierService courierService;

    @GetMapping
    public List<CourierDto> getAll(@RequestParam(required = false) Long userId) {
        if (userId != null) {
            return courierService.findByUserIdDetailed(userId).map(this::toDto).stream().toList();
        }
        return courierService.findAllDetailed().stream().map(this::toDto).toList();
    }

    @GetMapping("/{id}")
    public CourierDto getById(@PathVariable Long id) {
        return courierService.findWithUserById(id)
                .map(this::toDto)
                .orElseThrow(() -> new CourierNotFoundException(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CourierDto create(@RequestBody CourierDto dto) {
        validateCourierDto(dto);
        if (courierService.existsByUserId(dto.getUserId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User is already assigned as courier");
        }
        return toDto(courierService.create(toEntity(dto)));
    }

    @PutMapping("/{id}")
    public CourierDto update(@PathVariable Long id, @RequestBody CourierDto dto) {
        validateCourierDto(dto);
        Courier existingCourier = courierService.findWithUserById(id)
                .orElseThrow(() -> new CourierNotFoundException(id));
        if (!existingCourier.getUser().getId().equals(dto.getUserId()) && courierService.existsByUserId(dto.getUserId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User is already assigned as courier");
        }
        return toDto(courierService.update(id, toEntity(dto)));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        courierService.deleteById(id);
    }

    private CourierDto toDto(Courier courier) {
        return new CourierDto(courier.getId(), courier.getUser().getId());
    }

    private Courier toEntity(CourierDto dto) {
        Courier courier = new Courier();
        courier.setId(dto.getId());
        courier.setUser(userRef(dto.getUserId()));
        return courier;
    }

    private User userRef(Long id) {
        User user = new User();
        user.setId(id);
        return user;
    }

    private void validateCourierDto(CourierDto dto) {
        if (dto.getUserId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "userId is required");
        }
    }
}
