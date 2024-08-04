import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

function shuffleArray(array) {
    const newArray = [...array]; 
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

const initialState = {
    questionsRedux: [],
    status: 'ready',
    index: 0, 
    currentQuestion: {},
    answer: null,
    points: 0,
    highscore: 0
}

export const getQuestions = createAsyncThunk('questions/getQuestions', async (category) => {
    let url;
    switch (category) {
        case 'music':
            url = 'https://opentdb.com/api.php?amount=15&category=12&difficulty=easy&type=multiple';
            break;
        case 'geography':
            url = 'https://opentdb.com/api.php?amount=15&category=22&difficulty=easy&type=multiple';
            break;
        case 'sport':
            url = 'https://opentdb.com/api.php?amount=15&category=21&difficulty=easy&type=multiple';
            break;
        default:
            throw new Error('Unknown category');
    }
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        return data.results;
    } catch (err) {
        console.log(err);
    }
});

const saveStateToLocalStorage = (state) => {
    localStorage.setItem('quizState', JSON.stringify(state));
};

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        newAnswer: (state, { payload }) => {
            state.answer = payload;
            state.points = payload === state.currentQuestion.correctAnswer ? state.points + 20 : state.points;
            saveStateToLocalStorage(state);
        },
        nextQuestion: (state) => {
            let temp = state.questionsRedux[state.index + 1];
            let newArray = {
                id: state.index + 1,
                correctAnswer: temp.correct_answer,
                question: temp.question,
                options: shuffleArray([...temp.incorrect_answers, temp.correct_answer])
            };
            state.index += 1;
            state.currentQuestion = newArray;
            state.answer = null;
            saveStateToLocalStorage(state);
        },
        gameEnded: (state) => {
            state.highscore = state.points > state.highscore ? state.points : state.highscore;
            saveStateToLocalStorage(state);
        },
        loadState: (state, { payload }) => {
            return payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getQuestions.pending, (state) => {
            state.status = 'loading';
        }).addCase(getQuestions.fulfilled, (state, { payload }) => {
            console.log(payload);
            let temp = payload[0];
            let newArray = {
                id: 0,
                correctAnswer: temp.correct_answer,
                question: temp.question,
                options: shuffleArray([...temp.incorrect_answers, temp.correct_answer])
            };
            state.status = 'ready';
            state.questionsRedux = payload;
            state.currentQuestion = newArray;
            state.index = 0;
            state.points = 0;
            state.answer = null;
            saveStateToLocalStorage(state);
        }).addCase(getQuestions.rejected, (state) => {
            state.status = 'error';
        });
    }
});

export const { newAnswer, nextQuestion, gameEnded, loadState } = questionsSlice.actions;
export default questionsSlice.reducer;
