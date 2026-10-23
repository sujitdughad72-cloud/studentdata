
package com.example.curd.Controller;

import com.example.curd.Services.userservices;


import com.example.curd.entity.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class usercontroller {

    @Autowired
    userservices userservice;

    @Autowired
    AuthenticationManager authenticate;

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
