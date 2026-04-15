package org.kulcha.backend.dto.internal;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Payload from auth-gateway (Python) after it validated Telegram WebApp initData.
 */
public record InternalWebappUserRequest(
        @JsonProperty("telegramId") long telegramId,
        String username,
        String firstName) {}
