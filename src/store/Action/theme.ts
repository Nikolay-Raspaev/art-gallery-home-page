import { Dispatch } from 'redux';
import { ChangeTheme, ThemeAction } from '../reducers/themeReducer';

export const setTheme = (theme: boolean) => {
  return (dispatch: Dispatch<ThemeAction>) => {
    localStorage.setItem('isLight', String(theme));
    dispatch(ChangeTheme(theme));
  };
};
