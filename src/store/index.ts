import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from './selectedSlice';
import apiSlice from '@/services/apiSlice';

const store = configureStore({
  reducer: {
    selected: selectedReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;
