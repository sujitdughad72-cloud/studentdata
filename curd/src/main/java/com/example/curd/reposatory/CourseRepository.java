package com.example.curd.reposatory;

import com.example.curd.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    Optional<Course> findByCode(String code);
    Optional<Course> findByName(String name);
    List<Course> findByDepartment(String department);
    boolean existsByCode(String code);
    boolean existsByName(String name);
}
