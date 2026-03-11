package org.kulcha.backend.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.kulcha.backend.model.enums.StaffPermission;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRestaurantDto {
    private Long id;
    private String name;
    private String address;
    private List<StaffPermission> permissions;
}
