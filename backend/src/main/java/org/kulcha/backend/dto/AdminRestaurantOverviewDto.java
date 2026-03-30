package org.kulcha.backend.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminRestaurantOverviewDto {
    private Long id;
    private String name;
    private String address;
    private List<StaffDto> staff;
    private List<MealDto> meals;
    private List<OrderDto> orderHistory;
}
