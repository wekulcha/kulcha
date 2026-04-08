package org.kulcha.backend.dto;

import lombok.Data;
import org.kulcha.backend.model.enums.OrderStatus;

@Data
public class OrderStatusPatchDto {
    private OrderStatus status;
}
