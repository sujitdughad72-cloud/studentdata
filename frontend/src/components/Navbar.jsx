import React from 'react';
import { RefreshCw, Calendar, ShieldCheck } from 'lucide-react';

export const Navbar = ({ pageTitle, currentAcademicYear, onRefresh, refreshing, isDemo }) => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1 className="page-title">{pageTitle}</h1>
      </div>

      <div className="navbar-right">
        {isDemo && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: 'rgba(234, 179, 8, 0.12)',
              color: '#eab308',
              border: '1px solid rgba(234, 179, 8, 0.3)',
            }}
            title="Running in Demo Mode. Open http://localhost:3000 on your machine to connect to your local MySQL database."
          >
            <span>⚡ Demo Mode</span>
          </div>
        )}

        {currentAcademicYear && (
          <div className="active-term-chip" title="Current Academic Term">
            <span className="active-pulse-dot" />
            <Calendar size={14} />
            <span>Active Term: <strong>{currentAcademicYear.yearName}</strong></span>
          </div>
        )}

        <button
          className="btn btn-secondary btn-sm"
          onClick={onRefresh}
          disabled={refreshing}
          title="Refresh Data"
        >
          <RefreshCw size={14} className={refreshing ? 'spin-animation' : ''} />
          <span>Sync</span>
        </button>
      </div>
    </header>
  );
};
