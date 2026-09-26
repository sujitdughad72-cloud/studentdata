package com.example.curd.Controller;

import java.util.List;

import com.example.curd.Services.studentservice;
import com.example.curd.entity.student;

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
    public String createStudent(@RequestBody student st) {

        System.out.println("Inside Controller");

        student createdStudent = service.CreateStudent(st);

        System.out.println("Student Created");

        return "Student created successfully";
    }


    // =========================
    // GET ALL STUDENTS
    // =========================

    @GetMapping
    public List<student> getStudents() {

        return service.getAllStudents();
    }


    // =========================
    // GET STUDENT BY ID
    // =========================

    @GetMapping("/find/{Id}")
    public student find(@PathVariable long Id) {

        return service.findbyid(Id);
    }


    // =========================
    // UPDATE STUDENT
    // =========================

    @PutMapping("/update/{Id}")
    public student update(
            @PathVariable long Id,
            @RequestBody student st) {

        return service.updatestudent(Id, st);
    }


    // =========================
    // DELETE STUDENT
    // =========================

    @DeleteMapping("/{Id}")
    public String deleteStudent(@PathVariable long Id) {

        service.deleteStudent(Id);

        return "Student deleted successfully";
    }


    // =========================
    // DETENTION LIST
    // =========================

    @GetMapping("/detain")
    public List<student> getDetain() {

        return service.detain();
    }

}