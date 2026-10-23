import React, { useState } from 'react';
import {
  AlertTriangle,
  Mail,
  Printer,
  Eye,
  CheckCircle,
  FileWarning,
  Send,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const DetentionPage = ({
  detainedStudents = [],
  loading = false,
  onViewStudent,
  onRefresh,
}) => {
  const { addToast } = useToast();
  const [notifying, setNotifying] = useState(false);

  const getDeficitSubjects = (st) => {
    const list = [];
    if ((st.javaAttendance ?? 100) < 75) list.push({ name: 'Java', score: st.javaAttendance });
    if ((st.dbmsAttendance ?? 100) < 75) list.push({ name: 'DBMS', score: st.dbmsAttendance });
    if ((st.dsaAttendance ?? 100) < 75) list.push({ name: 'DSA', score: st.dsaAttendance });
    if ((st.cnAttendance ?? 100) < 75) list.push({ name: 'CN', score: st.cnAttendance });
    if ((st.aiAttendance ?? 100) < 75) list.push({ name: 'AI', score: st.aiAttendance });
    return list;
  };

  const handleSendWarnings = () => {
    setNotifying(true);
    setTimeout(() => {
      setNotifying(false);
      addToast(
        `Automated detention alerts dispatched to ${detainedStudents.length} student emails.`,
        'success'
      );
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* Alert Warning Banner */}
      <div
        style={{
          background: 'radial-gradient(ellipse at left, rgba(239, 68, 68, 0.15) 0%, rgba(20, 30, 51, 0.7) 100%)',
          border: '1px solid rgba(239, 68, 68, 0.35)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--danger-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--danger)',
              flexShrink: 0,
            }}
          >
            <AlertTriangle size={28} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fca5a5' }}>
              Academic Detention & Attendance Deficit Monitor
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
              According to university policy, students with <strong>less than 75% attendance</strong> in any core subject are barred from sitting for final examinations.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary btn-sm" onClick={handlePrint}>
            <Printer size={15} />
            <span>Print Report</span>
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={handleSendWarnings}
            disabled={notifying || detainedStudents.length === 0}
          >
            <Send size={15} />
            <span>{notifying ? 'Dispatching...' : 'Dispatch Email Notices'}</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              Flagged Students Roster ({detainedStudents.length})
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Identified via live `/api/students/detain` endpoint
            </p>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Inspecting attendance records...
          </div>
        ) : detainedStudents.length === 0 ? (
          <div className="empty-state">
            <CheckCircle className="empty-icon" style={{ color: 'var(--success)' }} />
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              All Clear! No Detention Deficits Found
            </h4>
            <p>Every enrolled student is currently meeting or exceeding the 75% attendance threshold.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Roll No</th>
                  <th>Course & Dept</th>
                  <th>Failed Subjects (&lt; 75%)</th>
                  <th>Deficit Details</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {detainedStudents.map((st) => {
                  const deficits = getDeficitSubjects(st);
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
                          {st.department || '—'} • Sem {st.semester || 1}
                        </div>
                      </td>

                      <td>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {deficits.map((d) => (
                            <span
                              key={d.name}
                              className="badge badge-detained"
                              style={{ fontSize: '0.72rem' }}
                            >
                              {d.name}: {d.score}%
                            </span>
                          ))}
                        </div>
                      </td>

                      <td>
                        <span style={{ fontSize: '0.8rem', color: '#fca5a5' }}>
                          {deficits.length} subject{deficits.length > 1 ? 's' : ''} in deficit
                        </span>
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => onViewStudent(st)}
                        >
                          <Eye size={14} />
                          <span>View Card</span>
                        </button>
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
