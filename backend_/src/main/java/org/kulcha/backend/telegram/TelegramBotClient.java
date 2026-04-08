package org.kulcha.backend.telegram;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class TelegramBotClient {

    private static final HttpClient HTTP = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    private final ObjectMapper objectMapper;

    public void sendMessage(String botToken, long chatId, String text, String parseMode, String replyMarkupJson) {
        if (botToken == null || botToken.isBlank()) {
            log.warn("Telegram send skipped: empty bot token");
            return;
        }
        try {
            Map<String, Object> body = new HashMap<>();
            body.put("chat_id", chatId);
            body.put("text", text);
            if (parseMode != null && !parseMode.isBlank()) {
                body.put("parse_mode", parseMode);
            }
            if (replyMarkupJson != null && !replyMarkupJson.isBlank()) {
                body.put("reply_markup", objectMapper.readTree(replyMarkupJson));
            }
            String json = objectMapper.writeValueAsString(body);
            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.telegram.org/bot" + botToken + "/sendMessage"))
                    .timeout(Duration.ofSeconds(15))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();
            HttpResponse<String> resp = HTTP.send(req, HttpResponse.BodyHandlers.ofString());
            if (resp.statusCode() < 200 || resp.statusCode() >= 300) {
                log.warn("Telegram sendMessage failed: {} body={}", resp.statusCode(), resp.body());
            }
        } catch (Exception e) {
            log.warn("Telegram sendMessage error: {}", e.getMessage());
        }
    }
}
