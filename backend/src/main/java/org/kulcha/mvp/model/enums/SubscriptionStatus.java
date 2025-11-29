package org.kulcha.mvp.model.enums;

public enum SubscriptionStatus {
    NEVER_SUBSCRIBED, // ресторан только создан, подписки ещё не было
    ACTIVE,      // сейчас действует
    EXPIRED,     // истекла
    CANCELLED    // отменена досрочно
}
