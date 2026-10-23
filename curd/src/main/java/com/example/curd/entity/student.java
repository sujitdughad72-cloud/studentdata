package com.example.curd.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private int age;

    @Column(unique = true, nullable = false)
    private String rollno;

    private String subject;

    @Column(unique = true, nullable = false)
    private String email;

    private String course;
    private String department;
    private String academicYear;
    private Integer semester = 1;
    private String phone;
    private String address;
    private String gender;
    private String status = "ACTIVE"; // ACTIVE, INACTIVE, DETAINED

    private double javaAttendance;
    private double dbmsAttendance;
    private double dsaAttendance;
    private double cnAttendance;
    private double aiAttendance;

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

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getJavaAttendance() {
        return javaAttendance;
    }

    public void setJavaAttendance(double javaAttendance) {
        this.javaAttendance = javaAttendance;
    }

    public double getDbmsAttendance() {
        return dbmsAttendance;
    }

    public void setDbmsAttendance(double dbmsAttendance) {
        this.dbmsAttendance = dbmsAttendance;
    }

    public double getDsaAttendance() {
        return dsaAttendance;
    }

    public void setDsaAttendance(double dsaAttendance) {
        this.dsaAttendance = dsaAttendance;
    }

    public double getCnAttendance() {
        return cnAttendance;
    }

    public void setCnAttendance(double cnAttendance) {
        this.cnAttendance = cnAttendance;
    }

    public double getAiAttendance() {
        return aiAttendance;
    }

    public void setAiAttendance(double aiAttendance) {
        this.aiAttendance = aiAttendance;
    }



    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getRollno() {
        return rollno;
    }

    public void setRollno(String rollno) {
        this.rollno = rollno;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}