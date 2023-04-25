import { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../interfaces";
import { store } from "../redux/store";

export type AuthState = {
    user: User | null;
    token: string | null;
};

export type AuthActions = PayloadAction<AuthState>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;