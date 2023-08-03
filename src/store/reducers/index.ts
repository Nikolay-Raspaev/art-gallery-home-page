import { combineReducers } from 'redux';
import { authorReducer } from './authorReducer';
import { paintingReducer } from './paintingReducer';
import { locationReducer } from './locationReducer';
import { themeReducer } from './themeReducer';

export const rootReducer = combineReducers({
  author: authorReducer,
  location: locationReducer,
  painting: paintingReducer,
  theme: themeReducer
});

export type RootState = ReturnType<typeof rootReducer>;
