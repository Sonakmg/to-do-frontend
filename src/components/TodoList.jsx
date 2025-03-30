import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../contexts/TodoContext';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import FilterBar from './FilterBar';
import LoadingSpinner from './LoadingSpinner';

const TodoList = () => {
    const { todos, loading, error, updateTodo, deleteTodo } = useTodos();
  
    return (
      <div className="todo-list-container">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onComplete={(id) => updateTodo(id, { status: 'completed' })}
            onEdit={(todo) => {/* Open edit modal */}}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    );
  };

export default TodoList;