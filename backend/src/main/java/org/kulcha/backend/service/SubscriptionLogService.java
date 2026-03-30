package org.kulcha.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.exception.SubscriptionLogNotFoundException;
import org.kulcha.backend.model.SubscriptionLog;
import org.kulcha.backend.repository.SubscriptionLogRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SubscriptionLogService {

    private final SubscriptionLogRepository subscriptionLogRepository;

    @Transactional
    public SubscriptionLog create(SubscriptionLog subscriptionLog) {
        return subscriptionLogRepository.save(subscriptionLog);
    }

    public Optional<SubscriptionLog> findById(Long id) {
        return subscriptionLogRepository.findById(id);
    }

    public List<SubscriptionLog> findAll() {
        return subscriptionLogRepository.findAll();
    }

    public List<SubscriptionLog> findAllByRestaurantIdDetailed(Long restaurantId) {
        return subscriptionLogRepository.findAllByRestaurantIdDetailed(restaurantId);
    }

    public List<SubscriptionLog> findAllActiveDetailed() {
        return subscriptionLogRepository.findAllActiveDetailed(LocalDateTime.now());
    }

    public List<SubscriptionLog> findAllActiveDetailed(LocalDateTime now) {
        return subscriptionLogRepository.findAllActiveDetailed(now);
    }

    @Transactional
    public SubscriptionLog update(Long id, SubscriptionLog updatedSubscriptionLog) {
        SubscriptionLog existingSubscriptionLog = subscriptionLogRepository.findById(id)
                .orElseThrow(() -> new SubscriptionLogNotFoundException(id));

        existingSubscriptionLog.setRestaurant(updatedSubscriptionLog.getRestaurant());
        existingSubscriptionLog.setPrice(updatedSubscriptionLog.getPrice());
        existingSubscriptionLog.setStartDttm(updatedSubscriptionLog.getStartDttm());
        existingSubscriptionLog.setEndDttm(updatedSubscriptionLog.getEndDttm());
        return subscriptionLogRepository.save(existingSubscriptionLog);
    }

    @Transactional
    public void deleteById(Long id) {
        subscriptionLogRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return subscriptionLogRepository.existsById(id);
    }
}
