import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Eye,
  Edit2,
  Trash2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Download,
} from 'lucide-react';

export const StudentsPage = ({
  students = [],
  departments = [],
  courses = [],
  academicYears = [],
  loading = false,
  onAddStudent,
  onEditStudent,
  onViewStudent,
  onDeleteStudent,
  // Filter/Search states passed from App or handled here
  searchQuery,
  setSearchQuery,
  selectedDept,
  setSelectedDept,
  selectedCourse,
  setSelectedCourse,
  selectedAcademicYear,
  setSelectedAcademicYear,
  selectedSemester,
  setSelectedSemester,
  sortBy,
  setSortBy,
  sortDir,
  setSortDir,
  page,
  setPage,
  pageSize,
  setPageSize,
  totalElements,
  totalPages,
}) => {
  const getScoreColor = (score) => {
    const s = parseFloat(score);
    if (s < 75) return 'var(--danger)';
    if (s < 85) return 'var(--warning)';
    return 'var(--success)';
  };

  const getFillClass = (score) => {
    const s = parseFloat(score);
    if (s < 75) return 'fill-danger';
    if (s < 85) return 'fill-warning';
    return 'fill-safe';
  };

  const checkIsDetained = (st) => {
    return (
      st.status === 'DETAINED' ||
      (st.javaAttendance ?? 100) < 75 ||
      (st.dbmsAttendance ?? 100) < 75 ||
      (st.dsaAttendance ?? 100) < 75 ||
      (st.cnAttendance ?? 100) < 75 ||
      (st.aiAttendance ?? 100) < 75
    );
  };

  const exportCSV = () => {
    if (!students.length) return;
    const headers = [
      'ID',
      'Name',
      'RollNo',
      'Email',
      'Phone',
      'Course',
      'Department',
      'AcademicYear',
      'Semester',
      'Status',
      'Java(%)',
      'DBMS(%)',
      'DSA(%)',
      'CN(%)',
      'AI(%)',
    ];
    const rows = students.map((s) => [
      s.id,
      `"${s.name || ''}"`,
      s.rollno || '',
      s.email || '',
      s.phone || '',
      `"${s.course || ''}"`,
      `"${s.department || ''}"`,
      s.academicYear || '',
      s.semester || 1,
      s.status || 'ACTIVE',
      s.javaAttendance ?? 0,
      s.dbmsAttendance ?? 0,
      s.dsaAttendance ?? 0,
      s.cnAttendance ?? 0,
      s.aiAttendance ?? 0,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `students_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* Top Action & Search Bar */}
      <div className="toolbar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="input"
            placeholder="Search by name, roll no, or email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(0);
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button className="btn btn-secondary btn-sm" onClick={exportCSV} title="Export current list to CSV">
            <Download size={15} />
            <span>Export CSV</span>
          </button>
          <button className="btn btn-primary btn-sm" onClick={onAddStudent}>
            <Plus size={16} />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '20px',
          padding: '14px 18px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <Filter size={15} />
          <span>Filters:</span>
        </div>

        {/* Department Filter */}
        <select
          className="select"
          style={{ width: 'auto', padding: '6px 12px', fontSize: '0.825rem' }}
          value={selectedDept}
          onChange={(e) => {
            setSelectedDept(e.target.value);
            setPage(0);
          }}
        >
          <option value="">All Departments</option>
          {departments.map((d) => (
            <option key={d.id || d.code} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Course Filter */}
        <select
          className="select"
          style={{ width: 'auto', padding: '6px 12px', fontSize: '0.825rem' }}
          value={selectedCourse}
          onChange={(e) => {
            setSelectedCourse(e.target.value);
            setPage(0);
          }}
        >
          <option value="">All Courses</option>
          {courses.map((c) => (
            <option key={c.id || c.code} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Academic Year Filter */}
        <select
          className="select"
          style={{ width: 'auto', padding: '6px 12px', fontSize: '0.825rem' }}
          value={selectedAcademicYear}
          onChange={(e) => {
            setSelectedAcademicYear(e.target.value);
            setPage(0);
          }}
        >
          <option value="">All Academic Years</option>
          {academicYears.map((ay) => (
            <option key={ay.id || ay.yearName} value={ay.yearName}>
              {ay.yearName}
            </option>
          ))}
        </select>

        {/* Semester Filter */}
        <select
          className="select"
          style={{ width: 'auto', padding: '6px 12px', fontSize: '0.825rem' }}
          value={selectedSemester}
          onChange={(e) => {
            setSelectedSemester(e.target.value);
            setPage(0);
          }}
        >
          <option value="">All Semesters</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
            <option key={s} value={s}>
              Semester {s}
            </option>
          ))}
        </select>

        {/* Sort Controls */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sort:</span>
          <select
            className="select"
            style={{ width: 'auto', padding: '6px 10px', fontSize: '0.825rem' }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="id">Default (ID)</option>
            <option value="name">Name</option>
            <option value="rollno">Roll No</option>
            <option value="email">Email</option>
          </select>
          <button
            className="btn btn-secondary btn-icon"
            onClick={() => setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
            title={`Direction: ${sortDir.toUpperCase()}`}
          >
            <ArrowUpDown size={14} />
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="table-container">
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading students directory...
          </div>
        ) : students.length === 0 ? (
          <div className="empty-state">
            <Search className="empty-icon" />
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
              No students found
            </h4>
            <p>Try adjusting your search query or filter parameters.</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll Number</th>
                <th>Course & Dept</th>
                <th>Academic Year</th>
                <th>Avg Attendance</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((st) => {
                const avg = (
                  ((st.javaAttendance ?? 0) +
                    (st.dbmsAttendance ?? 0) +
                    (st.dsaAttendance ?? 0) +
                    (st.cnAttendance ?? 0) +
                    (st.aiAttendance ?? 0)) /
                  5
                ).toFixed(1);

                const isDetained = checkIsDetained(st);

                return (
                  <tr key={st.id}>
                    <td>
                      <div
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                        onClick={() => onViewStudent(st)}
                      >
                        <div className="avatar" style={{ width: '34px', height: '34px', fontSize: '0.85rem' }}>
                          {st.name ? st.name[0].toUpperCase() : 'S'}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                            {st.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {st.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.825rem',
                          background: 'var(--bg-input)',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        {st.rollno}
                      </span>
                    </td>

                    <td>
                      <div style={{ fontWeight: 500 }}>{st.course || '—'}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {st.department || '—'}
                      </div>
                    </td>

                    <td>
                      <div>{st.academicYear || '—'}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Sem {st.semester || 1}
                      </div>
                    </td>

                    <td>
                      <div className="attendance-pill" title={`Avg: ${avg}% across 5 subjects`}>
                        <div className="attendance-bar-bg">
                          <div
                            className={`attendance-bar-fill ${getFillClass(avg)}`}
                            style={{ width: `${Math.min(100, Math.max(0, avg))}%` }}
                          />
                        </div>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: getScoreColor(avg) }}>
                          {avg}%
                        </span>
                        {isDetained && (
                          <AlertTriangle size={14} color="var(--danger)" title="Detention Deficit" />
                        )}
                      </div>
                    </td>

                    <td>
                      <span className={`badge ${isDetained ? 'badge-detained' : 'badge-active'}`}>
                        {isDetained ? 'DETAINED' : st.status || 'ACTIVE'}
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          className="btn-icon"
                          onClick={() => onViewStudent(st)}
                          title="View Profile & Attendance"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          className="btn-icon"
                          onClick={() => onEditStudent(st)}
                          title="Edit Details"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          className="btn-icon"
                          onClick={() => onDeleteStudent(st)}
                          title="Delete Student"
                          style={{ color: '#f87171' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* Pagination Bar */}
        <div className="pagination">
          <div className="page-info">
            Showing <strong>{students.length}</strong> of <strong>{totalElements}</strong> students
          </div>

          <div className="pagination-controls">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginRight: '6px' }}>
              Rows per page:
            </span>
            <select
              className="select"
              style={{ width: 'auto', padding: '4px 8px', fontSize: '0.75rem', marginRight: '14px' }}
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(0);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>

            <button
              className="btn btn-secondary btn-icon"
              disabled={page <= 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              title="Previous Page"
            >
              <ChevronLeft size={16} />
            </button>

            <span style={{ fontSize: '0.8rem', padding: '0 8px', color: 'var(--text-secondary)' }}>
              Page {page + 1} of {Math.max(1, totalPages)}
            </span>

            <button
              className="btn btn-secondary btn-icon"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
              title="Next Page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
