import { configureStore } from '@reduxjs/toolkit';
import hotelsReducer from './slices/hotelsSlice';
import bookingsReducer from './slices/bookingsSlice';  // ← ADD

export const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    bookings: bookingsReducer,  // ← ADD
  },
});
