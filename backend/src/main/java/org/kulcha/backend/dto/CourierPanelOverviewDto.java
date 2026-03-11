package org.kulcha.backend.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourierPanelOverviewDto {
    private Long courierId;
    private Long userId;
    private List<OrderDto> deliveryOrders;
    private List<OrderDto> deliveryHistory;
    private List<OrderDto> createdOrders;
}
