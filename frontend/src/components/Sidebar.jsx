import React from 'react';
import {
  LayoutDashboard,
  Users,
  AlertOctagon,
  GraduationCap,
  Building2,
  CalendarDays,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ activeTab, setActiveTab, detainedCount = 0 }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students Directory', icon: Users },
    {
      id: 'detention',
      label: 'Detention Watch',
      icon: AlertOctagon,
      badge: detainedCount > 0 ? detainedCount : null,
      badgeClass: 'nav-badge-detain',
    },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'academic-years', label: 'Academic Years', icon: CalendarDays },
  ];

  const getRoleClass = (role) => {
    if (!role) return 'role-student';
    if (role.includes('ADMIN')) return 'role-admin';
    if (role.includes('TEACHER')) return 'role-teacher';
    return 'role-student';
  };

  const formatRole = (role) => {
    if (!role) return 'Student';
    return role.replace('ROLE_', '');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="brand-icon">
          <Sparkles size={22} />
        </div>
        <div>
          <div className="brand-title">EduPulse</div>
          <div className="brand-subtitle">Student ERP Portal</div>
        </div>
      </div>

      <div className="sidebar-nav">
        <div className="nav-section-label">Main Menu</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={18} className="nav-icon" />
              <span>{item.label}</span>
              {item.badge !== null && item.badge !== undefined && (
                <span className={`nav-badge ${item.badgeClass || ''}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="sidebar-footer">
        <div className="user-pill">
          <div className="avatar">
            {(user?.fullName || user?.username || 'U')[0].toUpperCase()}
          </div>
          <div className="user-info">
            <div className="user-name" title={user?.fullName || user?.username}>
              {user?.fullName || user?.username}
            </div>
            <span className={`user-role-badge ${getRoleClass(user?.role)}`}>
              {formatRole(user?.role)}
            </span>
          </div>
          <button
            className="btn-icon"
            onClick={logout}
            title="Log out"
            style={{ border: 'none', background: 'transparent' }}
          >
            <LogOut size={16} color="var(--text-muted)" />
          </button>
        </div>
      </div>
    </aside>
  );
};
