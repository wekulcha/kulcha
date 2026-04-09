package org.kulcha.backend.dto;

import lombok.Data;
import org.kulcha.backend.model.enums.StaffPermission;

@Data
public class AddStaffRequestDto {
    private Long telegramId;
    private StaffPermission permission;
}
