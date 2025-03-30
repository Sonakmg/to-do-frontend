import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { TodoProvider } from './contexts/TodoContext';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Logo from './components/Logo';
import ThemeToggle from './components/ThemeToggle';
import './styles/main.css';

function App() {
  useEffect(() => {
    document.documentElement.dataset.hydrated = 'true';
  }, []);

  return (
    <DarkModeProvider>
      <TodoProvider>
        <div className="app">
          <header className="header">
            <div className="header-content">
              <Logo />
              <ThemeToggle />
            </div>
          </header>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/new" element={<TodoForm />} />
            </Routes>
          </main>
        </div>
      </TodoProvider>
    </DarkModeProvider>
  );
}

export default App;