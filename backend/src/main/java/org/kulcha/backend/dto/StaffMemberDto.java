package org.kulcha.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.kulcha.backend.model.enums.StaffPermission;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffMemberDto {
    private Long staffId;
    /** Telegram peer id (same as {@code users.id}). */
    private Long userId;
    private String username;
    private String phone;
    private StaffPermission permission;
}
