package org.kulcha.backend.telegram;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import tools.jackson.databind.json.JsonMapper;

class TelegramWebAppServiceTest {

    private static final String BOT_TOKEN = "123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11";

    /**
     * Hash computed with Python kickoff algorithm (hmac + urllib.parse.unquote).
     * auth_date far in the future so TTL check in {@link TelegramWebAppService} does not fail.
     */
    private static final String REF_INIT_DATA =
            "auth_date=2000000000&query_id=AA&user=%7B%22id%22%3A123456789%2C%22first_name%22%3A%22Test%22%7D&hash=197b3c843b88024717172fe04c6e47c12e2b9dfcb94825845384a324b3e75882";

    @Test
    void validateAndParse_matchesPythonKickoffHmac() {
        TelegramWebAppService svc = new TelegramWebAppService(JsonMapper.builder().build());
        TelegramWebAppService.TelegramUserData u = svc.requireUser(REF_INIT_DATA, BOT_TOKEN);
        assertEquals(123456789L, u.id());
        assertEquals("Test", u.firstName());
    }

    /**
     * '+' in raw values must not become space (unquote, not unquote_plus / URLDecoder).
     * Hash from Python kickoff with query_id=a+b.
     */
    @Test
    void plusInQueryValueDoesNotBecomeSpace() {
        String full =
                "auth_date=2000000000&query_id=a+b&user=%7B%22id%22%3A123456789%2C%22first_name%22%3A%22Test%22%7D&hash=bc25dc6bdeeff1534e7af83ae0a551c1b613767361ed41317470a8fa7618e8de";
        TelegramWebAppService svc = new TelegramWebAppService(JsonMapper.builder().build());
        TelegramWebAppService.TelegramUserData u = svc.requireUser(full, BOT_TOKEN);
        assertEquals(123456789L, u.id());
    }
}
