import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    login: JSON.parse(localStorage.getItem('user')) || {}
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            console.log(action.payload)
            // localStorage.setItem('user', JSON.stringify(action.payload));
            state.login = action.payload
        },
        userLogout: (state, action) => {
            console.log(state.login)
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.login = action.payload
        }
    }
})

export const { userLogin, userLogout } = loginSlice.actions;

export default loginSlice.reducer;