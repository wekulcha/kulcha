package org.kulcha.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionLogDto {
    private Long id;
    private Long restaurantId;
    private BigDecimal price;
    private LocalDateTime startDttm;
    private LocalDateTime endDttm;
}
