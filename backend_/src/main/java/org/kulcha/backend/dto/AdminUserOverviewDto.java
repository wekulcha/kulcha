package org.kulcha.backend.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserOverviewDto {
    private Long id;
    private String username;
    private String phone;
    private String email;
    private String address;
    private boolean courier;
    private List<AdminStaffAssignmentDto> staffAssignments;
    private List<AdminOrderHistoryItemDto> orderHistory;
}
