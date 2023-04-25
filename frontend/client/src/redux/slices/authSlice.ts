import { createSlice } from "@reduxjs/toolkit";
import { AuthActions, AuthState } from "../../types";

const initialValues: AuthState = {
    user: null,
    token: null
};


export const getUserAndToken = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    if (token && user) {
        return { token, user };
    }
    return initialValues;
};

const authSlice = createSlice({
    name: "auth",
    initialState: getUserAndToken(),
    reducers: {
        setUser: (state, action: AuthActions) => {
            const { user, token } = action.payload;
            console.log(action.payload);
            localStorage.setItem("token", JSON.stringify(token));
            localStorage.setItem("user", JSON.stringify(user));
            return { ...state, user, token };
        },
        logout: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return { ...initialValues };
        }
    }
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: AuthState) => state.user;

export const selectCurrentToken = (state: AuthState) => state.token;
