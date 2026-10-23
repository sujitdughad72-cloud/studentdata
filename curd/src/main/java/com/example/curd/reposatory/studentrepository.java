package com.example.curd.reposatory;

import com.example.curd.entity.student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface studentrepository extends JpaRepository<student, Long> {

    boolean existsByRollno(String rollno);

    boolean existsByEmail(String email);

    Optional<student> findByRollno(String rollno);

    Optional<student> findByEmail(String email);

    List<student> findByCourse(String course);

    List<student> findByDepartment(String department);

    List<student> findByAcademicYear(String academicYear);

    long countByStatus(String status);

    @Query("SELECT s FROM student s WHERE " +
           "(:query IS NULL OR :query = '' OR LOWER(s.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(s.rollno) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(s.email) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
           "(:course IS NULL OR :course = '' OR LOWER(s.course) = LOWER(:course)) AND " +
           "(:department IS NULL OR :department = '' OR LOWER(s.department) = LOWER(:department)) AND " +
           "(:academicYear IS NULL OR :academicYear = '' OR s.academicYear = :academicYear) AND " +
           "(:semester IS NULL OR s.semester = :semester)")
    Page<student> filterStudents(
            @Param("query") String query,
            @Param("course") String course,
            @Param("department") String department,
            @Param("academicYear") String academicYear,
            @Param("semester") Integer semester,
            Pageable pageable
    );
}