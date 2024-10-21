package com.microserver.login.service;

import com.microserver.login.entities.Login;

import java.util.Optional;

public interface ILoginService {
    Optional<Login> findByUsername(String username);
    Login save(Login login);
}
