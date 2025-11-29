package org.kulcha.mvp.repository;

import lombok.NonNull;
import org.kulcha.mvp.model.Restaurant;
import org.kulcha.mvp.model.enums.SubscriptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<@NonNull Restaurant, @NonNull Long> {
    // Найти ресторан по точному имени
    Optional<Restaurant> findByName(String name);

    // Поиск ресторанов по части названия (для поиска в админке / каталоге)
    List<Restaurant> findByNameContainingIgnoreCase(String namePart);

    // Проверка, существует ли ресторан с таким именем и адресом (чтобы не дублировать)
    boolean existsByNameAndAddress(String name, String address);

    // Получить все рестораны с конкретным статусом подписки
    List<Restaurant> findBySubscriptionStatus(SubscriptionStatus status);

    // Частый кейс: активные рестораны
    List<Restaurant> findBySubscriptionStatusIn(List<SubscriptionStatus> statuses);
}
