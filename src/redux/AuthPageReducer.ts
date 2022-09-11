import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
    showAuthPage: boolean,
    authPageState: "Login" | "Sign Up",
}

const initialState: AuthState = {
    showAuthPage: false,
    authPageState: "Login",
}

const authPage = createSlice({
    name: "Auth Page",
    initialState: initialState,
    reducers: {
        toggleAuthPage: (state, {payload}: PayloadAction<boolean>) => {
            return({
                ...state,
                showAuthPage: payload,
            });
        },

        toggleAuthPageState: (state, {payload}: PayloadAction<"Login" | "Sign Up">) => {
            return({
                ...state,
                authPageState: payload,
            });
        }
    }
});

const store = configureStore({
    reducer: authPage.reducer
});

export const { toggleAuthPage, toggleAuthPageState } = authPage.actions;

export { authPage, store }