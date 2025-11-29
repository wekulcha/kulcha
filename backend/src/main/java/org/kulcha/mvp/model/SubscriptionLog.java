package org.kulcha.mvp.model;


import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "subscription_log")
@Data
public class SubscriptionLog {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "subscription_seq")
    @SequenceGenerator(name = "subscription_seq", sequenceName = "subscription_seq", allocationSize = 1)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "start_dttm", nullable = false)
    private LocalDateTime startDateTime;

    @Column(name = "end_dttm", nullable = false)
    private LocalDateTime endDateTime;
}
