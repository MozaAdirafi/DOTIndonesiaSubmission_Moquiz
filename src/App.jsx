import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Question from './pages/Question';
import FinishedScreen from './pages/FinishedScreen';
import LoginPage from './components/LoginPage';
import ResumeScreen from './components/ResumeScreen';
import ProtectedRoute from './ProtectedRoute';
import Layout from './Layout';
import { useDispatch } from 'react-redux';
import { loadState } from './features/questions/questionsSlice';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSavedState, setHasSavedState] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
    }

    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      setHasSavedState(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', true);
  };

  const handleReset = () => {
    localStorage.removeItem('quizState');
    setHasSavedState(false);
    dispatch(loadState({
      questionsRedux: [],
      status: 'ready',
      index: 0,
      currentQuestion: {},
      answer: null,
      points: 0,
      highscore: 0
    }));
  };

  const handleResume = () => {
    const savedState = JSON.parse(localStorage.getItem('quizState'));
    dispatch(loadState(savedState));
    setHasSavedState(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout>
                <Main />
                
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="quiz/:difficulty"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {hasSavedState ? (
                <ResumeScreen onReset={handleReset} onResume={handleResume} />
              ) : (
                <Layout>
                  <Question />
                  
                </Layout>
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="results"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout>
                <FinishedScreen />
                
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
