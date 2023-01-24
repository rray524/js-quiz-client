import { createSlice } from "@reduxjs/toolkit";

// creation reducer function

export const questionReducer = createSlice({
    name: 'questions',
    initialState: {
        queue: [],
        answers: [],
        trace: 0
    },
    reducers: {
        startExamAction: (state, action) => {
            const { question, answers } = action.payload;
            return {
                ...state,
                queue: question,
                answers: answers
            }
        },
        moveNextAction: (state) => {
            return {
                ...state,
                trace: state.trace + 1
            }
        },
        movePrevAction: (state) => {
            return {
                ...state,
                trace: state.trace - 1
            }
        },
        resetAllQuestions: () => {
            // console.log("Removed all questions");
            return {
                queue: [],
                answers: [],
                trace: 0
            }
        }
    }


})

export const { startExamAction, moveNextAction, movePrevAction, resetAllQuestions } = questionReducer.actions;

export default questionReducer.reducer;