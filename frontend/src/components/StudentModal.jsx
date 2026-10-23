import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { useToast } from '../context/ToastContext';

export const StudentModal = ({
  isOpen,
  onClose,
  onSubmit,
  student = null,
  departments = [],
  courses = [],
  academicYears = [],
  loading = false,
}) => {
  const { addToast } = useToast();

  const initialForm = {
    name: '',
    rollno: '',
    email: '',
    age: '',
    gender: 'Male',
    phone: '',
    address: '',
    department: '',
    course: '',
    academicYear: '',
    semester: 1,
    subject: '',
    status: 'ACTIVE',
    javaAttendance: 85,
    dbmsAttendance: 85,
    dsaAttendance: 85,
    cnAttendance: 85,
    aiAttendance: 85,
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        rollno: student.rollno || '',
        email: student.email || '',
        age: student.age || '',
        gender: student.gender || 'Male',
        phone: student.phone || '',
        address: student.address || '',
        department: student.department || '',
        course: student.course || '',
        academicYear: student.academicYear || '',
        semester: student.semester || 1,
        subject: student.subject || '',
        status: student.status || 'ACTIVE',
        javaAttendance: student.javaAttendance ?? 85,
        dbmsAttendance: student.dbmsAttendance ?? 85,
        dsaAttendance: student.dsaAttendance ?? 85,
        cnAttendance: student.cnAttendance ?? 85,
        aiAttendance: student.aiAttendance ?? 85,
      });
    } else {
      setFormData({
        ...initialForm,
        department: departments[0]?.name || '',
        course: courses[0]?.name || '',
        academicYear: academicYears.find((y) => y.current)?.yearName || academicYears[0]?.yearName || '',
      });
    }
  }, [student, isOpen, departments, courses, academicYears]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      addToast('Student Name is required', 'error');
      return;
    }
    if (!formData.rollno.trim()) {
      addToast('Roll Number is required', 'error');
      return;
    }
    if (!formData.email.trim()) {
      addToast('Email address is required', 'error');
      return;
    }

    const payload = {
      ...formData,
      age: formData.age ? parseInt(formData.age, 10) : 20,
      semester: parseInt(formData.semester, 10) || 1,
      javaAttendance: parseFloat(formData.javaAttendance) || 0,
      dbmsAttendance: parseFloat(formData.dbmsAttendance) || 0,
      dsaAttendance: parseFloat(formData.dsaAttendance) || 0,
      cnAttendance: parseFloat(formData.cnAttendance) || 0,
      aiAttendance: parseFloat(formData.aiAttendance) || 0,
    };

    onSubmit(payload);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={student ? 'Edit Student Details' : 'Register New Student'}
      maxWidth="750px"
    >
      <form onSubmit={handleSubmit}>
        <div className="modal-body" style={{ maxHeight: '70vh' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Personal Information
          </h4>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="e.g. Alex Johnson"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Roll Number <span className="required">*</span>
              </label>
              <input
                type="text"
                name="rollno"
                className="input"
                placeholder="e.g. CS202401"
                value={formData.rollno}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="alex.j@university.edu"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="input"
                placeholder="+1 555-0199"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Age</label>
              <input
                type="number"
                name="age"
                className="input"
                min="15"
                max="80"
                placeholder="20"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                name="gender"
                className="select"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                name="status"
                className="select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="DETAINED">DETAINED</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              className="input"
              placeholder="123 University Campus Way, City"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <h4 style={{ fontSize: '0.85rem', color: 'var(--primary)', margin: '20px 0 14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Academic Enrollment
          </h4>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Department</label>
              <select
                name="department"
                className="select"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id || dept.code} value={dept.name}>
                    {dept.name} ({dept.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Course</label>
              <select
                name="course"
                className="select"
                value={formData.course}
                onChange={handleChange}
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.id || course.code} value={course.name}>
                    {course.name} ({course.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Academic Year</label>
              <select
                name="academicYear"
                className="select"
                value={formData.academicYear}
                onChange={handleChange}
              >
                <option value="">Select Academic Year</option>
                {academicYears.map((ay) => (
                  <option key={ay.id || ay.yearName} value={ay.yearName}>
                    {ay.yearName} {ay.current ? '(Current)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Semester</label>
              <select
                name="semester"
                className="select"
                value={formData.semester}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Major/Subject</label>
              <input
                type="text"
                name="subject"
                className="input"
                placeholder="e.g. Computer Science"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
          </div>

          <h4 style={{ fontSize: '0.85rem', color: 'var(--primary)', margin: '20px 0 14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Subject Attendance Percentages (%)
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: '8px', textTransform: 'none' }}>
              (&lt; 75% triggers detention flag)
            </span>
          </h4>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Java Attendance (%)</label>
              <input
                type="number"
                name="javaAttendance"
                className="input"
                min="0"
                max="100"
                step="0.1"
                value={formData.javaAttendance}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">DBMS Attendance (%)</label>
              <input
                type="number"
                name="dbmsAttendance"
                className="input"
                min="0"
                max="100"
                step="0.1"
                value={formData.dbmsAttendance}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">DSA Attendance (%)</label>
              <input
                type="number"
                name="dsaAttendance"
                className="input"
                min="0"
                max="100"
                step="0.1"
                value={formData.dsaAttendance}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Computer Networks (%)</label>
              <input
                type="number"
                name="cnAttendance"
                className="input"
                min="0"
                max="100"
                step="0.1"
                value={formData.cnAttendance}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Artificial Intelligence (%)</label>
              <input
                type="number"
                name="aiAttendance"
                className="input"
                min="0"
                max="100"
                step="0.1"
                value={formData.aiAttendance}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : student ? 'Update Student' : 'Create Student'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
