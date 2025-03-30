import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sort: 'dueDate'
  });

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.sort) params.append('sort', filters.sort);
      
      const response = await axios.get(`${API_URL}/todos?${params.toString()}`);
      setTodos(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ... (other CRUD operations from previous example)

  return (
    <TodoContext.Provider value={{
      todos,
      loading,
      error,
      filters,
      setFilters,
      addTodo,
      updateTodo,
      deleteTodo,
      fetchTodos
    }}>
      {children}
    </TodoContext.Provider>
  );
};