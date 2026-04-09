package org.kulcha.backend.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminWebAppSessionDto {
    private UserDto user;
    private List<UserRestaurantDto> restaurants;
}
