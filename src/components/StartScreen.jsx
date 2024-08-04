import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectGameMode } from '../features/difficulty/difficultySlice';
import { useDispatch } from 'react-redux';

export const StartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [theme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleClick = (e) => {
    dispatch(selectGameMode(e.target.value));
    navigate(`/quiz/${e.target.value}`);
  };


  return (
    <div className='start-screen'>
      <h2>Welcome to The General Question Quiz!</h2>
      <h3>15 questions to test your general knowledge</h3>
      <h4 style={{ marginTop: "20px" }}>First, choose the category:</h4>
      <div className="game-mode">
        <button className='btn2' value='music' onClick={(e) => handleClick(e)}>Music</button>
        <button className='btn2' value='geography' onClick={(e) => handleClick(e)}>Geography</button>
        <button className='btn2' value='sport' onClick={(e) => handleClick(e)}>Sport</button>
      </div>
    </div>
  );
};
