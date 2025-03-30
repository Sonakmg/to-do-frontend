import React, { createContext, useState, useEffect, useCallback } from 'react';
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

  const fetchTodos = useCallback(async () => {
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
  }, [filters]);

  const addTodo = async (todoData) => {
    try {
      const response = await axios.post(`${API_URL}/todos`, todoData);
      setTodos(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      throw err;
    }
  };

  const updateTodo = async (id, todoData) => {
    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, todoData);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? response.data : todo
      ));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      throw err;
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
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