package com.example.curd.reposatory;

import com.example.curd.entity.AcademicYear;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AcademicYearRepository extends JpaRepository<AcademicYear, Long> {
    Optional<AcademicYear> findByYearName(String yearName);
    Optional<AcademicYear> findByIsCurrentTrue();
    boolean existsByYearName(String yearName);
}
