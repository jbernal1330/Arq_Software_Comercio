package com.gateway.gateaway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Deshabilita CSRF
                .cors(cors -> cors.disable()) // Deshabilita CORS si no es necesario, puedes ajustarlo según tu caso
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); // Permite todas las solicitudes
        return http.build();
    }
}
