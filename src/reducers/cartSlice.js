import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: JSON.parse(localStorage.getItem('cart')) || []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const updateData = {
                ...action.payload,
                quantity: 1,
            }

            const checkIndex = state.cart.find(item => item.id === updateData.id);

            if (checkIndex) {
                const updateBasket = state.cart.map(item => item.id === updateData.id ? { ...item, quantity: item.quantity + 1} : item);

                localStorage.setItem('cart', JSON.stringify(updateBasket));

                state.cart = updateBasket;
                return;
            }
            localStorage.setItem('cart', JSON.stringify([...state.cart, updateData]))
            state.cart.push(updateData)  
        },
        removeFromCart: (state, action) => {
            const checkIndex = state.cart.find(item => item.id === action.payload.id);
            
            if (checkIndex) {
                const updateBasket = state.cart.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity - 1} : item);
                const filteredBasket = updateBasket.filter(item => item.quantity > 0);
                localStorage.setItem('cart', JSON.stringify(filteredBasket));
                state.cart = filteredBasket
            };
        },
        removeItem: (state, action) => {
            localStorage.setItem('cart', JSON.stringify(state.cart.filter(item => item.id !== action.payload.id)));
            state.cart = state.cart.filter(item => item.id !== action.payload.id);
        }
    }
})

export const { addToCart, removeFromCart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;