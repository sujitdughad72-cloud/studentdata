import React from 'react';
import { RefreshCw, Calendar, ShieldCheck } from 'lucide-react';

export const Navbar = ({ pageTitle, currentAcademicYear, onRefresh, refreshing }) => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1 className="page-title">{pageTitle}</h1>
      </div>

      <div className="navbar-right">
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
