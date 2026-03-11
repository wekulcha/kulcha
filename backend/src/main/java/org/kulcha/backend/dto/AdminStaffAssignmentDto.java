package org.kulcha.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.kulcha.backend.model.enums.StaffPermission;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminStaffAssignmentDto {
    private Long staffId;
    private Long restaurantId;
    private String restaurantName;
    private StaffPermission permission;
}
