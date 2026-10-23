import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { useToast } from '../context/ToastContext';

export const DepartmentModal = ({
  isOpen,
  onClose,
  onSubmit,
  department = null,
  loading = false,
}) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
  });

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name || '',
        code: department.code || '',
        description: department.description || '',
      });
    } else {
      setFormData({
        name: '',
        code: '',
        description: '',
      });
    }
  }, [department, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      addToast('Department name is required', 'error');
      return;
    }
    if (!formData.code.trim()) {
      addToast('Department code is required', 'error');
      return;
    }
    onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={department ? 'Edit Department' : 'Create New Department'}
      maxWidth="500px"
    >
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">
              Department Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="e.g. Computer Science & Engineering"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Department Code <span className="required">*</span>
            </label>
            <input
              type="text"
              name="code"
              className="input"
              placeholder="e.g. CSE"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="textarea"
              rows="3"
              placeholder="Department overview and faculty focus..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : department ? 'Update Department' : 'Save Department'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
