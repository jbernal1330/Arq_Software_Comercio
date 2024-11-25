package com.login.Login.service;

import com.login.Login.Entities.Login;
import com.login.Login.persistence.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ILoginService {

    @Autowired
    private LoginRepository repository;

    public Login registrarUsuario(String username, String password) {
        Login usuario = new Login();
        usuario.setUsername(username);
        usuario.setPassword(password); // Asegúrate de usar un algoritmo hash, como BCrypt.
        return repository.save(usuario);
    }

    public boolean validarUsuario(String username, String password) {
        Optional<Login> usuario = repository.findByUsername(username);
        return usuario.isPresent() && usuario.get().getPassword().equals(password); // Compara hash aquí.
    }
}
