import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import ThemeToggle from './components/ThemeToggle';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { TodoProvider } from './contexts/TodoContext';

function App() {
  useEffect(() => {
    // Ensure the app has fully hydrated before showing content
    document.documentElement.dataset.hydrated = 'true';
  }, []);

  return (
    <DarkModeProvider>
      <TodoProvider>
        <div className="app">
          <header className="app-header">
            <h1>Productivity Pro</h1>
            <ThemeToggle />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/new" element={<TodoForm />} />
              <Route path="/edit/:id" element={<TodoForm />} />
            </Routes>
          </main>
        </div>
      </TodoProvider>
    </DarkModeProvider>
  );
}

export default App; 