import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { paintingAPI } from './API/PaintingService';
import themeReducer from './reducers/themeReducer';

const rootReducer = combineReducers({
  themeReducer,
  [paintingAPI.reducerPath]: paintingAPI.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(paintingAPI.middleware)
  });
};
// попробовать поменять
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
