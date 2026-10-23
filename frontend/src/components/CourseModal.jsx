import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { useToast } from '../context/ToastContext';

export const CourseModal = ({
  isOpen,
  onClose,
  onSubmit,
  course = null,
  departments = [],
  loading = false,
}) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    department: '',
    durationYears: 4,
    totalSemesters: 8,
  });

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name || '',
        code: course.code || '',
        department: course.department || '',
        durationYears: course.durationYears || 4,
        totalSemesters: course.totalSemesters || 8,
      });
    } else {
      setFormData({
        name: '',
        code: '',
        department: departments[0]?.name || '',
        durationYears: 4,
        totalSemesters: 8,
      });
    }
  }, [course, isOpen, departments]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      addToast('Course name is required', 'error');
      return;
    }
    if (!formData.code.trim()) {
      addToast('Course code is required', 'error');
      return;
    }
    onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={course ? 'Edit Degree Course' : 'Create New Course'}
      maxWidth="540px"
    >
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">
              Course Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="e.g. B.Tech Computer Engineering"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Course Code <span className="required">*</span>
              </label>
              <input
                type="text"
                name="code"
                className="input"
                placeholder="e.g. BT-CSE"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Department</label>
              <select
                name="department"
                className="select"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                {departments.map((d) => (
                  <option key={d.id || d.code} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Duration (Years)</label>
              <input
                type="number"
                name="durationYears"
                className="input"
                min="1"
                max="8"
                value={formData.durationYears}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Total Semesters</label>
              <input
                type="number"
                name="totalSemesters"
                className="input"
                min="1"
                max="16"
                value={formData.totalSemesters}
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
            {loading ? 'Saving...' : course ? 'Update Course' : 'Create Course'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
