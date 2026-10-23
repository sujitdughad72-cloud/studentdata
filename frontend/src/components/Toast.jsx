import React from 'react';
import { useToast } from '../context/ToastContext';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { extractErrorMessage } from '../utils/errorHandler';

export const Toast = () => {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} color="#10b981" />;
      case 'warning':
        return <AlertTriangle size={18} color="#f59e0b" />;
      case 'error':
        return <XCircle size={18} color="#ef4444" />;
      default:
        return <Info size={18} color="#0ea5e9" />;
    }
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        const displayText = extractErrorMessage(toast.message, 'Notification');
        return (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {getIcon(toast.type)}
            <span style={{ flex: 1 }}>{displayText}</span>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
              }}
              aria-label="Dismiss alert"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
