import { createSlice } from '@reduxjs/toolkit'

export const selectSlice = createSlice({
    name: 'tickerSelect',
    initialState: {
        value: '',
    },
    reducers: {
        selected: (state, action) => {         
            state.value = action.payload;
        },
        unSelect: (state, action) => {
            state.value = ''
        }
    },
})

export const { selected, unSelect } = selectSlice.actions

export default selectSlice.reducer