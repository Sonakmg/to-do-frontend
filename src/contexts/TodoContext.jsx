import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

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

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.sort) params.append('sort', filters.sort);
      
      const response = await api.get(`/todos?${params.toString()}`);
      setTodos(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const addTodo = async (todoData) => {
    try {
      const response = await api.post('/todos', todoData);
      setTodos(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error('Error adding todo:', err);
      setError(err.response?.data?.error || err.message);
      throw err;
    }
  };

  const updateTodo = async (id, todoData) => {
    try {
      const response = await api.put(`/todos/${id}`, todoData);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? response.data : todo
      ));
      return response.data;
    } catch (err) {
      console.error('Error updating todo:', err);
      setError(err.response?.data?.error || err.message);
      throw err;
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError(err.response?.data?.error || err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [filters, fetchTodos]);

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