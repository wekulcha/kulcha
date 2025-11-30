package org.kulcha.mvp.repository;

import lombok.NonNull;
import org.kulcha.mvp.model.Courier;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourierRepository extends JpaRepository<@NonNull Courier, @NonNull Long> {

    Optional<Courier> findByUserId(Long userId);

    boolean existsByUserId(Long userId);

    @EntityGraph(attributePaths = {"user"})
    Optional<Courier> findWithUserById(Long id);

    @EntityGraph(attributePaths = {"user"})
    Optional<Courier> findWithUserByUserId(Long userId);

    @EntityGraph(attributePaths = {"user"})
    List<Courier> findAllBy();
}
