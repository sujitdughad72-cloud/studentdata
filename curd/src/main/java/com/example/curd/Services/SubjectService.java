package com.example.curd.Services;

import com.example.curd.entity.Subject;
import com.example.curd.reposatory.SubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {

    private final SubjectRepository repo;

    public SubjectService(SubjectRepository repo) {
        this.repo = repo;
    }

    public List<Subject> getAllSubjects() {
        return repo.findAll();
    }

    public Subject getSubjectById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<Subject> getSubjectsByCourse(String course) {
        return repo.findByCourse(course);
    }

    public List<Subject> getSubjectsByCourseAndSemester(String course, int semester) {
        return repo.findByCourseAndSemester(course, semester);
    }

    public List<Subject> getSubjectsByTeacher(String teacher) {
        return repo.findByAssignedTeacher(teacher);
    }

    public Subject createSubject(Subject subject) {
        if (repo.existsByCode(subject.getCode())) {
            throw new IllegalArgumentException("Subject with code '" + subject.getCode() + "' already exists");
        }
        return repo.save(subject);
    }

    public Subject updateSubject(Long id, Subject updated) {
        Subject existing = repo.findById(id).orElse(null);
        if (existing == null) {
            throw new IllegalArgumentException("Subject not found with ID: " + id);
        }
        if (updated.getName() != null) existing.setName(updated.getName());
        if (updated.getCode() != null) existing.setCode(updated.getCode());
        if (updated.getCredits() > 0) existing.setCredits(updated.getCredits());
        if (updated.getCourse() != null) existing.setCourse(updated.getCourse());
        if (updated.getDepartment() != null) existing.setDepartment(updated.getDepartment());
        if (updated.getSemester() > 0) existing.setSemester(updated.getSemester());
        if (updated.getAssignedTeacher() != null) existing.setAssignedTeacher(updated.getAssignedTeacher());
        if (updated.getAssignedTeacherId() != null) existing.setAssignedTeacherId(updated.getAssignedTeacherId());
        return repo.save(existing);
    }

    public Subject assignTeacher(Long subjectId, Long teacherId, String teacherName) {
        Subject subject = repo.findById(subjectId).orElse(null);
        if (subject == null) {
            throw new IllegalArgumentException("Subject not found with ID: " + subjectId);
        }
        subject.setAssignedTeacherId(teacherId);
        subject.setAssignedTeacher(teacherName);
        return repo.save(subject);
    }

    public void deleteSubject(Long id) {
        if (!repo.existsById(id)) {
            throw new IllegalArgumentException("Subject not found with ID: " + id);
        }
        repo.deleteById(id);
    }
}
