package org.kulcha.backend.telegram;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;
import java.io.ByteArrayOutputStream;
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
        String normalized = initData.trim();
        if (normalized.startsWith("?")) {
            normalized = normalized.substring(1);
        }
        return validateAndParse(normalized, botToken);
    }

    public record TelegramUserData(long id, String username, String firstName) {}

    private TelegramUserData validateAndParse(String initData, String botToken) {
        Map<String, String> map = parseQuery(initData);
        String hash = map.remove("hash");
        // Third-party Ed25519 field; must not participate in classic HMAC data_check_string (Telegram docs).
        map.remove("signature");
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

        // Same as kickoff: urllib.parse.unquote (NOT unquote_plus): %XX → UTF-8 bytes, '+' stays '+'.
        // java.net.URLDecoder treats '+' as space and breaks the HMAC vs Python/Telegram clients.
        List<String> keys = new ArrayList<>(map.keySet());
        Collections.sort(keys);
        StringBuilder dataCheck = new StringBuilder();
        for (int i = 0; i < keys.size(); i++) {
            if (i > 0) {
                dataCheck.append('\n');
            }
            String k = keys.get(i);
            dataCheck.append(k).append('=').append(percentDecodeLikePythonUnquote(map.get(k)));
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
            String decoded = percentDecodeLikePythonUnquote(userJson);
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

    /**
     * Verifies a bot-generated auth token of the form "{telegramId}_{expiryUnix}_{hmacHex}".
     * The HMAC is computed as HMAC-SHA256(key=botToken, data="{telegramId}_{expiryUnix}").
     * Token TTL is enforced by the expiry field.
     */
    public long verifyBotAuthToken(String token, String botToken) {
        if (token == null || token.isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing bot auth token");
        }
        if (botToken == null || botToken.isBlank()) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Bot token not configured");
        }
        String[] parts = token.split("_", 3);
        if (parts.length != 3) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Malformed bot auth token");
        }
        long telegramId;
        long expiry;
        try {
            telegramId = Long.parseLong(parts[0]);
            expiry = Long.parseLong(parts[1]);
        } catch (NumberFormatException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Malformed bot auth token");
        }
        long now = System.currentTimeMillis() / 1000;
        if (now > expiry) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Bot auth token expired");
        }
        String data = parts[0] + "_" + parts[1];
        byte[] expectedHmac = hmacSha256(botToken.getBytes(StandardCharsets.UTF_8), data.getBytes(StandardCharsets.UTF_8));
        String expectedHex = bytesToHex(expectedHmac);
        if (!expectedHex.equalsIgnoreCase(parts[2])) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid bot auth token signature");
        }
        return telegramId;
    }

    /**
     * Python 3 {@code urllib.parse.unquote}: decode {@code %XX} to bytes, decode as UTF-8;
     * literal {@code +} is unchanged (unlike {@link java.net.URLDecoder} for form-urlencoded).
     */
    private static String percentDecodeLikePythonUnquote(String raw) {
        if (raw == null || raw.isEmpty()) {
            return "";
        }
        ByteArrayOutputStream out = new ByteArrayOutputStream(raw.length());
        int i = 0;
        while (i < raw.length()) {
            if (raw.charAt(i) == '%' && i + 2 < raw.length()) {
                int d1 = hexDigit(raw.charAt(i + 1));
                int d2 = hexDigit(raw.charAt(i + 2));
                if (d1 >= 0 && d2 >= 0) {
                    out.write((d1 << 4) | d2);
                    i += 3;
                    continue;
                }
            }
            int cp = raw.codePointAt(i);
            byte[] utf8 = new String(Character.toChars(cp)).getBytes(StandardCharsets.UTF_8);
            out.write(utf8, 0, utf8.length);
            i += Character.charCount(cp);
        }
        return new String(out.toByteArray(), StandardCharsets.UTF_8);
    }

    private static int hexDigit(char c) {
        if (c >= '0' && c <= '9') {
            return c - '0';
        }
        if (c >= 'a' && c <= 'f') {
            return 10 + (c - 'a');
        }
        if (c >= 'A' && c <= 'F') {
            return 10 + (c - 'A');
        }
        return -1;
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
