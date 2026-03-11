package org.kulcha.backend.repository;

import java.util.List;
import java.util.Optional;
import org.kulcha.backend.model.Courier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CourierRepository extends JpaRepository<Courier, Long> {

    @Query("""
            SELECT c from Courier c
            JOIN FETCH c.user u
            WHERE c.id = :id
            """)
    Optional<Courier> findWithUserById(@Param("id") Long id);

    @Query("""
            SELECT c FROM Courier c
            JOIN FETCH c.user u
            WHERE u.id = :userId
            """)
    Optional<Courier> findByUserIdDetailed(@Param("userId") Long userId);

    @Query("""
            SELECT c FROM Courier c
            JOIN FETCH c.user u
            ORDER BY c.id
            """)
    List<Courier> findAllDetailed();

    boolean existsByUser_Id(Long userId);
}
