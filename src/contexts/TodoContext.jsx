import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

// Add retry interceptor
api.interceptors.response.use(
  response => response,
  async error => {
    const { config } = error;
    if (!config || !config.retry) {
      return Promise.reject(error);
    }
    config.retryCount = config.retryCount || 0;
    if (config.retryCount >= config.retry) {
      return Promise.reject(error);
    }
    config.retryCount += 1;
    const delayRetry = new Promise(resolve => {
      setTimeout(resolve, RETRY_DELAY);
    });
    await delayRetry;
    return api(config);
  }
);

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
      setError(null);
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.sort) params.append('sort', filters.sort);
      
      const response = await api.get(`/todos?${params.toString()}`, {
        retry: MAX_RETRIES
      });
      
      if (response.data) {
        setTodos(response.data);
      } else {
        setTodos([]);
      }
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError(err.response?.data?.error || 'Failed to fetch todos. Please try again later.');
      setTodos([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const addTodo = async (todoData) => {
    try {
      setError(null);
      const response = await api.post('/todos', todoData, {
        retry: MAX_RETRIES
      });
      
      if (response.data) {
        setTodos(prev => [...prev, response.data]);
        return response.data;
      }
      throw new Error('Invalid response from server');
    } catch (err) {
      console.error('Error adding todo:', err);
      setError(err.response?.data?.error || 'Failed to add todo. Please try again.');
      throw err;
    }
  };

  const updateTodo = async (id, todoData) => {
    try {
      setError(null);
      const response = await api.put(`/todos/${id}`, todoData, {
        retry: MAX_RETRIES
      });
      
      if (response.data) {
        setTodos(prev => prev.map(todo => 
          todo.id === id ? response.data : todo
        ));
        return response.data;
      }
      throw new Error('Invalid response from server');
    } catch (err) {
      console.error('Error updating todo:', err);
      setError(err.response?.data?.error || 'Failed to update todo. Please try again.');
      throw err;
    }
  };

  const deleteTodo = async (id) => {
    try {
      setError(null);
      await api.delete(`/todos/${id}`, {
        retry: MAX_RETRIES
      });
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError(err.response?.data?.error || 'Failed to delete todo. Please try again.');
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