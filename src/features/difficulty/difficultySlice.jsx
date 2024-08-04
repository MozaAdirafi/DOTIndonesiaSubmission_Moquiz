import { createSlice } from "@reduxjs/toolkit";

const difficultySlice = createSlice({
    name: 'difficulty',
    initialState: {
        gameMode: null
    },
    reducers: {
        selectGameMode: (state, { payload }) => {
            state.gameMode = payload;
        }
    }
});

export const { selectGameMode } = difficultySlice.actions;
export default difficultySlice.reducer;
