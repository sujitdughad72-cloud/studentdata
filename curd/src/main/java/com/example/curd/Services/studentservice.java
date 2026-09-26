package com.example.curd.Services;

import java.util.List;

import com.example.curd.entity.student;
import com.example.curd.reposatory.studentrepository;
import org.springframework.stereotype.Service;

@Service
public class studentservice {

    // Repository object
    private final studentrepository repo;

    // Constructor Injection
    public studentservice(studentrepository repo) {
        this.repo = repo;
    }

    // =========================
    // CREATE STUDENT
    // =========================
    public student CreateStudent(student studentreq) {

        System.out.println("Inside Service");

        // Save student into database
        return repo.save(studentreq);
    }

    // =========================
    // GET ALL STUDENTS
    // =========================
    public List<student> getAllStudents() {

        // Get all students from database
        return repo.findAll();
    }

    // =========================
    // DELETE STUDENT
    // =========================
    public String deleteStudent(Long Id) {

        // Delete one student using primary key
        repo.deleteById(Id);

        return "Student deleted successfully";
    }

    public student findbyid(long Id) {
        repo.findById(Id).orElse(null);
        return null;
    }



    public student updatestudent(long Id,student request )
    {

        student existstudent =repo.findById(Id).orElse(null);
        existstudent.setId(request.getId());
        existstudent.setName(request.getName());
        existstudent.setAge(request.getAge());
        existstudent.setEmail(request.getEmail());
        existstudent.setSubject(request.getSubject());existstudent.setJavaAttendance(
            existstudent.getJavaAttendance());

        existstudent.setDbmsAttendance(
                request.getDbmsAttendance());

        existstudent.setDsaAttendance(
                request.getDsaAttendance());

        existstudent.setCnAttendance(
                request.getCnAttendance());

        existstudent.setAiAttendance(
              request.getAiAttendance());
        return repo.save(existstudent);

    }

    public List<student> detain() {

        List<student> students = repo.findAll();

        return students.stream()
                .filter(st ->
                        st.getJavaAttendance() < 75 ||
                                st.getDbmsAttendance() < 75 ||
                                st.getDsaAttendance() < 75 ||
                                st.getCnAttendance() < 75 ||
                                st.getAiAttendance() < 75
                )
                .toList();
    }}