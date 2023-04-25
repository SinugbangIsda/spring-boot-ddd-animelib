import { configureStore } from '@reduxjs/toolkit';
import { authApi } from "./services/authServices";
import { animeApi } from './services/animeService';
import { watchlistApi } from "./services/watchlistService";
import authSlice from './slices/authSlice';

import { setupListeners } from '@reduxjs/toolkit/dist/query';


export const store = configureStore({
    reducer: {
        [ authApi.reducerPath ]: authApi.reducer,
        [ animeApi.reducerPath ]: animeApi.reducer,
        [ watchlistApi.reducerPath ]: watchlistApi.reducer,
        auth: authSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            animeApi.middleware,
            watchlistApi.middleware
        )
});

setupListeners(store.dispatch);