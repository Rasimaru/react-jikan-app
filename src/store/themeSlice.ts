import type { Theme } from '@/types/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark' || saved === 'system') {
    return saved;
  }
  return 'system';
};

const initialState = {
  current: getInitialTheme()
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.current = action.payload;
      localStorage.setItem('theme', action.payload);
    }
  }
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
