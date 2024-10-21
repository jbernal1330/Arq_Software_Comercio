package com.microserver.login.service;

import com.microserver.login.entities.Login;
import com.microserver.login.persistence.LoginRepository;
import com.microserver.login.service.ILoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginServiceImpl implements ILoginService {

    private final LoginRepository loginRepository;

    @Autowired
    public LoginServiceImpl(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    @Override
    public Optional<Login> findByUsername(String username) {
        return loginRepository.findByUsername(username);
    }

    @Override
    public Login save(Login login) {
        return loginRepository.save(login);
    }
}
