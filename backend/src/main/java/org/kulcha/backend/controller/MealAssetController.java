package org.kulcha.backend.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.config.KulchaProperties;
import org.kulcha.backend.model.User;
import org.kulcha.backend.service.StaffAccessService;
import org.kulcha.backend.service.UserService;
import org.kulcha.backend.telegram.TelegramWebAppService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/meal-assets")
@RequiredArgsConstructor
public class MealAssetController {

    private static final Set<String> ALLOWED = Set.of("image/jpeg", "image/png", "image/jpg");

    private final KulchaProperties kulchaProperties;
    private final TelegramWebAppService telegramWebAppService;
    private final UserService userService;
    private final StaffAccessService staffAccessService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Map<String, String> upload(
            @RequestHeader("X-Telegram-Init-Data") String initData,
            @RequestParam("restaurantId") long restaurantId,
            @RequestParam("file") MultipartFile file)
            throws IOException {
        var tg = telegramWebAppService.requireUser(initData, kulchaProperties.getTelegram().getAdminBotToken());
        User actor = userService
                .findByTelegramId(tg.id())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Unknown user"));
        staffAccessService.requireCanEditMenu(actor.getId(), restaurantId);

        if (file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Empty file");
        }
        String ct = file.getContentType();
        if (ct == null || !ALLOWED.contains(ct.toLowerCase())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only JPG, JPEG, PNG allowed");
        }

        String ext =
                switch (ct.toLowerCase()) {
                    case "image/png" -> ".png";
                    default -> ".jpg";
                };
        String name = UUID.randomUUID() + ext;
        Path dir = Path.of(kulchaProperties.getUploads().getDir(), "meals").toAbsolutePath().normalize();
        Files.createDirectories(dir);
        Path target = dir.resolve(name).normalize();
        if (!target.startsWith(dir)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid path");
        }
        file.transferTo(target.toFile());

        String publicPath = "/api/v1/meal-assets/" + name;
        return Map.of("path", publicPath);
    }

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> serve(@PathVariable String filename) {
        if (!filename.matches("[a-zA-Z0-9._-]+")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid filename");
        }
        Path dir = Path.of(kulchaProperties.getUploads().getDir(), "meals").toAbsolutePath().normalize();
        Path file = dir.resolve(filename).normalize();
        if (!file.startsWith(dir) || !Files.isRegularFile(file)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        Resource res = new FileSystemResource(file);
        String ct = "image/jpeg";
        if (filename.toLowerCase().endsWith(".png")) {
            ct = "image/png";
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CACHE_CONTROL, "public, max-age=31536000")
                .contentType(MediaType.parseMediaType(ct))
                .body(res);
    }
}
