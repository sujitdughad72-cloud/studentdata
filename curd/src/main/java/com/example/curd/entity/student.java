package com.example.curd.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private int age;
    private String rollno;
    private String subject;
    private String email;
    private double javaAttendance;
    private double dbmsAttendance;
    private double dsaAttendance;
    private double cnAttendance;
    private double aiAttendance;

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