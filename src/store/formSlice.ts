import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type CountryOption = { value: string; label: string };

type FormState = {
  picture: string | null;
  countries: CountryOption[];
};

const initialState: FormState = {
  picture: null,
  countries: [
    { value: 'US', label: 'USA' },
    { value: 'CA', label: 'Canada' },
    { value: 'PL', label: 'Poland' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' }
  ]
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setPicture(state, action: PayloadAction<string>) {
      state.picture = action.payload;
    },
    setCountries(state, action: PayloadAction<CountryOption[]>) {
      state.countries = action.payload;
    }
  }
});

export const { setPicture, setCountries } = formSlice.actions;

export const selectCountries = (state: { form: FormState }) => state.form.countries;
export const selectPicture = (state: { form: FormState }) => state.form.picture;

export default formSlice.reducer;
