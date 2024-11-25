package com.login.Login.controller;

import com.login.Login.Entities.Login;
import com.login.Login.service.ILoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private ILoginService service;

    @PostMapping("/register")
    public ResponseEntity<String> registrar(@RequestParam String username, @RequestParam String password) {
        service.registrarUsuario(username, password);
        return ResponseEntity.ok("Usuario registrado");
    }

    @PostMapping("/validate")
    public ResponseEntity<String> validar(@RequestParam String username, @RequestParam String password) {
        if (service.validarUsuario(username, password)) {
            return ResponseEntity.ok("Acceso permitido");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
    }
}


