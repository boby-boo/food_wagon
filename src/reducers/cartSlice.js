import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const updateData = {
                ...action.payload,
                quantity: action.payload.hasOwnProperty('quantity')
                    ? action.payload.quantity
                    : 1,
            };

            const checkIndex = state.cart.some(
                item => item.id === action.payload.id,
            );

            if (checkIndex) {
                const updateBasket = state.cart.map(item => {
                    if (item.id === updateData.id) {
                        return {
                            ...item,
                            quantity: item.quantity + updateData.quantity,
                        };
                    }
                    return item;
                });

                localStorage.setItem('cart', JSON.stringify(updateBasket));

                state.cart = updateBasket;
                return;
            }

            localStorage.setItem(
                'cart',
                JSON.stringify([...state.cart, updateData]),
            );
            state.cart.push(updateData);
        },
        removeFromCart: (state, action) => {
            const updateBasket = state.cart
                .map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item,
                )
                .filter(item => item.quantity > 0);

            localStorage.setItem('cart', JSON.stringify(updateBasket));
            state.cart = updateBasket;
        },
        removeItem: (state, action) => {
            localStorage.setItem(
                'cart',
                JSON.stringify(
                    state.cart.filter(item => item.id !== action.payload.id),
                ),
            );
            state.cart = state.cart.filter(
                item => item.id !== action.payload.id,
            );
        },
        removeAllItem: state => {
            localStorage.removeItem('cart');
            state.cart = [];
        },
    },
});

export const { addToCart, removeFromCart, removeItem, removeAllItem } =
    cartSlice.actions;

export default cartSlice.reducer;
