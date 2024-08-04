import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { restartTimer } from '../features/timer/timerSlice';
import { getQuestions, newAnswer, loadState } from '../features/questions/questionsSlice';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { Progress } from '../components/Progress';
import { Next } from '../components/Next';
import { Timer } from '../components/Timer';
import ThemeToggleButton from '../components/ThemeToggleButton';

const Question = () => {
    const { difficulty } = useParams();
    const { gameMode } = useSelector(store => store.difficulty);
    const { status, index, currentQuestion, answer } = useSelector(store => store.questions);
    const dispatch = useDispatch();

    useEffect(() => {
        const savedState = localStorage.getItem('quizState');
        if (savedState) {
            dispatch(loadState(JSON.parse(savedState)));
        } else {
            dispatch(restartTimer());
            dispatch(getQuestions(gameMode));
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [index]);

    const statement = currentQuestion?.question;
    const options = currentQuestion?.options;
    const hasAnswered = answer !== null;
    const styleCat = {
        backgroundColor: difficulty === 'medium' ? '#e3ce0e' : '#fc2121'
    };

    return (
        <main className='main'>
            <ThemeToggleButton />
            {status === 'loading' && <Loader />}
            {status === 'error' && <ErrorMessage />}
            {status === 'ready' &&
                <>
                    <Progress />
                    <div className='question-cont'>
                        <div className='category' style={difficulty !== 'easy' ? styleCat : {}}>{difficulty} quiz</div>
                        <h4>{statement}</h4>
                        <div className="options">
                            {options?.map(option => {
                                return <button key={option} className={`btn btn-option ${answer === option ?
                                    "answer" : ""} 
                                ${hasAnswered ? currentQuestion.correctAnswer === option
                                        ? "correct" : "" : ""}`}
                                    disabled={hasAnswered}
                                    onClick={() => dispatch(newAnswer(option))}>{option}</button>
                            })}
                        </div>
                    </div>
                    <footer>
                        <Timer />
                        {answer && <Next />}
                    </footer>
                </>}
        </main>
    );
}

export default Question;
