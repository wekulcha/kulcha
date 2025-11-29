package org.kulcha.mvp.repository;

import lombok.NonNull;
import org.kulcha.mvp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<@NonNull User, @NonNull Long> {

    Optional<User> findByPhone(String phone);

    Optional<User> findByUsername(String username);

    boolean existsByPhone(String phone);

    boolean existsByUsername(String username);
}
