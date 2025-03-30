import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

const ExampleComponent = () => {
  const { darkMode } = useDarkMode();
  
  return (
    <div className={`example-component ${darkMode ? 'dark' : 'light'}`}>
      <h3>Current Mode: {darkMode ? 'Dark' : 'Light'}</h3>
      <p>This component adapts to the current theme.</p>
    </div>
  );
};

export default ExampleComponent;