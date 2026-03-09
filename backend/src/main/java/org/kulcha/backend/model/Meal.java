package org.kulcha.backend.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;
import org.kulcha.backend.model.enums.MealCategory;

@Getter
@Setter
@Entity
@Table(name = "meal")
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Integer id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "weight")
    private Integer weight;

    @Column(name = "calorie")
    private Integer calorie;

    @Column(name = "image_link", nullable = false)
    private String imageLink;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private MealCategory category;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Column(name = "is_available", nullable = false)
    private Boolean available = Boolean.TRUE;
}