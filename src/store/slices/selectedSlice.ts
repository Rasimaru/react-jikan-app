import type { SelectedItem, SelectedState } from '@/types/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: SelectedState = {
  selectedItems: []
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    addSelected(state, action: PayloadAction<SelectedItem>) {
      const alreadyExists = state.selectedItems.some((item) => item.id === action.payload.id);
      if (!alreadyExists) {
        state.selectedItems.push(action.payload);
      }
    },
    removeSelected(state, action: PayloadAction<string>) {
      state.selectedItems = state.selectedItems.filter((item) => item.id !== action.payload);
    },
    clearAll(state) {
      state.selectedItems = [];
    }
  }
});

export const { addSelected, removeSelected, clearAll } = selectedSlice.actions;

export default selectedSlice.reducer;
