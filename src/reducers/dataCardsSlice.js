import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dataCards: [],
};

export const dataCardsSlice = createSlice({
    name: 'dataCards',
    initialState,
    reducers: {
        updateDataCards: (state, action) => {
            state.dataCards = action.payload;
        },
    },
});

export const { updateDataCards } = dataCardsSlice.actions;

export default dataCardsSlice.reducer;
