import { configureStore } from '@reduxjs/toolkit';

import cartReducer from '../reducers/cartSlice';
import dataCardsReducer from '../reducers/dataCardsSlice';
import filteredDataReducer from '../reducers/filteredDataSlice';
import loginSliceReducer from '../reducers/loginSlice';
import searchStateSliceReducer from '../reducers/searchStateSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        dataCards: dataCardsReducer, 
        filteredData: filteredDataReducer,
        login: loginSliceReducer,
        searchState: searchStateSliceReducer
    },
})