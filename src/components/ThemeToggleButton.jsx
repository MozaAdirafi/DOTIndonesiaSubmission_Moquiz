import { useState, useEffect } from 'react';

const ThemeToggleButton = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button className='theme-toggle-btn' onClick={toggleTheme}>
      {theme === 'light' ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
    </button>
  );
};

export default ThemeToggleButton;
