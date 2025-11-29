package org.kulcha.mvp.repository;

import lombok.NonNull;
import org.kulcha.mvp.model.SubscriptionLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SubscriptionLogRepository extends JpaRepository<@NonNull SubscriptionLog, @NonNull Long> {

    List<SubscriptionLog> findByRestaurantId(Long restaurantId);

    // История подписок по ресторану, самые новые — первыми
    List<SubscriptionLog> findByRestaurantIdOrderByStartDateTimeDesc(Long restaurantId);

    // Получить последнюю (самую новую) подписку ресторана
    Optional<SubscriptionLog> findTopByRestaurantIdOrderByEndDateTimeDesc(Long restaurantId);


    // Активная подписка (start <= now < end)
    @Query("""
            SELECT s FROM SubscriptionLog s
            WHERE s.restaurant.id = :restaurantId
            AND s.startDateTime <= :now
            AND s.endDateTime > :now
            ORDER BY s.endDateTime DESC
            """)
    Optional<SubscriptionLog> findActiveSubscription(
            @Param("restaurantId") Long restaurantId,
            @Param("now") LocalDateTime now
    );

    // Последняя истекшая подписка (для случаев без active)
    @Query("""
                SELECT s FROM SubscriptionLog s
                WHERE s.restaurant.id = :restaurantId
                AND s.endDateTime <= :now
                ORDER BY s.endDateTime DESC
            """)
    Optional<SubscriptionLog> findLastExpiredSubscription(
            @Param("restaurantId") Long restaurantId,
            @Param("now") LocalDateTime now
    );

    boolean existsByRestaurantId(Long restaurantId);

    @Query("""
                SELECT s FROM SubscriptionLog s
                WHERE s.restaurant.id = :restaurantId
                ORDER BY s.startDateTime DESC
                LIMIT limit
            """)
    List<SubscriptionLog> findLatestN(
            @Param("restaurantId") Long restaurantId,
            @Param("limit") int limit
    );
}
