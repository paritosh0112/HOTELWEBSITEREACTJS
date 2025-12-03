import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useDarkMode from "../hooks/useDarkMode";

const MyBookings = () => {
  const { isDark } = useDarkMode();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleCancel = (bookingId) => {
  
    dispatch({
      type: 'bookings/removeBooking',
      payload: bookingId
    });
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
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 ${
              isDark 
                ? 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 hover:border-slate-500' 
                : 'bg-white/80 hover:bg-white text-gray-900 border border-gray-200 hover:border-orange-300 hover:shadow-orange-100'
            }`}
          >
            ← Back
          </button>
        </div>

        <div className={`text-center mb-12 p-8 rounded-3xl shadow-2xl transition-all duration-300 ${
          isDark 
            ? 'bg-slate-800/50 border border-slate-700' 
            : 'bg-white/80 border border-orange-100'
        }`}>
          <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center ${
            isDark ? 'bg-slate-700' : 'bg-orange-100'
          }`}>
            <span className="text-3xl">📋</span>
          </div>
          <h1 className={`text-4xl font-black mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            My Bookings
          </h1>
          <p className={`text-lg ${
            isDark ? 'text-slate-400' : 'text-gray-600'
          }`}>
            Manage all your hotel bookings in one place
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className={`text-center py-20 rounded-3xl transition-all duration-300 ${
            isDark ? 'bg-slate-800/30 border-2 border-dashed border-slate-600' : 'bg-white/50 border-2 border-dashed border-gray-200'
          }`}>
            <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl flex items-center justify-center ${
              isDark ? 'bg-slate-700' : 'bg-orange-100'
            }`}>
              <span className="text-4xl">🏨</span>
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              No bookings yet
            </h3>
            <p className={`text-lg mb-8 max-w-md mx-auto ${
              isDark ? 'text-slate-400' : 'text-gray-600'
            }`}>
              Book your first hotel and check back here to manage your reservations
            </p>
            <a href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              🏨 Browse Hotels
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`p-6 rounded-2xl font-semibold text-center transition-all duration-300 ${
              isDark 
                ? 'bg-slate-800 border border-slate-700 text-slate-300' 
                : 'bg-white/80 border border-gray-200 text-gray-800'
            }`}>
              {bookings.length} {bookings.length === 1 ? 'Booking' : 'Bookings'} Found
            </div>
            
            {bookings.map((booking) => (
              <div key={booking.id} className={`p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 hover:border-amber-500/50' 
                  : 'bg-white border-gray-100 hover:border-orange-200 hover:shadow-orange-100'
              }`}>
                <div className="flex items-start gap-6">
                  <img 
                    src={booking.hotelImage} 
                    alt={booking.hotelName}
                    className="w-28 h-24 object-cover rounded-2xl shadow-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-black text-xl mb-2 truncate ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {booking.hotelName}
                    </h3>
                    <p className={`text-lg mb-4 ${
                      isDark ? 'text-slate-300' : 'text-gray-700'
                    }`}>
                      📍 {booking.city}
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`px-3 py-1 rounded-xl font-bold ${
                          isDark 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          ✅ Confirmed
                        </span>
                        <span>📅 {new Date(booking.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`text-2xl font-black ${
                          isDark ? 'text-amber-400' : 'text-orange-600'
                        }`}>
                          ₹{booking.price}/night
                        </div>
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className={`flex items-center gap-1 px-4 py-2 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 ${
                            isDark 
                              ? 'bg-red-500/90 hover:bg-red-600 text-white border border-red-500/50 hover:border-red-400' 
                              : 'bg-red-100 hover:bg-red-50 text-red-700 border-2 border-red-200 hover:border-red-400'
                          }`}
                        >
                          ❌ Cancel
                        </button>
                      </div>
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
