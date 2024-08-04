import { createSlice } from "@reduxjs/toolkit";
const timerSlice = createSlice({
    name:  'timer',
    initialState:{
        secondsRemaining: 60
    },
    reducers:{
        lessSeconds: (state)=>{
            state.secondsRemaining -= 1
        },
        restartTimer: (state)=>{
            state.secondsRemaining = 60
        }
    }
})

export const {lessSeconds, restartTimer} = timerSlice.actions
export default timerSlice.reducer