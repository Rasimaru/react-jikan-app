import { createSlice } from '@reduxjs/toolkit';

const selectedSlice = createSlice({
  name: 'selected',
  initialState: {
    selectedItems: []
  },
  reducers: {}
});

export default selectedSlice.reducer;
