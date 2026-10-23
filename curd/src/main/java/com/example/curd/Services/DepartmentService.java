package com.example.curd.Services;

import com.example.curd.entity.Department;
import com.example.curd.reposatory.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository repo;

    public DepartmentService(DepartmentRepository repo) {
        this.repo = repo;
    }

    public List<Department> getAllDepartments() {
        return repo.findAll();
    }

    public Department getDepartmentById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Department createDepartment(Department department) {
        if (repo.existsByName(department.getName())) {
            throw new IllegalArgumentException("Department with name '" + department.getName() + "' already exists");
        }
        if (repo.existsByCode(department.getCode())) {
            throw new IllegalArgumentException("Department with code '" + department.getCode() + "' already exists");
        }
        return repo.save(department);
    }

    public Department updateDepartment(Long id, Department updated) {
        Department existing = repo.findById(id).orElse(null);
        if (existing == null) {
            throw new IllegalArgumentException("Department not found with ID: " + id);
        }
        if (updated.getName() != null) existing.setName(updated.getName());
        if (updated.getCode() != null) existing.setCode(updated.getCode());
        if (updated.getDescription() != null) existing.setDescription(updated.getDescription());
        return repo.save(existing);
    }

    public void deleteDepartment(Long id) {
        if (!repo.existsById(id)) {
            throw new IllegalArgumentException("Department not found with ID: " + id);
        }
        repo.deleteById(id);
    }
}
