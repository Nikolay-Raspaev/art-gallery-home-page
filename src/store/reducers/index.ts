import { combineReducers } from 'redux';
import { authorReducer } from './authorReducer';

export const rootReducer = combineReducers({
  option: authorReducer
});

export type RootState = ReturnType<typeof rootReducer>;
