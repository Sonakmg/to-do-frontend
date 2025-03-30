import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TodoProvider } from './contexts/TodoContext';
import { DarkModeProvider } from './contexts/DarkModeContext';
import TodoList from './components/TodoList';
import TodoDetails from './components/TodoDetails';
import ThemeToggle from './components/ThemeToggle';
import './styles/main.css';
import './styles/theme.css';

function App() {
  return (
    <DarkModeProvider>
      <TodoProvider>
        <Router>
          <div className="app-container">
            <header className="app-header">
              <div className="header-content">
                <h1>Productivity Pro</h1>
                <p>Your professional task management system</p>
              </div>
              <ThemeToggle />
            </header>
            <main className="app-content">
              <Routes>
                <Route path="/" element={<TodoList />} />
                <Route path="/todos/:id" element={<TodoDetails />} />
              </Routes>
            </main>
            <footer className="app-footer">
              <p>© {new Date().getFullYear()} Productivity Pro</p>
            </footer>
          </div>
        </Router>
      </TodoProvider>
    </DarkModeProvider>
  );
}

export default App;