package org.kulcha.backend.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    /** Telegram peer id (same as in WebApp / bot). Incoming JSON may use {@code telegramId}. */
    @JsonAlias("telegramId")
    private Long id;

    private String username;
    private String phone;
    private String email;
    private String address;
    private LocalDateTime registeredAt;
}
