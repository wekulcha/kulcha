package org.kulcha.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.kulcha.backend.model.enums.OrderStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminOrderHistoryItemDto {
    private Long orderId;
    private OrderStatus status;
    private Long restaurantId;
    private String restaurantName;
    private BigDecimal total;
    private LocalDateTime createdAt;
}
