import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from './selectedSlice';
import themeReducer from './themeSlice';

const store = configureStore({
  reducer: {
    selected: selectedReducer,
    theme: themeReducer
  }
});

export default store;
