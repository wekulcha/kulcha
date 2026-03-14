package org.kulcha.backend.controller;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.dto.AdminAssignCourierRequestDto;
import org.kulcha.backend.dto.AdminAssignStaffRequestDto;
import org.kulcha.backend.dto.AdminCourierDto;
import org.kulcha.backend.dto.AdminCreateRestaurantRequestDto;
import org.kulcha.backend.dto.AdminOrderHistoryItemDto;
import org.kulcha.backend.dto.AdminRestaurantDto;
import org.kulcha.backend.dto.AdminRestaurantOverviewDto;
import org.kulcha.backend.dto.AdminStaffAssignmentDto;
import org.kulcha.backend.dto.AdminUserOverviewDto;
import org.kulcha.backend.dto.MealDto;
import org.kulcha.backend.dto.OrderDto;
import org.kulcha.backend.dto.StaffDto;
import org.kulcha.backend.exception.RestaurantNotFoundException;
import org.kulcha.backend.exception.UserNotFoundException;
import org.kulcha.backend.model.Courier;
import org.kulcha.backend.model.Meal;
import org.kulcha.backend.model.Order;
import org.kulcha.backend.model.Restaurant;
import org.kulcha.backend.model.Staff;
import org.kulcha.backend.model.User;
import org.kulcha.backend.model.enums.StaffPermission;
import org.kulcha.backend.service.CourierService;
import org.kulcha.backend.service.MealService;
import org.kulcha.backend.service.OrderService;
import org.kulcha.backend.service.RestaurantService;
import org.kulcha.backend.service.StaffService;
import org.kulcha.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final CourierService courierService;
    private final StaffService staffService;
    private final RestaurantService restaurantService;
    private final MealService mealService;
    private final OrderService orderService;

    @GetMapping("/users")
    public List<AdminUserOverviewDto> getAllUsersOverview() {
        return userService.findAll().stream()
                .map(this::toUserOverview)
                .toList();
    }

    @GetMapping("/couriers")
    public List<AdminCourierDto> getAllCouriers() {
        return courierService.findAllDetailed().stream()
                .map(this::toAdminCourierDto)
                .toList();
    }

    @GetMapping("/restaurants")
    public List<AdminRestaurantOverviewDto> getAllRestaurantsOverview() {
        return restaurantService.findAllDetailed().stream()
                .map(this::toRestaurantOverview)
                .toList();
    }

    @GetMapping("/users/{userId}/restaurants")
    public List<AdminRestaurantDto> getUserRestaurants(@PathVariable Long userId) {
        userService.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));

        Map<Long, List<Staff>> groupedByRestaurant = staffService.findByUserIdDetailed(userId).stream()
                .collect(Collectors.groupingBy(staff -> staff.getRestaurant().getId()));

        return groupedByRestaurant.values().stream()
                .map(this::toRestaurantDto)
                .sorted(Comparator.comparing(AdminRestaurantDto::getName))
                .toList();
    }

    @PostMapping("/restaurants")
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public AdminRestaurantDto createRestaurant(@RequestBody AdminCreateRestaurantRequestDto request) {
        validateCreateRestaurantRequest(request);

        User adminUser = userService.findById(request.getAdminUserId())
                .orElseThrow(() -> new UserNotFoundException(request.getAdminUserId()));

        Restaurant restaurant = new Restaurant();
        restaurant.setName(request.getName().trim());
        restaurant.setAddress(request.getAddress().trim());
        Restaurant savedRestaurant = restaurantService.create(restaurant);

        List<Staff> adminAssignments = Arrays.stream(StaffPermission.values())
                .map(permission -> createStaffAssignmentIfMissing(adminUser, savedRestaurant, permission))
                .toList();

        return toRestaurantDto(adminAssignments);
    }

    @PostMapping("/couriers")
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public AdminCourierDto assignCourier(@RequestBody AdminAssignCourierRequestDto request) {
        if (request.getUserId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "userId is required");
        }

        User user = userService.findById(request.getUserId())
                .orElseThrow(() -> new UserNotFoundException(request.getUserId()));

        if (courierService.existsByUserId(user.getId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User is already assigned as courier");
        }

        Courier courier = new Courier();
        courier.setUser(user);
        return toAdminCourierDto(courierService.create(courier));
    }

    @PostMapping("/restaurants/{restaurantId}/staff")
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public StaffDto assignStaff(@PathVariable Long restaurantId, @RequestBody AdminAssignStaffRequestDto request) {
        if (request.getUserId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "userId is required");
        }
        if (request.getPermission() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "permission is required");
        }

        Restaurant restaurant = restaurantService.findById(restaurantId)
                .orElseThrow(() -> new RestaurantNotFoundException(restaurantId));
        User user = userService.findById(request.getUserId())
                .orElseThrow(() -> new UserNotFoundException(request.getUserId()));

        if (staffService.existsByUserAndRestaurantAndPermission(user.getId(), restaurant.getId(), request.getPermission())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Staff permission already assigned");
        }

        Staff staff = new Staff();
        staff.setUser(user);
        staff.setRestaurant(restaurant);
        staff.setPermission(request.getPermission());

        return toStaffDto(staffService.create(staff));
    }

    @DeleteMapping("/couriers/{courierId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    public void removeCourier(@PathVariable Long courierId) {
        if (!courierService.existsById(courierId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Courier not found");
        }
        courierService.deleteById(courierId);
    }

    private void validateCreateRestaurantRequest(AdminCreateRestaurantRequestDto request) {
        if (request.getName() == null || request.getName().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Restaurant name is required");
        }
        if (request.getAddress() == null || request.getAddress().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Restaurant address is required");
        }
        if (request.getAdminUserId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "adminUserId is required");
        }
    }

    private Staff createStaffAssignmentIfMissing(User user, Restaurant restaurant, StaffPermission permission) {
        if (staffService.existsByUserAndRestaurantAndPermission(user.getId(), restaurant.getId(), permission)) {
            return staffService.findByUserIdDetailed(user.getId()).stream()
                    .filter(staff -> staff.getRestaurant().getId().equals(restaurant.getId()))
                    .filter(staff -> staff.getPermission() == permission)
                    .findFirst()
                    .orElseThrow();
        }

        Staff staff = new Staff();
        staff.setUser(user);
        staff.setRestaurant(restaurant);
        staff.setPermission(permission);
        return staffService.create(staff);
    }

    private AdminUserOverviewDto toUserOverview(User user) {
        boolean isCourier = courierService.findByUserIdDetailed(user.getId()).map(Courier::getId).isPresent();

        List<AdminStaffAssignmentDto> staffAssignments = staffService.findByUserIdDetailed(user.getId()).stream()
                .map(staff -> new AdminStaffAssignmentDto(
                        staff.getId(),
                        staff.getRestaurant().getId(),
                        staff.getRestaurant().getName(),
                        staff.getPermission()
                ))
                .toList();

        List<AdminOrderHistoryItemDto> orderHistory = orderService.findAllByUserIdDetailed(user.getId()).stream()
                .map(order -> new AdminOrderHistoryItemDto(
                        order.getId(),
                        order.getStatus(),
                        order.getRestaurant().getId(),
                        order.getRestaurant().getName(),
                        order.getTotal(),
                        order.getCreatedAt()
                ))
                .toList();

        return new AdminUserOverviewDto(
                user.getId(),
                user.getUsername(),
                user.getPhone(),
                user.getEmail(),
                user.getAddress(),
                isCourier,
                staffAssignments,
                orderHistory
        );
    }

    private AdminRestaurantOverviewDto toRestaurantOverview(Restaurant restaurant) {
        List<StaffDto> staff = staffService.findAllByRestaurantIdDetailed(restaurant.getId()).stream()
                .map(this::toStaffDto)
                .toList();

        List<MealDto> meals = mealService.findAllByRestaurantIdDetailed(restaurant.getId()).stream()
                .map(this::toMealDto)
                .toList();

        List<OrderDto> orders = orderService.findAllByRestaurantIdDetailed(restaurant.getId()).stream()
                .map(this::toOrderDto)
                .toList();

        return new AdminRestaurantOverviewDto(
                restaurant.getId(),
                restaurant.getName(),
                restaurant.getAddress(),
                staff,
                meals,
                orders
        );
    }

    private AdminRestaurantDto toRestaurantDto(List<Staff> staffAssignments) {
        if (staffAssignments == null || staffAssignments.isEmpty()) {
            throw new IllegalArgumentException("staffAssignments must not be empty");
        }

        Staff first = staffAssignments.get(0);
        return new AdminRestaurantDto(
                first.getRestaurant().getId(),
                first.getRestaurant().getName(),
                first.getRestaurant().getAddress(),
                first.getUser().getId(),
                staffAssignments.stream().map(Staff::getPermission).distinct().toList()
        );
    }

    private StaffDto toStaffDto(Staff staff) {
        return new StaffDto(
                staff.getId(),
                staff.getUser().getId(),
                staff.getRestaurant().getId(),
                staff.getPermission()
        );
    }

    private MealDto toMealDto(Meal meal) {
        return new MealDto(
                meal.getId(),
                meal.getRestaurant().getId(),
                meal.getName(),
                meal.getDescription(),
                meal.getWeight(),
                meal.getCalorie(),
                meal.getImageLink(),
                meal.getCategory(),
                meal.getPrice(),
                meal.getAvailable()
        );
    }

    private OrderDto toOrderDto(Order order) {
        return new OrderDto(
                order.getId(),
                order.getStatus(),
                order.getUser().getId(),
                order.getDeliveryAddress(),
                order.getRestaurant().getId(),
                order.getCreatedAt(),
                order.getUpdatedAt(),
                order.getCourier() == null ? null : order.getCourier().getId(),
                order.getOrderType(),
                order.getItemsTotal(),
                order.getDeliveryFee(),
                order.getServiceFee(),
                order.getTotal()
        );
    }

    private AdminCourierDto toAdminCourierDto(Courier courier) {
        return new AdminCourierDto(
                courier.getId(),
                courier.getUser().getId(),
                courier.getUser().getUsername(),
                courier.getUser().getPhone(),
                courier.getUser().getEmail()
        );
    }
}
