import React from 'react';
import { Building2, Plus, Edit2, Trash2, BookOpen } from 'lucide-react';

export const DepartmentsPage = ({
  departments = [],
  loading = false,
  onAddDepartment,
  onEditDepartment,
  onDeleteDepartment,
}) => {
  return (
    <div>
      <div className="toolbar">
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Academic Departments</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Configure and govern university departments and divisions
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={onAddDepartment}>
          <Plus size={16} />
          <span>New Department</span>
        </button>
      </div>

      <div className="card">
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading departments...
          </div>
        ) : departments.length === 0 ? (
          <div className="empty-state">
            <Building2 className="empty-icon" />
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
              No departments configured
            </h4>
            <p>Click "New Department" above to add your first academic division.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Department Name</th>
                  <th>Code</th>
                  <th>Description</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) => (
                  <tr key={dept.id || dept.code}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(59, 130, 246, 0.12)',
                            color: 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Building2 size={18} />
                        </div>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                          {dept.name}
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
                        {dept.code}
                      </span>
                    </td>

                    <td>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        {dept.description || 'No description provided'}
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          className="btn-icon"
                          onClick={() => onEditDepartment(dept)}
                          title="Edit Department"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          className="btn-icon"
                          onClick={() => onDeleteDepartment(dept)}
                          title="Delete Department"
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
