package com.example.curd.reposatory;

import com.example.curd.entity.student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface studentrepository extends JpaRepository<student, Long> {

}