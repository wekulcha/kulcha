package org.kulcha.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    /** Primary key: Telegram user (peer) id — same everywhere in API and DB. */
    @Id
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @Column(name = "username", nullable = false, length = 200)
    private String username;

    @Column(name = "phone", nullable = false, unique = true)
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "address")
    private String address;

    @Column(name = "registered_at", nullable = false)
    private LocalDateTime registeredAt;
}
