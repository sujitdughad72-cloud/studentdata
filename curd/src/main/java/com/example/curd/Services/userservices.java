package com.example.curd.Services;

import com.example.curd.duo.userRepo;
import com.example.curd.entity.user;
import com.example.curd.reposatory.userrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class userservices {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private userrepo repo;

    public user register(user user) {
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("Username is required");
        }
        if (repo.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username '" + user.getUsername() + "' is already taken");
        }
        if (user.getEmail() != null && !user.getEmail().trim().isEmpty() && repo.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email '" + user.getEmail() + "' is already registered");
        }

        String rawPassword = user.getPassword();
        if (rawPassword != null && !rawPassword.startsWith("$2a$") && !rawPassword.startsWith("$2b$") && !rawPassword.startsWith("$2y$")) {
            user.setPassword(passwordEncoder.encode(rawPassword));
        }

        if (user.getRole() == null || user.getRole().trim().isEmpty()) {
            user.setRole("ROLE_STUDENT");
        } else {
            String role = user.getRole().trim().toUpperCase();
            if (!role.startsWith("ROLE_")) {
                role = "ROLE_" + role;
            }
            user.setRole(role);
        }

        return repo.save(user);
    }

    public user findByUsername(String username) {
        return repo.findByUsername(username);
    }

    public java.util.List<user> getAllUsers() {
        return repo.findAll();
    }
}
