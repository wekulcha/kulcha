package org.kulcha.backend.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.dto.OrderCheckoutRequest;
import org.kulcha.backend.model.Meal;
import org.kulcha.backend.model.Order;
import org.kulcha.backend.model.OrderPosition;
import org.kulcha.backend.model.Restaurant;
import org.kulcha.backend.model.User;
import org.kulcha.backend.model.enums.OrderStatus;
import org.kulcha.backend.repository.MealRepository;
import org.kulcha.backend.repository.OrderRepository;
import org.kulcha.backend.repository.OrderPositionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class OrderPlacementService {

    private final OrderRepository orderRepository;
    private final OrderPositionRepository orderPositionRepository;
    private final MealRepository mealRepository;
    private final OrderTelegramNotifier orderTelegramNotifier;

    @Transactional
    public Order checkout(long dbUserId, OrderCheckoutRequest req) {
        if (req.getRestaurantId() == null || req.getItems() == null || req.getItems().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid checkout payload");
        }
        if (req.getOrderType() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "orderType is required");
        }

        User user = new User();
        user.setId(dbUserId);

        Restaurant restaurant = new Restaurant();
        restaurant.setId(req.getRestaurantId());

        Order order = new Order();
        order.setStatus(OrderStatus.CREATED);
        order.setUser(user);
        order.setDeliveryAddress(req.getDeliveryAddress());
        order.setRestaurant(restaurant);
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());
        order.setCourier(null);
        order.setOrderType(req.getOrderType());
        order.setItemsTotal(req.getItemsTotal() != null ? req.getItemsTotal() : BigDecimal.ZERO);
        order.setDeliveryFee(req.getDeliveryFee() != null ? req.getDeliveryFee() : BigDecimal.ZERO);
        order.setServiceFee(req.getServiceFee() != null ? req.getServiceFee() : BigDecimal.ZERO);
        order.setTotal(req.getTotal() != null ? req.getTotal() : BigDecimal.ZERO);

        Order savedOrder = orderRepository.save(order);

        for (OrderCheckoutRequest.Line line : req.getItems()) {
            if (line.getMealId() == null || line.getQuantity() == null || line.getQuantity() <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid order line");
            }
            Meal meal = mealRepository
                    .findDetailedById(line.getMealId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unknown meal"));
            if (!meal.getRestaurant().getId().equals(req.getRestaurantId())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Meal does not belong to restaurant");
            }
            BigDecimal unit = line.getUnitPrice() != null ? line.getUnitPrice() : meal.getPrice();
            BigDecimal lineTotal = unit.multiply(BigDecimal.valueOf(line.getQuantity()));

            OrderPosition pos = new OrderPosition();
            pos.setMeal(meal);
            pos.setOrder(savedOrder);
            pos.setQuantity(line.getQuantity());
            pos.setUnitPrice(unit);
            pos.setTotalPrice(lineTotal);
            orderPositionRepository.save(pos);
        }

        orderTelegramNotifier.notifyOrderPlaced(savedOrder.getId());
        return savedOrder;
    }
}
