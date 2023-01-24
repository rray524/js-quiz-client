import { createSlice } from "@reduxjs/toolkit"
// creation reducer function
export const resultReducer = createSlice({
    name: 'result',
    initialState: {
        userId: "",
        result: []

    },
    reducers: {
        setUserID: (state, action) => {
            state.userId = action.payload
        },
        pushResultAction: (state, action) => {
            state.result.push(action.payload)
        },
        updateResultAction: (state, action) => {
            const { trace, checked } = action.payload;
            state.result.fill(checked, trace, trace + 1)
        },
        resetAllResult: () => {
            // console.log("Removed all results");
            return {
                userId: null,
                result: []
            }
        }
    }
})

export const { setUserID, pushResultAction, resetAllResult, updateResultAction } = resultReducer.actions;
export default resultReducer.reducer;
