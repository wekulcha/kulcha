package org.kulcha.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.kulcha.backend.model.enums.OrderStatus;
import org.kulcha.backend.model.enums.OrderType;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Long id;
    private OrderStatus status;
    private Long userId;
    private String deliveryAddress;
    private Long restaurantId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long courierId;
    private OrderType orderType;
    private BigDecimal itemsTotal;
    private BigDecimal deliveryFee;
    private BigDecimal serviceFee;
    private BigDecimal total;
}
