package org.kulcha.mvp.model;


import jakarta.persistence.*;
import lombok.Data;
import org.kulcha.mvp.model.enums.Role;

@Entity
@Table(name = "staff", uniqueConstraints = @UniqueConstraint(columnNames = {"restaurant_id", "user_id"}))
@Data
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "staff_seq")
    @SequenceGenerator(name = "staff_seq", sequenceName = "staff_seq", allocationSize = 1)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false) // если член стаффа, то должен иметь какую то роль
    private Role role;
}
