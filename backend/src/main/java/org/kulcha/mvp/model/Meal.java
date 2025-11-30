package org.kulcha.mvp.model;


import jakarta.persistence.*;
import lombok.Data;
import org.kulcha.mvp.model.enums.Category;

import java.math.BigDecimal;

@Entity
@Table(name = "meal")
@Data
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "meal_seq")
    @SequenceGenerator(name = "meal_seq", sequenceName = "meal_seq", allocationSize = 1)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Column
    private Long weight; // в граммах

    @Column
    private Long calorie;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Category category;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private boolean available = true;
}
