import React from 'react';
import {
  Users,
  AlertTriangle,
  GraduationCap,
  Building2,
  CheckCircle,
  TrendingUp,
  UserPlus,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export const Dashboard = ({
  students = [],
  detainedStudents = [],
  departments = [],
  courses = [],
  setActiveTab,
  onOpenAddStudent,
}) => {
  const totalStudents = students.length;
  const detainedCount = detainedStudents.length;
  const activeStudents = students.filter((s) => s.status === 'ACTIVE').length;

  // Calculate subject averages
  const getSubjectAvg = (field) => {
    if (!students.length) return 0;
    const sum = students.reduce((acc, s) => acc + (s[field] ?? 0), 0);
    return (sum / students.length).toFixed(1);
  };

  const javaAvg = getSubjectAvg('javaAttendance');
  const dbmsAvg = getSubjectAvg('dbmsAttendance');
  const dsaAvg = getSubjectAvg('dsaAttendance');
  const cnAvg = getSubjectAvg('cnAttendance');
  const aiAvg = getSubjectAvg('aiAttendance');

  const overallAvg = students.length
    ? (
        (parseFloat(javaAvg) +
          parseFloat(dbmsAvg) +
          parseFloat(dsaAvg) +
          parseFloat(cnAvg) +
          parseFloat(aiAvg)) /
        5
      ).toFixed(1)
    : '0';

  const subjects = [
    { name: 'Java Programming', code: 'JAVA', avg: javaAvg },
    { name: 'Database Management Systems', code: 'DBMS', avg: dbmsAvg },
    { name: 'Data Structures & Algorithms', code: 'DSA', avg: dsaAvg },
    { name: 'Computer Networks', code: 'CN', avg: cnAvg },
    { name: 'Artificial Intelligence', code: 'AI', avg: aiAvg },
  ];

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

  return (
    <div>
      {/* KPI Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <div>
            <div className="stat-label">Total Students</div>
            <div className="stat-value">{totalStudents}</div>
            <div className="stat-desc">{activeStudents} active enrollments</div>
          </div>
          <div className="stat-icon blue">
            <Users size={22} />
          </div>
        </div>

        <div className="stat-card rose" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('detention')}>
          <div>
            <div className="stat-label">Detention Watchlist</div>
            <div className="stat-value" style={{ color: detainedCount > 0 ? 'var(--danger)' : 'inherit' }}>
              {detainedCount}
            </div>
            <div className="stat-desc">Students with &lt; 75% attendance</div>
          </div>
          <div className="stat-icon rose">
            <AlertTriangle size={22} />
          </div>
        </div>

        <div className="stat-card emerald">
          <div>
            <div className="stat-label">Avg Attendance</div>
            <div className="stat-value">{overallAvg}%</div>
            <div className="stat-desc">Across all 5 core subjects</div>
          </div>
          <div className="stat-icon emerald">
            <TrendingUp size={22} />
          </div>
        </div>

        <div className="stat-card purple">
          <div>
            <div className="stat-label">Departments</div>
            <div className="stat-value">{departments.length}</div>
            <div className="stat-desc">{courses.length} active courses</div>
          </div>
          <div className="stat-icon purple">
            <Building2 size={22} />
          </div>
        </div>
      </div>

      {/* Main Row: Attendance Matrix + Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '28px' }}>
        {/* Subject-Wise Attendance Card */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Curriculum Attendance Health</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Aggregated student attendance across core degree modules
              </p>
            </div>
            <span className="badge badge-active">Active Semester</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {subjects.map((sub) => (
              <div key={sub.code}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        background: 'rgba(59, 130, 246, 0.1)',
                        color: '#60a5fa',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      {sub.code}
                    </span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{sub.name}</span>
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: getScoreColor(sub.avg) }}>
                    {sub.avg}%
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    borderRadius: '999px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    className={`attendance-bar-fill ${getFillClass(sub.avg)}`}
                    style={{ width: `${Math.min(100, Math.max(0, sub.avg))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Operations Panel */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>
              Quick Actions
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Frequently used administrative tasks
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                className="btn btn-primary"
                onClick={onOpenAddStudent}
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                <UserPlus size={16} />
                <span>Register New Student</span>
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setActiveTab('detention')}
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={16} color="var(--danger)" />
                  <span>Inspect Detention List</span>
                </div>
                {detainedCount > 0 && (
                  <span className="badge badge-detained">{detainedCount}</span>
                )}
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setActiveTab('courses')}
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                <GraduationCap size={16} />
                <span>Manage Course Catalogs</span>
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setActiveTab('departments')}
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                <Building2 size={16} />
                <span>Manage Departments</span>
              </button>
            </div>
          </div>

          <div
            style={{
              marginTop: '20px',
              padding: '14px',
              background: 'var(--bg-input)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
              ACADEMIC MANDATE
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              A student must maintain at least <strong>75% attendance</strong> in all enrolled subjects to be eligible for semester end exams.
            </div>
          </div>
        </div>
      </div>

      {/* Recent Students Preview */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recent Student Enrollments</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Showing the latest enrolled students
            </p>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setActiveTab('students')}
          >
            <span>View All Students</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {students.length === 0 ? (
          <div className="empty-state">
            <Users className="empty-icon" />
            <p>No students enrolled yet. Register your first student to get started!</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Roll No</th>
                  <th>Department & Course</th>
                  <th>Semester</th>
                  <th>Status</th>
                  <th>Avg Attendance</th>
                </tr>
              </thead>
              <tbody>
                {students.slice(0, 5).map((st) => {
                  const avg = (
                    ((st.javaAttendance ?? 0) +
                      (st.dbmsAttendance ?? 0) +
                      (st.dsaAttendance ?? 0) +
                      (st.cnAttendance ?? 0) +
                      (st.aiAttendance ?? 0)) /
                    5
                  ).toFixed(1);

                  const isDetained =
                    st.status === 'DETAINED' ||
                    (st.javaAttendance ?? 100) < 75 ||
                    (st.dbmsAttendance ?? 100) < 75 ||
                    (st.dsaAttendance ?? 100) < 75 ||
                    (st.cnAttendance ?? 100) < 75 ||
                    (st.aiAttendance ?? 100) < 75;

                  return (
                    <tr key={st.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div className="avatar" style={{ width: '30px', height: '30px', fontSize: '0.75rem' }}>
                            {st.name ? st.name[0].toUpperCase() : 'S'}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{st.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{st.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{st.rollno}</span>
                      </td>
                      <td>
                        <div>{st.course || '—'}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{st.department || '—'}</div>
                      </td>
                      <td>Sem {st.semester || 1}</td>
                      <td>
                        <span className={`badge ${isDetained ? 'badge-detained' : 'badge-active'}`}>
                          {isDetained ? 'DETAINED' : st.status || 'ACTIVE'}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 700, color: getScoreColor(avg) }}>
                          {avg}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
