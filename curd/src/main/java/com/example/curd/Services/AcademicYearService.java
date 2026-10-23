package com.example.curd.Services;

import com.example.curd.entity.AcademicYear;
import com.example.curd.reposatory.AcademicYearRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AcademicYearService {

    private final AcademicYearRepository repo;

    public AcademicYearService(AcademicYearRepository repo) {
        this.repo = repo;
    }

    public List<AcademicYear> getAllAcademicYears() {
        return repo.findAll();
    }

    public AcademicYear getAcademicYearById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public AcademicYear getCurrentAcademicYear() {
        return repo.findByIsCurrentTrue().orElse(null);
    }

    public AcademicYear createAcademicYear(AcademicYear academicYear) {
        if (repo.existsByYearName(academicYear.getYearName())) {
            throw new IllegalArgumentException("Academic Year '" + academicYear.getYearName() + "' already exists");
        }
        if (academicYear.isCurrent()) {
            unsetCurrentAcademicYear();
        }
        return repo.save(academicYear);
    }

    public AcademicYear setCurrentAcademicYear(Long id) {
        AcademicYear target = repo.findById(id).orElse(null);
        if (target == null) {
            throw new IllegalArgumentException("Academic Year not found with ID: " + id);
        }
        unsetCurrentAcademicYear();
        target.setCurrent(true);
        return repo.save(target);
    }

    private void unsetCurrentAcademicYear() {
        List<AcademicYear> all = repo.findAll();
        for (AcademicYear ay : all) {
            if (ay.isCurrent()) {
                ay.setCurrent(false);
                repo.save(ay);
            }
        }
    }

    public void deleteAcademicYear(Long id) {
        if (!repo.existsById(id)) {
            throw new IllegalArgumentException("Academic Year not found with ID: " + id);
        }
        repo.deleteById(id);
    }
}
