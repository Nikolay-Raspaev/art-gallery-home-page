import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
    isLightTheme: boolean;
}

const initialState: ThemeState = {
    isLightTheme: localStorage.getItem('isLight') === 'true'
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state) => {
            state.isLightTheme = !state.isLightTheme;
            localStorage.setItem('isLight', String(state.isLightTheme));
        }
    }
});

export const { reducer: themeReducer, actions: themeActions } = themeSlice;
