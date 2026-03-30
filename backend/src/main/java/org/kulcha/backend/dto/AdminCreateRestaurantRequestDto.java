package org.kulcha.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminCreateRestaurantRequestDto {
    private String name;
    private String address;
    private Long adminUserId;
}
