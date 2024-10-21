package com.microserver.login.controller;

import com.microserver.login.entities.Login;
import com.microserver.login.service.ILoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    private final ILoginService loginService;

    @Autowired
    public LoginController(ILoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/register")
    public ResponseEntity<Login> register(@RequestBody Login login) {
        Login savedLogin = loginService.save(login);
        return ResponseEntity.ok(savedLogin);
    }

    @GetMapping("/find/{username}")
    public ResponseEntity<Login> findByUsername(@PathVariable String username) {
        Optional<Login> login = loginService.findByUsername(username);
        return login.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}

