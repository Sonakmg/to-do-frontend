import React, { useState, useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TodoForm = ({ onSuccess }) => {
  const { addTodo } = useContext(TodoContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: null
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      setErrors({ ...errors, title: 'Title is required' });
      return;
    }

    try {
      await addTodo({
        ...formData,
        dueDate: formData.dueDate ? formData.dueDate.toISOString().split('T')[0] : null
      });
      onSuccess();
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title*</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>
      
      {/* Other form fields */}
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TodoForm;