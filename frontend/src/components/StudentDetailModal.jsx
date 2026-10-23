import React from 'react';
import { Modal } from './Modal';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  AlertTriangle,
  CheckCircle,
  Edit,
  Trash2,
} from 'lucide-react';

export const StudentDetailModal = ({
  isOpen,
  onClose,
  student,
  onEdit,
  onDelete,
}) => {
  if (!student) return null;

  const subjects = [
    { name: 'Java Programming', key: 'javaAttendance', score: student.javaAttendance ?? 0 },
    { name: 'Database Systems (DBMS)', key: 'dbmsAttendance', score: student.dbmsAttendance ?? 0 },
    { name: 'Data Structures & Algo (DSA)', key: 'dsaAttendance', score: student.dsaAttendance ?? 0 },
    { name: 'Computer Networks (CN)', key: 'cnAttendance', score: student.cnAttendance ?? 0 },
    { name: 'Artificial Intelligence (AI)', key: 'aiAttendance', score: student.aiAttendance ?? 0 },
  ];

  const detainedSubjects = subjects.filter((s) => s.score < 75);
  const isDetained = detainedSubjects.length > 0 || student.status === 'DETAINED';

  const averageAttendance = (
    subjects.reduce((acc, curr) => acc + curr.score, 0) / subjects.length
  ).toFixed(1);

  const getScoreColor = (score) => {
    if (score < 75) return 'var(--danger)';
    if (score < 85) return 'var(--warning)';
    return 'var(--success)';
  };

  const getFillClass = (score) => {
    if (score < 75) return 'fill-danger';
    if (score < 85) return 'fill-warning';
    return 'fill-safe';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Student Profile & Attendance Record"
      maxWidth="680px"
    >
      <div className="modal-body">
        {/* Header Profile Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            background: 'var(--bg-input)',
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '20px',
          }}
        >
          <div
            className="avatar"
            style={{
              width: '64px',
              height: '64px',
              fontSize: '1.5rem',
            }}
          >
            {student.name ? student.name[0].toUpperCase() : 'S'}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{student.name}</h3>
              <span
                className={`badge ${
                  isDetained ? 'badge-detained' : 'badge-active'
                }`}
              >
                {isDetained ? 'DETENTION RISK' : 'IN GOOD STANDING'}
              </span>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
              Roll No: <strong style={{ color: '#93c5fd', fontFamily: 'var(--font-mono)' }}>{student.rollno}</strong>
              {' • '}
              {student.course || 'Unassigned Course'}
              {' • '}
              Sem {student.semester || 1}
            </div>
          </div>
        </div>

        {/* Detention Banner if applicable */}
        {isDetained && (
          <div
            style={{
              background: 'var(--danger-bg)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 18px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
            }}
          >
            <AlertTriangle size={20} color="var(--danger)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.85rem' }}>
              <div style={{ fontWeight: 700, color: '#fca5a5', marginBottom: '2px' }}>
                Detention Warning Triggered!
              </div>
              <div style={{ color: '#fecaca' }}>
                This student has fallen below the mandatory <strong>75% attendance threshold</strong> in{' '}
                {detainedSubjects.map((s) => `${s.name} (${s.score}%)`).join(', ')}.
              </div>
            </div>
          </div>
        )}

        {/* Contact & Academic Metadata */}
        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
          <div style={{ background: 'var(--bg-input)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Mail size={16} color="var(--text-muted)" />
            <div style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Email</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden' }}>{student.email}</div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-input)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Phone size={16} color="var(--text-muted)" />
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Phone</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{student.phone || 'N/A'}</div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-input)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookOpen size={16} color="var(--text-muted)" />
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Department</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{student.department || 'General'}</div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-input)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={16} color="var(--text-muted)" />
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Academic Term</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{student.academicYear || 'Current Year'}</div>
            </div>
          </div>
        </div>

        {/* Subject-Wise Attendance Breakdown */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>
              Subject-wise Attendance Breakdown
            </h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Overall Avg: <strong style={{ color: getScoreColor(averageAttendance) }}>{averageAttendance}%</strong>
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {subjects.map((sub) => (
              <div
                key={sub.key}
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {sub.name}
                  </span>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: getScoreColor(sub.score),
                    }}
                  >
                    {sub.score}% {sub.score < 75 && '⚠️ Deficit'}
                  </span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div
                    className={`attendance-bar-fill ${getFillClass(sub.score)}`}
                    style={{ width: `${Math.min(100, Math.max(0, sub.score))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            onClose();
            onDelete(student);
          }}
        >
          <Trash2 size={14} />
          <span>Delete Student</span>
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              onClose();
              onEdit(student);
            }}
          >
            <Edit size={14} />
            <span>Edit Information</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
