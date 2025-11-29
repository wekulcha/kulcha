package org.kulcha.mvp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "courier")
@Data
public class Courier {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "courier_seq")
    @SequenceGenerator(name = "courier_seq", sequenceName = "courier_seq", allocationSize = 1)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
}
