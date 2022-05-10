import { createSlice } from '@reduxjs/toolkit'

export const selectSlice = createSlice(
    {
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
            },
            brokerSelected: (state, action) => {
                state.value = action.payload;
            },
        }
    });

export const { selected, unSelect,brokerSelected } = selectSlice.actions

export default selectSlice.reducer