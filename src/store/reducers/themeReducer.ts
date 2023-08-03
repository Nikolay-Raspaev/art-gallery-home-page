interface ThemeState {
  isLightTheme: boolean;
}

const initialState: ThemeState = {
  isLightTheme: localStorage.getItem('isLight') === 'true'
};

const SET_THEME = typeof 'SET_THEME';

export interface ThemeAction {
  type: typeof SET_THEME;
  payload: boolean;
}

export const themeReducer = (state = initialState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case SET_THEME:
      return { isLightTheme: action.payload };
    default:
      return state;
  }
};

export const ChangeTheme = (theme: boolean) => ({
  type: SET_THEME,
  payload: theme
});
