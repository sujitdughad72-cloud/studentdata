package com.example.curd.Controller;

import java.util.List;

import com.example.curd.Services.studentservice;
import com.example.curd.dto.ApiResponse;
import com.example.curd.entity.student;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class controller {

    private final studentservice service;

    public controller(studentservice service) {
        this.service = service;
    }

    // =========================
    // CREATE STUDENT
    // =========================
    @PostMapping("/create")
    public ResponseEntity<?> createStudent(@RequestBody student st) {
        try {
            System.out.println("Inside Controller");
            student createdStudent = service.CreateStudent(st);
            System.out.println("Student Created");
            return ResponseEntity.ok(ApiResponse.ok("Student created successfully", createdStudent));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Failed to create student: " + e.getMessage()));
        }
    }

    // =========================
    // GET ALL STUDENTS
    // =========================
    @GetMapping
    public List<student> getStudents() {
        return service.getAllStudents();
    }

    // =========================
    // PAGINATION AND FILTERING
    // =========================
    @GetMapping("/search")
    public ResponseEntity<Page<student>> searchStudents(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String course,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String academicYear,
            @RequestParam(required = false) Integer semester,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {

        Page<student> result = service.getStudentsPaged(query, course, department, academicYear, semester, page, size, sortBy, sortDir);
        return ResponseEntity.ok(result);
    }

    // =========================
    // GET STUDENT BY ID
    // =========================
    @GetMapping("/find/{Id}")
    public ResponseEntity<?> find(@PathVariable long Id) {
        student st = service.findbyid(Id);
        if (st == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Student not found with ID: " + Id));
        }
        return ResponseEntity.ok(st);
    }

    // =========================
    // GET STUDENT BY ROLLNO
    // =========================
    @GetMapping("/rollno/{rollno}")
    public ResponseEntity<?> findByRollno(@PathVariable String rollno) {
        student st = service.findByRollno(rollno);
        if (st == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Student not found with roll number: " + rollno));
        }
        return ResponseEntity.ok(st);
    }

    // =========================
    // GET STUDENT BY EMAIL
    // =========================
    @GetMapping("/email/{email}")
    public ResponseEntity<?> findByEmail(@PathVariable String email) {
        student st = service.findByEmail(email);
        if (st == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Student not found with email: " + email));
        }
        return ResponseEntity.ok(st);
    }

    // =========================
    // UPDATE STUDENT
    // =========================
    @PutMapping("/update/{Id}")
    public ResponseEntity<?> update(
            @PathVariable long Id,
            @RequestBody student st) {
        try {
            student updated = service.updatestudent(Id, st);
            return ResponseEntity.ok(ApiResponse.ok("Student updated successfully", updated));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Failed to update student: " + e.getMessage()));
        }
    }

    // =========================
    // DELETE STUDENT
    // =========================
    @DeleteMapping("/{Id}")
    public ResponseEntity<?> deleteStudent(@PathVariable long Id) {
        try {
            service.deleteStudent(Id);
            return ResponseEntity.ok(ApiResponse.ok("Student deleted successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Failed to delete student: " + e.getMessage()));
        }
    }

    // =========================
    // DETENTION LIST
    // =========================
    @GetMapping("/detain")
    public List<student> getDetain() {
        return service.detain();
    }
}