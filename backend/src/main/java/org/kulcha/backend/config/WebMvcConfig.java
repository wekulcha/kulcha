package org.kulcha.backend.config;

import java.util.ArrayList;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class WebMvcConfig {

    @Bean
    public CorsFilter corsFilter(KulchaProperties kulchaProperties) {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        // Local dev + ngrok HTTPS (wildcard); production URLs stay exact below.
        config.setAllowedOriginPatterns(
                new ArrayList<>(
                        List.of(
                                "http://localhost:*",
                                "http://127.0.0.1:*",
                                "https://*.ngrok-free.app",
                                "https://*.ngrok.io",
                                "https://*.ngrok.app",
                                "https://*.ngrok-free.dev")));
        List<String> origins = new ArrayList<>();
        if (kulchaProperties.getCors().getAdditionalOrigins() != null) {
            for (String origin : kulchaProperties.getCors().getAdditionalOrigins()) {
                if (origin != null && !origin.isBlank()) {
                    origins.add(origin.trim());
                }
            }
        }
        if (!origins.isEmpty()) {
            config.setAllowedOrigins(origins);
        }
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return new CorsFilter(source);
    }
}
