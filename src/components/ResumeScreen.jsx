import PropTypes from 'prop-types';
import ThemeToggleButton from './ThemeToggleButton';

const ResumeScreen = ({ onReset, onResume }) => {
    return (
        <div className="resume-container">
            <ThemeToggleButton />
            <h2>Resume Quiz</h2>
            <p>Do you want to pick up where you left off?</p>
            <button className="btn" onClick={onResume}>Resume</button>
            <button className="btn" onClick={onReset}>Reset</button>
        </div>
    );
};

ResumeScreen.propTypes = {
    onReset: PropTypes.func.isRequired,
    onResume: PropTypes.func.isRequired,
};

export default ResumeScreen;