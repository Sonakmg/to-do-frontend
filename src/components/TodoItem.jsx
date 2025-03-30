import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import StatusBadge from './StatusBadge';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const TodoItem = ({ todo, onView }) => {
  const { updateTodo, deleteTodo } = useContext(TodoContext);

  const handleStatusChange = async (newStatus) => {
    try {
      await updateTodo(todo.id, { status: newStatus });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className={`todo-item ${todo.status}`}>
      <div className="todo-content">
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
        <div className="todo-meta">
          <StatusBadge status={todo.status} />
          <span>Priority: {todo.priority}</span>
          {todo.dueDate && <span>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>}
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={() => handleStatusChange('completed')}>
          Complete
        </button>
        <button onClick={onView}><FaEye /></button>
        <button onClick={() => deleteTodo(todo.id)}><FaTrash /></button>
      </div>
    </div>
  );
};

export default TodoItem;