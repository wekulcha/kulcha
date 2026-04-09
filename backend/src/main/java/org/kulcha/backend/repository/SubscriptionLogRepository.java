package org.kulcha.backend.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.kulcha.backend.model.SubscriptionLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SubscriptionLogRepository extends JpaRepository<SubscriptionLog, Long> {

    @Query("""
            SELECT sl FROM SubscriptionLog sl
            JOIN FETCH sl.restaurant r
            WHERE r.id = :restaurantId
            ORDER BY sl.startDttm desc
            """)
    List<SubscriptionLog> findAllByRestaurantIdDetailed(@Param("restaurantId") Long restaurantId);

    @Query("""
            SELECT sl FROM SubscriptionLog sl
            JOIN FETCH sl.restaurant r
            WHERE sl.endDttm > :now
            """)
    List<SubscriptionLog> findAllActiveDetailed(@Param("now") LocalDateTime now);

}
