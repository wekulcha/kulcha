package org.kulcha.backend.repository;

import java.util.List;
import java.util.Optional;
import org.kulcha.backend.model.Staff;
import org.kulcha.backend.model.enums.StaffPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StaffRepository extends JpaRepository<Staff, Long> {

    @Query("""
            SELECT s FROM Staff s
            JOIN FETCH s.user u
            JOIN FETCH s.restaurant r
            where s.id = :id
            """)
    Optional<Staff> findWithUserById(@Param("id") Long id);

    @Query("""
            select s from Staff s
            join fetch s.user u
            join fetch s.restaurant r
            where u.id = :userId
            """)
    List<Staff> findByUserIdDetailed(@Param("userId") Long userId);

    @Query("""
            select s from Staff s
            join fetch s.user u
            join fetch s.restaurant r
            where r.id = :restaurantId
            """)
    List<Staff> findAllByRestaurantIdDetailed(@Param("restaurantId") Long restaurantId);

    @Query("""
            select s from Staff s
            join fetch s.user u
            join fetch s.restaurant r
            where s.permission = :permission
            """)
    List<Staff> findAllByPermissionDetailed(@Param("permission") StaffPermission permission);

    boolean existsByUser_IdAndRestaurant_IdAndPermission(Long userId, Long restaurantId, StaffPermission permission);
}
