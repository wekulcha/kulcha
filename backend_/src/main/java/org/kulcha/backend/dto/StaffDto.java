package org.kulcha.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.kulcha.backend.model.enums.StaffPermission;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffDto {
    private Long id;
    private Long userId;
    private Long restaurantId;
    private StaffPermission permission;
}
