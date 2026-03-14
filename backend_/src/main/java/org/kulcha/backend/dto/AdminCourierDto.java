package org.kulcha.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminCourierDto {
    private Long courierId;
    private Long userId;
    private String username;
    private String phone;
    private String email;
}
