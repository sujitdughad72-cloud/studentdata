package com.example.curd.Controller;

import com.example.curd.Services.CourseService;
import com.example.curd.dto.ApiResponse;
import com.example.curd.entity.Course;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService service;

    public CourseController(CourseService service) {
        this.service = service;
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return service.getAllCourses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCourseById(@PathVariable Long id) {
        Course course = service.getCourseById(id);
        if (course == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Course not found with ID: " + id));
        }
        return ResponseEntity.ok(course);
    }

    @GetMapping("/department/{department}")
    public List<Course> getCoursesByDepartment(@PathVariable String department) {
        return service.getCoursesByDepartment(department);
    }

    @PostMapping
    public ResponseEntity<?> createCourse(@RequestBody Course course) {
        try {
            Course created = service.createCourse(course);
            return ResponseEntity.ok(ApiResponse.ok("Course created successfully", created));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Failed to create course: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable Long id, @RequestBody Course course) {
        try {
            Course updated = service.updateCourse(id, course);
            return ResponseEntity.ok(ApiResponse.ok("Course updated successfully", updated));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Failed to update course: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        try {
            service.deleteCourse(id);
            return ResponseEntity.ok(ApiResponse.ok("Course deleted successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Failed to delete course: " + e.getMessage()));
        }
    }
}
