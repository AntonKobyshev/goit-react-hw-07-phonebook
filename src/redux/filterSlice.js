import { createSlice } from '@reduxjs/toolkit';

const filterInitialState = '';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,

  reducers: {
    setContactFilter(state, action) {
      return action.payload;
    },
  },
});

export const { setContactFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
