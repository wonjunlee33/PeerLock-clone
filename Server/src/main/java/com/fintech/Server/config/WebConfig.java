package com.fintech.Server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 엔드포인트에 대하여
                .allowedOriginPatterns("*") // 모든 출처를 허용
                .allowedMethods("GET", "POST", "PUT", "PATCH","DELETE") // 허용할 HTTP 메서드
                .allowedHeaders("*") // 모든 헤더를 허용
                .allowCredentials(true) // 인증 정보를 포함한 요청을 허용
                .maxAge(3600); // pre-flight 응답 캐시 시간
    }
}
