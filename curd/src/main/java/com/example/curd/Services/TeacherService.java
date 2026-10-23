package com.example.curd.Services;

import com.example.curd.entity.Teacher;
import com.example.curd.reposatory.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {

    private final TeacherRepository repo;

    public TeacherService(TeacherRepository repo) {
        this.repo = repo;
    }

    public List<Teacher> getAllTeachers() {
        return repo.findAll();
    }

    public Teacher getTeacherById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<Teacher> getTeachersByDepartment(String department) {
        return repo.findByDepartment(department);
    }

    public Teacher createTeacher(Teacher teacher) {
        if (repo.existsByEmail(teacher.getEmail())) {
            throw new IllegalArgumentException("Teacher with email '" + teacher.getEmail() + "' already exists");
        }
        if (repo.existsByEmployeeId(teacher.getEmployeeId())) {
            throw new IllegalArgumentException("Teacher with employee ID '" + teacher.getEmployeeId() + "' already exists");
        }
        return repo.save(teacher);
    }

    public Teacher updateTeacher(Long id, Teacher updated) {
        Teacher existing = repo.findById(id).orElse(null);
        if (existing == null) {
            throw new IllegalArgumentException("Teacher not found with ID: " + id);
        }
        if (updated.getName() != null) existing.setName(updated.getName());
        if (updated.getDepartment() != null) existing.setDepartment(updated.getDepartment());
        if (updated.getDesignation() != null) existing.setDesignation(updated.getDesignation());
        if (updated.getPhone() != null) existing.setPhone(updated.getPhone());
        if (updated.getQualification() != null) existing.setQualification(updated.getQualification());
        return repo.save(existing);
    }

    public void deleteTeacher(Long id) {
        if (!repo.existsById(id)) {
            throw new IllegalArgumentException("Teacher not found with ID: " + id);
        }
        repo.deleteById(id);
    }
}
