package org.kulcha.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.kulcha.backend.model.enums.StaffPermission;

@Getter
@Setter
@Entity
@Table(name = "staff")
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "permission", nullable = false)
    private StaffPermission permission;
}
