package org.kulcha.backend.dto;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.kulcha.backend.model.enums.MealCategory;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MealDto {
    private Long id;
    private Long restaurantId;
    private String name;
    private String description;
    private Integer weight;
    private Integer calorie;
    private String imageLink;
    private MealCategory category;
    private BigDecimal price;
    private Boolean available;
}
