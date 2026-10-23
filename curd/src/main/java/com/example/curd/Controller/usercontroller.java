package com.example.curd.Controller;

import com.example.curd.Services.userservices;
import com.example.curd.entity.user;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
public class usercontroller {

    @Autowired
    userservices userservice;

    @Autowired
    AuthenticationManager authenticate;

    // Handle GET /login and /register from browser so they don't trigger 405 Method Not Allowed
    @GetMapping({"/login", "/register", "/Register"})
    public void forwardAuthPage(HttpServletResponse response) throws IOException {
        response.sendRedirect("/");
    }

    @PostMapping({"/Register", "/register"})
    public user register(@RequestBody user user) {
        return userservice.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody user user) {

        Authentication authentication = authenticate.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                )
        );

        return "Login successful";
    }
}
