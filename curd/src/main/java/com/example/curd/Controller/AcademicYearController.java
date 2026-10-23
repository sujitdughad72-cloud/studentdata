package com.example.curd.Controller;

import com.example.curd.Services.AcademicYearService;
import com.example.curd.dto.ApiResponse;
import com.example.curd.entity.AcademicYear;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/academic-years")
public class AcademicYearController {

    private final AcademicYearService service;

    public AcademicYearController(AcademicYearService service) {
        this.service = service;
    }

    @GetMapping
    public List<AcademicYear> getAllAcademicYears() {
        return service.getAllAcademicYears();
    }

    @GetMapping("/current")
    public ResponseEntity<?> getCurrentAcademicYear() {
        AcademicYear current = service.getCurrentAcademicYear();
        if (current == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("No active academic year found"));
        }
        return ResponseEntity.ok(current);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAcademicYearById(@PathVariable Long id) {
        AcademicYear ay = service.getAcademicYearById(id);
        if (ay == null) {
            return ResponseEntity.status(404).body(ApiResponse.error("Academic Year not found with ID: " + id));
        }
        return ResponseEntity.ok(ay);
    }

    @PostMapping
    public ResponseEntity<?> createAcademicYear(@RequestBody AcademicYear academicYear) {
        try {
            AcademicYear created = service.createAcademicYear(academicYear);
            return ResponseEntity.ok(ApiResponse.ok("Academic Year created successfully", created));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Failed to create academic year: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}/set-current")
    public ResponseEntity<?> setCurrentAcademicYear(@PathVariable Long id) {
        try {
            AcademicYear updated = service.setCurrentAcademicYear(id);
            return ResponseEntity.ok(ApiResponse.ok("Active academic year set to " + updated.getYearName(), updated));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Failed to set current academic year: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAcademicYear(@PathVariable Long id) {
        try {
            service.deleteAcademicYear(id);
            return ResponseEntity.ok(ApiResponse.ok("Academic Year deleted successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Failed to delete academic year: " + e.getMessage()));
        }
    }
}
