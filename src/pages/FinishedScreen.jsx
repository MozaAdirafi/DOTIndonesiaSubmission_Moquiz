import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadState, getQuestions } from '../features/questions/questionsSlice';
import ThemeToggleButton from '../components/ThemeToggleButton';

const FinishedScreen = () => {
    const { points, highscore } = useSelector(store => store.questions);
    const { gameMode } = useSelector(store => store.difficulty);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Each correct answer is worth 20 points
    const correctAnswers = Math.floor(points / 20);
    const totalQuestions = 15;
    const wrongAnswers = totalQuestions - correctAnswers;

    // Calculate the percentage
    const percentage = Math.ceil((points / (totalQuestions * 20)) * 100);

    let congrats;
    if (percentage === 100) congrats = "Perfect!";
    if (percentage >= 80 && percentage < 100) congrats = "Excellent!";
    if (percentage >= 50 && percentage < 80) congrats = "Good!";
    if (percentage > 0 && percentage < 50) congrats = "Bad luck!";
    if (percentage === 0) congrats = "Oh no!";

    const handleReset = () => {
        localStorage.removeItem('quizState');
        dispatch(loadState({
            questionsRedux: [],
            status: 'ready',
            index: 0,
            currentQuestion: {},
            answer: null,
            points: 0,
            highscore: 0
        }));
        dispatch(getQuestions(gameMode)); 
        navigate(`/quiz/${gameMode}`);
    };

    return (
        <>
            <ThemeToggleButton />
            <p className='result'>
                {congrats} You scored <strong>{points}</strong> out of 300 ({percentage}%)
            </p>
            <p className='highscore'>(Highscore: {highscore} points)</p>
            <div className='stats'>
                <p><strong>Correct Answers:</strong> {correctAnswers}</p>
                <p><strong>Wrong Answers:</strong> {wrongAnswers}</p>
                <p><strong>Questions Answered:</strong> {totalQuestions}</p>
            </div>
            <div className='reset-btns'>
                <button className='btn' onClick={() => navigate(`/home`)}>Main Menu</button>
                <button className='btn' onClick={handleReset}>Reset</button>
            </div>
        </>
    );
};

export default FinishedScreen;
