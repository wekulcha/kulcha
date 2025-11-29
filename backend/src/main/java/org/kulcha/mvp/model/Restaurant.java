package org.kulcha.mvp.model;


import jakarta.persistence.*;
import lombok.Data;
import org.kulcha.mvp.model.enums.SubscriptionStatus;

@Entity
@Table(name = "restaurant")
@Data
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "restaurant_seq")
    @SequenceGenerator(name = "restaurant_seq", sequenceName = "restaurant_seq", allocationSize = 1)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "subscription_status", nullable = false)
    private SubscriptionStatus subscriptionStatus;
}
