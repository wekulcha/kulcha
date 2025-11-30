package org.kulcha.mvp.repository;

import lombok.NonNull;
import org.kulcha.mvp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<@NonNull User, @NonNull Long> {

    Optional<User> findByPhone(String phone);

    Optional<User> findByUsername(String username);

    boolean existsByPhone(String phone);

    boolean existsByUsername(String username);
}
