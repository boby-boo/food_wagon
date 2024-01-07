import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import cartReducer from '../reducers/cartSlice';
import dataCardsReducer from '../reducers/dataCardsSlice';
import filteredDataReducer from '../reducers/filteredDataSlice';
import searchStateSliceReducer from '../reducers/searchStateSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        dataCards: dataCardsReducer,
        filteredData: filteredDataReducer,
        searchState: searchStateSliceReducer,
    },
});
