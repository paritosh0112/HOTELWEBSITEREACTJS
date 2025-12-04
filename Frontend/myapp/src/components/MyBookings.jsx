import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useDarkMode from "../hooks/useDarkMode";
import { removeBooking } from "../store/slices/bookingsSlice.jsx";



const MyBookings = () => {
  const { isDark } = useDarkMode();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCancel = (bookingId) => {
    dispatch(removeBooking(bookingId));
  };

  return (
    <div className={`min-h-screen py-12 px-4 transition-all duration-300 ${
      isDark ? 'bg-slate-900 text-white' : 'bg-gradient-to-b from-orange-50 to-slate-50'
    }`}>
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <div className="flex items-center mb-8">
          <button
            onClick={handleBack}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold shadow-lg ${
              isDark 
                ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                : 'bg-white/80 hover:bg-white text-gray-900'
            }`}
          >
            ← Back
          </button>
        </div>

        <div className={`text-center mb-12 p-8 rounded-3xl shadow-2xl ${
          isDark 
            ? 'bg-slate-800/50 border border-slate-700' 
            : 'bg-white/80 border border-orange-100'
        }`}>
          <h1 className="text-4xl font-black mb-4">
            My Bookings
          </h1>
          <p className="text-lg">
            Manage all your hotel bookings in one place
          </p>
        </div>

        {/* If No Bookings */}
        {bookings.length === 0 ? (
          <div className={`text-center py-20 rounded-3xl ${
            isDark ? 'bg-slate-800/30 border-2 border-dashed border-slate-600'
                   : 'bg-white/50 border-2 border-dashed border-gray-200'
          }`}>
            <h3 className="text-2xl font-bold mb-4">
              No bookings yet
            </h3>
            <a href="/" className="inline-flex px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl">
              🏨 Browse Hotels
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl font-semibold text-center bg-white/80 border border-gray-200">
              {bookings.length} {bookings.length === 1 ? 'Booking' : 'Bookings'} Found
            </div>

            {bookings.map((booking) => (
              <div key={booking.id} className="p-6 rounded-3xl shadow-xl border bg-white">
                <div className="flex items-start gap-6">
                  <img 
                    src={booking.hotelImage}
                    alt={booking.hotelName}
                    className="w-28 h-24 object-cover rounded-2xl"
                  />
                  <div className="flex-1">

                    <h3 className="font-black text-xl mb-2">
                      {booking.hotelName}
                    </h3>

                    <p className="text-lg mb-4">
                      📍 {booking.city}
                    </p>

                    <div className="flex items-center justify-between">

                      <div className="text-sm">
                        <span className="px-3 py-1 rounded-xl font-bold bg-emerald-100 text-emerald-700">
                          ✅ Confirmed
                        </span>
                      </div>

                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="px-4 py-2 rounded-xl font-bold text-sm bg-red-100 text-red-700"
                      >
                        ❌ Cancel
                      </button>

                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyBookings;
