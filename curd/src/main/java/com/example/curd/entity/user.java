package com.example.curd.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class user {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(nullable = false)
    private String password;

    private String role = "ROLE_STUDENT"; // ROLE_ADMIN, ROLE_TEACHER, ROLE_STUDENT
    private String email;
    private String fullName;
    private boolean enabled = true;

    public user() {
    }

    public user(Integer id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = "ROLE_STUDENT";
        this.enabled = true;
    }

    public user(Integer id, String username, String password, String role, String email, String fullName) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = (role != null && !role.isBlank()) ? role : "ROLE_STUDENT";
        this.email = email;
        this.fullName = fullName;
        this.enabled = true;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
