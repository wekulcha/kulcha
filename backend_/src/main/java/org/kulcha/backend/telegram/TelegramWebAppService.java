package org.kulcha.backend.telegram;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class TelegramWebAppService {

    private static final int MAX_AUTH_AGE_SECONDS = 86400;
    private final ObjectMapper objectMapper;

    public TelegramUserData requireUser(String initData, String botToken) {
        if (botToken == null || botToken.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE, "Telegram bot token is not configured");
        }
        if (initData == null || initData.isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing Telegram WebApp data");
        }
        return validateAndParse(initData, botToken);
    }

    public record TelegramUserData(long id, String username, String firstName) {}

    private TelegramUserData validateAndParse(String initData, String botToken) {
        Map<String, String> map = parseQuery(initData);
        String hash = map.remove("hash");
        if (hash == null || hash.isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid init data: no hash");
        }

        String authDateStr = map.get("auth_date");
        if (authDateStr != null) {
            try {
                long authDate = Long.parseLong(authDateStr);
                long now = System.currentTimeMillis() / 1000;
                if (now - authDate > MAX_AUTH_AGE_SECONDS) {
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Init data expired");
                }
            } catch (NumberFormatException ignored) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid auth_date");
            }
        }

        List<String> keys = new ArrayList<>(map.keySet());
        Collections.sort(keys);
        StringBuilder dataCheck = new StringBuilder();
        for (int i = 0; i < keys.size(); i++) {
            if (i > 0) {
                dataCheck.append('\n');
            }
            String k = keys.get(i);
            dataCheck.append(k).append('=').append(map.get(k));
        }

        byte[] secretKey = hmacSha256("WebAppData".getBytes(StandardCharsets.UTF_8), botToken.getBytes(StandardCharsets.UTF_8));
        byte[] calculated = hmacSha256(secretKey, dataCheck.toString().getBytes(StandardCharsets.UTF_8));
        String calculatedHex = bytesToHex(calculated);
        if (!calculatedHex.equalsIgnoreCase(hash)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Bad Telegram signature");
        }

        String userJson = map.get("user");
        if (userJson == null || userJson.isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No user in init data");
        }
        try {
            String decoded = URLDecoder.decode(userJson, StandardCharsets.UTF_8);
            JsonNode node = objectMapper.readTree(decoded);
            long id = node.path("id").asLong(0);
            if (id == 0) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid user id");
            }
            String username = node.path("username").asText(null);
            String firstName = node.path("first_name").asText("");
            return new TelegramUserData(id, username, firstName);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Cannot parse Telegram user");
        }
    }

    private static Map<String, String> parseQuery(String initData) {
        Map<String, String> map = new HashMap<>();
        for (String part : initData.split("&")) {
            if (part.isEmpty()) {
                continue;
            }
            int eq = part.indexOf('=');
            if (eq < 0) {
                map.put(part, "");
            } else {
                String k = part.substring(0, eq);
                String v = part.substring(eq + 1);
                map.put(k, v);
            }
        }
        return map;
    }

    private static byte[] hmacSha256(byte[] secret, byte[] data) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret, "HmacSHA256"));
            return mac.doFinal(data);
        } catch (Exception e) {
            throw new IllegalStateException("HMAC failed", e);
        }
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder(bytes.length * 2);
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}
