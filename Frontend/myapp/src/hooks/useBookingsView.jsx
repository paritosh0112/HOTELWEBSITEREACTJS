import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBooking } from '../store/slices/bookingsSlice';

export const useBookingsView = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);
  const [viewMode, setViewMode] = useState('cards'); 

  const toggleView = () => 
    setViewMode(viewMode === 'cards' ? 'table' : 'cards');

  const handleBookHotel = (hotel) => {
    dispatch(addBooking(hotel));  
  };

  return { bookings, viewMode, toggleView, handleBookHotel };
};
