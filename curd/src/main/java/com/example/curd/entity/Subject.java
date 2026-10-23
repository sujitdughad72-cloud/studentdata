package com.example.curd.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "subjects")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String code; // e.g. CS101, IT201

    @Column(nullable = false)
    private String name;

    private int credits = 3;

    private String course;

    private String department;

    private int semester = 1;

    private String assignedTeacher;

    private Long assignedTeacherId;

    public Subject() {
    }

    public Subject(Long id, String code, String name, int credits, String course, String department, int semester, String assignedTeacher, Long assignedTeacherId) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.credits = credits;
        this.course = course;
        this.department = department;
        this.semester = semester;
        this.assignedTeacher = assignedTeacher;
        this.assignedTeacherId = assignedTeacherId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public int getSemester() {
        return semester;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }

    public String getAssignedTeacher() {
        return assignedTeacher;
    }

    public void setAssignedTeacher(String assignedTeacher) {
        this.assignedTeacher = assignedTeacher;
    }

    public Long getAssignedTeacherId() {
        return assignedTeacherId;
    }

    public void setAssignedTeacherId(Long assignedTeacherId) {
        this.assignedTeacherId = assignedTeacherId;
    }
}
