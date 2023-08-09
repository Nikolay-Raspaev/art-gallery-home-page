import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    changeTheme: (state, action: PayloadAction<boolean>) => {
      state.isLightTheme = action.payload;
    }
  }
});

export default themeSlice.reducer;
