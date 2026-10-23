package com.example.curd.reposatory;

import com.example.curd.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Optional<Subject> findByCode(String code);
    Optional<Subject> findByName(String name);
    List<Subject> findByCourse(String course);
    List<Subject> findByDepartment(String department);
    List<Subject> findByCourseAndSemester(String course, int semester);
    List<Subject> findByAssignedTeacherId(Long assignedTeacherId);
    List<Subject> findByAssignedTeacher(String assignedTeacher);
    boolean existsByCode(String code);
}
