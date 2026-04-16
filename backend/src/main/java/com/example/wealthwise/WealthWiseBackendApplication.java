package com.example.wealthwise;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.beans.factory.annotation.Value;

@SpringBootApplication
public class WealthWiseBackendApplication {

    @Value("${cors.allowed.origins}")
    private String allowedOrigins;

    public static void main(String[] args) {
        SpringApplication.run(WealthWiseBackendApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**").allowedOrigins(allowedOrigins).allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
}
