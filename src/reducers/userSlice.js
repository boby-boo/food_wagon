import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.user = action.payload
        },
        userLogout: (state) => {
            localStorage.removeItem('user');
            state.user = {};
        }
    }
})

export const { userLogin, userLogout } = userSlice.actions;

export default userSlice.reducer;