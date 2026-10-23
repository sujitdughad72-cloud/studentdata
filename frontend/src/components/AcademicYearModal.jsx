import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { useToast } from '../context/ToastContext';

export const AcademicYearModal = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    yearName: '',
    startDate: '',
    endDate: '',
    current: false,
  });

  useEffect(() => {
    if (isOpen) {
      const year = new Date().getFullYear();
      setFormData({
        yearName: `${year}-${year + 1}`,
        startDate: `${year}-08-01`,
        endDate: `${year + 1}-06-30`,
        current: false,
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.yearName.trim()) {
      addToast('Year Name is required (e.g. 2024-2025)', 'error');
      return;
    }
    onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Academic Session Year"
      maxWidth="500px"
    >
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">
              Academic Year Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="yearName"
              className="input"
              placeholder="e.g. 2025-2026"
              value={formData.yearName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="input"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">End Date</label>
              <input
                type="date"
                name="endDate"
                className="input"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ marginTop: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                name="current"
                checked={formData.current}
                onChange={handleChange}
              />
              <span>Set as active / current academic year immediately</span>
            </label>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Academic Year'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
