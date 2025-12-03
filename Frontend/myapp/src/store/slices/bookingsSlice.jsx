import { createSlice } from '@reduxjs/toolkit';

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
  },
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },

    clearBookings: (state) => {
      state.bookings = [];
    },

    
    removeBooking: (state, action) => {
      state.bookings = state.bookings
    },
  },
});

export const { addBooking, clearBookings, removeBooking } = bookingsSlice.actions;
export default bookingsSlice.reducer;
