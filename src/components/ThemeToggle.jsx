import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button 
      className="theme-toggle"
      onClick={toggleDarkMode}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <>
          <FaSun className="theme-icon" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <FaMoon className="theme-icon" />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;