package org.kulcha.backend.config;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Data
@ConfigurationProperties(prefix = "kulcha")
public class KulchaProperties {

    private final Telegram telegram = new Telegram();
    private final Security security = new Security();
    private final Uploads uploads = new Uploads();
    private final Cors cors = new Cors();

    @Data
    public static class Telegram {
        /** Bot token for the customer mini app (WebApp initData signature). */
        private String userBotToken = "";
        /** Bot token for the restaurant admin mini app. */
        private String adminBotToken = "";
    }

    @Data
    public static class Security {
        /** Shared secret for server-side calls from Python bots (e.g. PATCH order status). */
        private String internalApiSecret = "";
        /** If set, POST /users from bots must send X-Kulcha-Bot-Secret. */
        private String botApiSecret = "";
    }

    // нужно не в директорию сохранять, а в Object Storage Yandex Cloud: restaurant_name/menu/{first, second, salads}/{meal_name}.{png, jpg}
    @Data
    public static class Uploads {
        /** Directory for meal images (created on startup if possible). */
        private String dir = "./uploads";
    }

    @Data
    public static class Cors {
        private List<String> additionalOrigins = new ArrayList<>();
    }

    public void requireBotApiSecret(String provided) {
        String want = security.getBotApiSecret();
        if (want == null || want.isBlank()) {
            return;
        }
        if (provided == null || !want.equals(provided)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid bot API secret");
        }
    }

    public void requireInternalSecret(String provided) {
        String want = security.getInternalApiSecret();
        if (want == null || want.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE, "Internal API secret is not configured");
        }
        if (provided == null || !want.equals(provided)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid internal secret");
        }
    }

    /** For optional server-to-server reads (e.g. superadmin tools) when secret is configured. */
    public boolean isInternalOk(String provided) {
        String want = security.getInternalApiSecret();
        if (want == null || want.isBlank()) {
            return false;
        }
        return want.equals(provided);
    }
}
