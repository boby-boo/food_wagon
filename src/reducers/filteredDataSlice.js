import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filteredData: null,
};

export const filteredDataSlice = createSlice({
    name: 'filteredData',
    initialState,
    reducers: {
        filteredProductsData: (state, action) => {
            if (action.payload) {
                state.filteredData = action.payload;
            } else {
                state.filteredData = null;
            }
        },
    },
});

export const { filteredProductsData } = filteredDataSlice.actions;

export default filteredDataSlice.reducer;
