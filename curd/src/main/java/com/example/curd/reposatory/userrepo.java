package com.example.curd.reposatory;

import com.example.curd.entity.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userrepo extends JpaRepository<user,Integer> {
    user findByUsername(String username);
    user findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
