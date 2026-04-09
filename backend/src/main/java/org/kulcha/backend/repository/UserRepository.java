package org.kulcha.backend.repository;

import java.util.Optional;
import org.kulcha.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.phone = :phone")
    Optional<User> findByPhone(@Param("phone") String phone);

    @Query("SELECT u FROM User u WHERE u.username = :username")
    Optional<User> findByUsername(@Param("username") String username);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE orders SET user_id = :newId WHERE user_id = :oldId", nativeQuery = true)
    void reassignOrdersUserId(@Param("oldId") long oldId, @Param("newId") long newId);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE staff SET user_id = :newId WHERE user_id = :oldId", nativeQuery = true)
    void reassignStaffUserId(@Param("oldId") long oldId, @Param("newId") long newId);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE courier SET user_id = :newId WHERE user_id = :oldId", nativeQuery = true)
    void reassignCourierUserId(@Param("oldId") long oldId, @Param("newId") long newId);
}
