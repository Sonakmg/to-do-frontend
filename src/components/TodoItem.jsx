// TodoItem.jsx
import React, { useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';
import StatusBadge from './StatusBadge';
import PriorityTag from './PriorityTag';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';

const TodoItem = ({ todo, onComplete, onEdit, onDelete }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`todo-card ${darkMode ? 'dark' : 'light'}`}>
      <div className="todo-header">
        <h3 className="todo-title">{todo.title}</h3>
        <div className="todo-meta">
          <StatusBadge status={todo.status} />
          <PriorityTag priority={todo.priority} />
        </div>
      </div>
      
      <p className="todo-description">{todo.description}</p>
      
      <div className="todo-footer">
        <div className="todo-due-date">
          <span>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
        </div>
        <div className="todo-actions">
          <button 
            className="action-btn complete-btn"
            onClick={() => onComplete(todo.id)}
          >
            <FaCheck />
          </button>
          <button 
            className="action-btn edit-btn"
            onClick={() => onEdit(todo)}
          >
            <FaEdit />
          </button>
          <button 
            className="action-btn delete-btn"
            onClick={() => onDelete(todo.id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;