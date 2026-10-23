package com.example.curd.Services;

import com.example.curd.duo.userRepo;
import com.example.curd.entity.user;
import com.example.curd.entity.userprinciple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class myuserservices implements UserDetailsService {
    @Autowired
    userRepo userRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        user user = userRepo.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(
                    "User not found: " + username
            );
        }

        return new userprinciple(user);

    }
}
