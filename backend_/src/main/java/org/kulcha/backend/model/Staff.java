package org.kulcha.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.kulcha.backend.model.enums.StaffPermission;

@Getter
@Setter
@Entity
@Table(
        name = "staff",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "restaurant_id", "permission"})
)
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    @Enumerated(EnumType.STRING)
    @Column(name = "permission", nullable = false)
    private StaffPermission permission;
}
