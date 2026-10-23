import React from 'react';
import { CalendarDays, Plus, Trash2, CheckCircle2, Star } from 'lucide-react';

export const AcademicYearsPage = ({
  academicYears = [],
  loading = false,
  onAddAcademicYear,
  onSetCurrentAcademicYear,
  onDeleteAcademicYear,
}) => {
  return (
    <div>
      <div className="toolbar">
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Academic Calendar Sessions</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Manage enrollment academic years and set active terms
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={onAddAcademicYear}>
          <Plus size={16} />
          <span>New Session</span>
        </button>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading academic calendar sessions...
          </div>
        ) : academicYears.length === 0 ? (
          <div className="empty-state">
            <CalendarDays className="empty-icon" />
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
              No academic sessions found
            </h4>
            <p>Add your first academic session using the button above.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Academic Session</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {academicYears.map((ay) => (
                  <tr key={ay.id || ay.yearName}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: 'var(--radius-md)',
                            background: ay.current
                              ? 'rgba(16, 185, 129, 0.15)'
                              : 'rgba(59, 130, 246, 0.1)',
                            color: ay.current ? 'var(--success)' : 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <CalendarDays size={18} />
                        </div>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                          {ay.yearName}
                        </span>
                      </div>
                    </td>

                    <td>
                      {ay.current ? (
                        <span className="badge badge-active" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <CheckCircle2 size={13} />
                          <span>CURRENT ACTIVE TERM</span>
                        </span>
                      ) : (
                        <span className="badge badge-inactive">Past / Upcoming</span>
                      )}
                    </td>

                    <td>{ay.startDate || '—'}</td>

                    <td>{ay.endDate || '—'}</td>

                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                        {!ay.current && (
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => onSetCurrentAcademicYear(ay.id)}
                            title="Set as Current Active Session"
                          >
                            <Star size={13} />
                            <span>Set as Current</span>
                          </button>
                        )}
                        <button
                          className="btn-icon"
                          onClick={() => onDeleteAcademicYear(ay)}
                          title="Delete Session"
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
