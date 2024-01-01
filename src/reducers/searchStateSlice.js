import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchState: {
        currentValue: '',
        isEmpty: false
    }
}

export const searchStateSlice = createSlice({
    name: 'searchState',
    initialState,
    reducers: {
        searchedState: (state, action) => {
            state.searchState = action.payload
        }
    }
})

export const { searchedState } = searchStateSlice.actions;

export default searchStateSlice.reducer;