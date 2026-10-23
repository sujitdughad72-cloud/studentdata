package com.example.curd.Services;

import com.example.curd.entity.Course;
import com.example.curd.reposatory.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository repo;

    public CourseService(CourseRepository repo) {
        this.repo = repo;
    }

    public List<Course> getAllCourses() {
        return repo.findAll();
    }

    public Course getCourseById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<Course> getCoursesByDepartment(String department) {
        return repo.findByDepartment(department);
    }

    public Course createCourse(Course course) {
        if (repo.existsByCode(course.getCode())) {
            throw new IllegalArgumentException("Course with code '" + course.getCode() + "' already exists");
        }
        return repo.save(course);
    }

    public Course updateCourse(Long id, Course updated) {
        Course existing = repo.findById(id).orElse(null);
        if (existing == null) {
            throw new IllegalArgumentException("Course not found with ID: " + id);
        }
        if (updated.getName() != null) existing.setName(updated.getName());
        if (updated.getCode() != null) existing.setCode(updated.getCode());
        if (updated.getDepartment() != null) existing.setDepartment(updated.getDepartment());
        if (updated.getDurationYears() > 0) existing.setDurationYears(updated.getDurationYears());
        if (updated.getTotalSemesters() > 0) existing.setTotalSemesters(updated.getTotalSemesters());
        return repo.save(existing);
    }

    public void deleteCourse(Long id) {
        if (!repo.existsById(id)) {
            throw new IllegalArgumentException("Course not found with ID: " + id);
        }
        repo.deleteById(id);
    }
}
