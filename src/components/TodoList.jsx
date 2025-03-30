import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../contexts/TodoContext';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import FilterBar from './FilterBar';
import LoadingSpinner from './LoadingSpinner';

const TodoList = () => {
  const { todos, loading, error } = useContext(TodoContext);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="todo-list-container">
      <div className="list-header">
        <h2>My Tasks</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Task'}
        </button>
      </div>

      <FilterBar />

      {showForm && <TodoForm onSuccess={() => setShowForm(false)} />}

      <div className="todo-items">
        {todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onView={() => navigate(`/todos/${todo.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;