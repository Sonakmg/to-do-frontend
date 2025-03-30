import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import useTodos from '../hooks/useTodos';
import { FaTimes } from 'react-icons/fa';
import AnimeQuote from './AnimeQuote';

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  priority: Yup.string()
    .required('Priority is required'),
  dueDate: Yup.date()
    .required('Due date is required')
    .min(new Date(), 'Due date must be in the future'),
  status: Yup.string()
    .required('Status is required')
});

const TodoForm = ({ onSuccess, onCancel }) => {
  const { addTodo } = useTodos();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      priority: 'medium',
      dueDate: new Date(),
      status: 'pending'
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        await addTodo(values);
        formik.resetForm();
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onSuccess?.();
        }, 2000);
      } catch (error) {
        console.error('Error adding todo:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="todo-form-overlay">
      <div className={`todo-form-container ${showSuccess ? 'success' : ''}`}>
        {showSuccess ? (
          <div className="success-content">
            <AnimeQuote />
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowSuccess(false);
                onSuccess?.();
              }}
            >
              Continue
            </button>
          </div>
        ) : (
          <>
            <div className="todo-form-header">
              <h2>Create New Task</h2>
              <button 
                className="close-button"
                onClick={onCancel}
                aria-label="Close form"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={formik.handleSubmit} className="todo-form">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className={`form-input ${formik.touched.title && formik.errors.title ? 'error' : ''}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  placeholder="Enter task title"
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="error-message">{formik.errors.title}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  className={`form-input ${formik.touched.description && formik.errors.description ? 'error' : ''}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  placeholder="Enter task description"
                  rows="4"
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="error-message">{formik.errors.description}</div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    className={`form-input ${formik.touched.priority && formik.errors.priority ? 'error' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.priority}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                  {formik.touched.priority && formik.errors.priority && (
                    <div className="error-message">{formik.errors.priority}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="dueDate">Due Date</label>
                  <DatePicker
                    id="dueDate"
                    name="dueDate"
                    selected={formik.values.dueDate}
                    onChange={(date) => formik.setFieldValue('dueDate', date)}
                    onBlur={formik.handleBlur}
                    className={`form-input ${formik.touched.dueDate && formik.errors.dueDate ? 'error' : ''}`}
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select due date"
                  />
                  {formik.touched.dueDate && formik.errors.dueDate && (
                    <div className="error-message">{formik.errors.dueDate}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  className={`form-input ${formik.touched.status && formik.errors.status ? 'error' : ''}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.status}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                {formik.touched.status && formik.errors.status && (
                  <div className="error-message">{formik.errors.status}</div>
                )}
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting || !formik.isValid || !formik.dirty}
                >
                  {isSubmitting ? 'Creating...' : 'Create Task'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoForm;