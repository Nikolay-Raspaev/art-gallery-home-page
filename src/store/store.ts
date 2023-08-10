import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { paintingApi } from './Api/paintingApi';
import { themeReducer } from './reducers/themeSlice';

const rootReducer = combineReducers({
    themeReducer,
    [paintingApi.reducerPath]: paintingApi.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(paintingApi.middleware)
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
