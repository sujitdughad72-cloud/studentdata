package com.example.curd.Services;

import java.util.List;

import com.example.curd.entity.student;
import com.example.curd.reposatory.studentrepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

        if (studentreq.getRollno() != null && repo.existsByRollno(studentreq.getRollno())) {
            throw new IllegalArgumentException("Student with roll number '" + studentreq.getRollno() + "' already exists");
        }
        if (studentreq.getEmail() != null && repo.existsByEmail(studentreq.getEmail())) {
            throw new IllegalArgumentException("Student with email '" + studentreq.getEmail() + "' already exists");
        }

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
    // PAGINATION AND FILTERING
    // =========================
    public Page<student> getStudentsPaged(
            String query,
            String course,
            String department,
            String academicYear,
            Integer semester,
            int page,
            int size,
            String sortBy,
            String sortDir) {

        Sort sort = sortDir.equalsIgnoreCase("desc") ?
                Sort.by(sortBy).descending() :
                Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        return repo.filterStudents(query, course, department, academicYear, semester, pageable);
    }

    // =========================
    // DELETE STUDENT
    // =========================
    public String deleteStudent(Long Id) {
        // Delete one student using primary key
        if (!repo.existsById(Id)) {
            throw new IllegalArgumentException("Student not found with ID: " + Id);
        }
        repo.deleteById(Id);
        return "Student deleted successfully";
    }

    public student findbyid(long Id) {
        return repo.findById(Id).orElse(null);
    }

    public student findByRollno(String rollno) {
        return repo.findByRollno(rollno).orElse(null);
    }

    public student findByEmail(String email) {
        return repo.findByEmail(email).orElse(null);
    }

    public student updatestudent(long Id, student request) {
        student existstudent = repo.findById(Id).orElse(null);
        if (existstudent == null) {
            throw new IllegalArgumentException("Student not found with ID: " + Id);
        }

        // Check unique rollno if changed
        if (request.getRollno() != null && !request.getRollno().equalsIgnoreCase(existstudent.getRollno())) {
            if (repo.existsByRollno(request.getRollno())) {
                throw new IllegalArgumentException("Roll number '" + request.getRollno() + "' is already assigned to another student");
            }
            existstudent.setRollno(request.getRollno());
        }

        // Check unique email if changed
        if (request.getEmail() != null && !request.getEmail().equalsIgnoreCase(existstudent.getEmail())) {
            if (repo.existsByEmail(request.getEmail())) {
                throw new IllegalArgumentException("Email '" + request.getEmail() + "' is already assigned to another student");
            }
            existstudent.setEmail(request.getEmail());
        }

        if (request.getName() != null) existstudent.setName(request.getName());
        if (request.getAge() > 0) existstudent.setAge(request.getAge());
        if (request.getSubject() != null) existstudent.setSubject(request.getSubject());
        if (request.getCourse() != null) existstudent.setCourse(request.getCourse());
        if (request.getDepartment() != null) existstudent.setDepartment(request.getDepartment());
        if (request.getAcademicYear() != null) existstudent.setAcademicYear(request.getAcademicYear());
        if (request.getSemester() != null) existstudent.setSemester(request.getSemester());
        if (request.getPhone() != null) existstudent.setPhone(request.getPhone());
        if (request.getAddress() != null) existstudent.setAddress(request.getAddress());
        if (request.getGender() != null) existstudent.setGender(request.getGender());
        if (request.getStatus() != null) existstudent.setStatus(request.getStatus());

        existstudent.setJavaAttendance(request.getJavaAttendance());
        existstudent.setDbmsAttendance(request.getDbmsAttendance());
        existstudent.setDsaAttendance(request.getDsaAttendance());
        existstudent.setCnAttendance(request.getCnAttendance());
        existstudent.setAiAttendance(request.getAiAttendance());

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
    }
}