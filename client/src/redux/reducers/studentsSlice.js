import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    students: [],
}

export const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        studentAdded(state, action) {
            state.push(action.payload)
        }
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = studentsSlice.actions

export default studentsSlice.reducer