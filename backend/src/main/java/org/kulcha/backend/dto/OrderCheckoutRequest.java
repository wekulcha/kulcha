package org.kulcha.backend.dto;

import java.math.BigDecimal;
import java.util.List;
import lombok.Data;
import org.kulcha.backend.model.enums.OrderType;

@Data
public class OrderCheckoutRequest {
    private Long restaurantId;
    private String deliveryAddress;
    private OrderType orderType;
    private BigDecimal itemsTotal;
    private BigDecimal deliveryFee;
    private BigDecimal serviceFee;
    private BigDecimal total;
    private List<Line> items;

    @Data
    public static class Line {
        private Long mealId;
        private Integer quantity;
        private BigDecimal unitPrice;
    }
}
