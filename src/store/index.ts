import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from './selectedSlice';

const store = configureStore({
  reducer: {
    selected: selectedReducer
  }
});

export default store;
