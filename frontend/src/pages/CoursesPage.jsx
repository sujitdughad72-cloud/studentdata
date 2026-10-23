import React, { useState } from 'react';
import { GraduationCap, Plus, Edit2, Trash2, Filter } from 'lucide-react';

export const CoursesPage = ({
  courses = [],
  departments = [],
  loading = false,
  onAddCourse,
  onEditCourse,
  onDeleteCourse,
}) => {
  const [filterDept, setFilterDept] = useState('');

  const filteredCourses = filterDept
    ? courses.filter((c) => c.department === filterDept)
    : courses;

  return (
    <div>
      <div className="toolbar">
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Degree Programs & Courses</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Curriculum pathways, program durations, and semester structures
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select
            className="select"
            style={{ width: 'auto', padding: '6px 12px', fontSize: '0.825rem' }}
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            <option value="">Filter by Department (All)</option>
            {departments.map((d) => (
              <option key={d.id || d.code} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>

          <button className="btn btn-primary btn-sm" onClick={onAddCourse}>
            <Plus size={16} />
            <span>New Course</span>
          </button>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading course catalog...
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="empty-state">
            <GraduationCap className="empty-icon" />
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
              No courses found
            </h4>
            <p>Add a new degree program using the button above.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Code</th>
                  <th>Department</th>
                  <th>Duration</th>
                  <th>Semesters</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((c) => (
                  <tr key={c.id || c.code}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(99, 102, 241, 0.12)',
                            color: '#818cf8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <GraduationCap size={18} />
                        </div>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                          {c.name}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          background: 'var(--bg-input)',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        {c.code}
                      </span>
                    </td>

                    <td>
                      <span className="badge badge-active" style={{ fontSize: '0.75rem' }}>
                        {c.department || 'General'}
                      </span>
                    </td>

                    <td>{c.durationYears || 4} Years</td>

                    <td>{c.totalSemesters || 8} Semesters</td>

                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          className="btn-icon"
                          onClick={() => onEditCourse(c)}
                          title="Edit Course"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          className="btn-icon"
                          onClick={() => onDeleteCourse(c)}
                          title="Delete Course"
                          style={{ color: '#f87171' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
