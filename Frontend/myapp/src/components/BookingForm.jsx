import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBooking } from "../store/slices/bookingsSlice";

const BookingForm = ({ hotel, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    rooms: 1,
    adults: 2,
    children: 0,
  });
  const [loading, setLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show confirmation summary on submit
    setShowSummary(true);
  };

  const confirmBooking = () => {
    setLoading(true);
    setShowSummary(false);

    const uniqueId = Date.now() + Math.random().toString(36).substr(2, 9);

    const bookingData = {
      id: uniqueId,
      hotelId: hotel._id,
      hotelName: hotel.name,
      hotelImage: hotel.image || hotel.images?.[0],
      city: hotel.city,
      price: hotel.price,
      date: formData.checkIn,
      guestName: formData.guestName,
      ...formData,
    };

    dispatch(addBooking(bookingData));
    onClose();
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      navigate("/my-bookings");
    }, 2500);

    setLoading(false);
  };

  // Summary Box with user details before final confirmation
  if (showSummary) {
    return (
      <div className="p-6 space-y-6 max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📋</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900">Review & Confirm</h2>
          <p className="text-gray-600">Please verify your booking details</p>
        </div>

        {/* Hotel Info */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-3xl border-2 border-orange-200 shadow-lg mb-6">
          <h3 className="font-bold text-xl mb-4 text-orange-800 flex items-center gap-2">
            🏨 {hotel.name}
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>{hotel.city}</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-orange-600">₹{hotel.price}</span>
              <span className="text-sm ml-1">/night</span>
            </div>
          </div>
        </div>

        {/* Guest Details */}
        <div className="bg-white p-6 rounded-3xl border-2 border-gray-200 shadow-lg mb-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            👤 Guest Information
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Name:</span>
              <span className="font-bold text-gray-900">{formData.guestName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Email:</span>
              <span className="font-bold text-gray-900">{formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Phone:</span>
              <span className="font-bold text-gray-900">{formData.phone}</span>
            </div>
          </div>
        </div>

        {/* Stay Details */}
        <div className="bg-white p-6 rounded-3xl border-2 border-gray-200 shadow-lg mb-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            📅 Stay Details
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-gray-700 mb-1">Check-in</div>
              <div className="font-bold text-gray-900">{formData.checkIn || "Not selected"}</div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">Check-out</div>
              <div className="font-bold text-gray-900">{formData.checkOut || "Not selected"}</div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">Rooms</div>
              <div className="font-bold text-gray-900">{formData.rooms}</div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">Guests</div>
              <div className="font-bold text-gray-900">{formData.adults} Adults, {formData.children} Children</div>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="p-6 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-3xl border-2 border-emerald-200 shadow-lg text-center mb-6">
          <div className="text-3xl font-black text-emerald-800 mb-2">
            Total: ₹{hotel.price * formData.rooms}
          </div>
          <p className="text-emerald-700 font-semibold">No hidden charges</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setShowSummary(false)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-gray-200"
          >
            ✏️ Edit Details
          </button>
          <button
            onClick={confirmBooking}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            ✅ Confirm & Book
          </button>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-[10001] bg-gradient-to-br from-black/80 via-emerald-900/30 to-black/80 backdrop-blur-xl flex items-center justify-center p-4">
        <div className="relative bg-gradient-to-b from-emerald-500 via-emerald-600 to-teal-600 text-white p-12 rounded-3xl shadow-2xl max-w-md w-full text-center group overflow-hidden border-4 border-white/20 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-shimmer" />
          <div className="absolute top-4 right-4 w-20 h-20 bg-white/20 rounded-full blur-xl animate-ping opacity-60" />
          <div className="absolute bottom-6 left-6 w-12 h-12 bg-white/30 rounded-full blur-lg animate-bounce [animation-delay:0.3s]" />
          <div className="relative z-10">
            <div className="w-28 h-28 bg-white/25 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl backdrop-blur-sm border-4 border-white/40 hover:scale-110 transition-all duration-300">
              <span className="text-5xl">✅</span>
            </div>
            <h2 className="text-4xl font-black mb-2 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent drop-shadow-2xl">
              Booking Confirmed!
            </h2>
            <p className="text-xl font-semibold opacity-95 mb-8 drop-shadow-lg">
              Your stay at <span className="font-black text-yellow-200">{hotel.name}</span> is secured!
            </p>
            <div className="w-full bg-white/20 rounded-2xl h-3 mb-6 overflow-hidden shadow-lg">
              <div className="w-0 h-full bg-gradient-to-r from-yellow-300 via-emerald-300 to-teal-300 rounded-2xl shadow-lg animate-fill-progress"></div>
            </div>
            <p className="text-lg opacity-90 mb-6 drop-shadow-md">
              Redirecting to My Bookings <span className="text-2xl">✨</span>
            </p>
            <div className="flex items-center justify-center gap-4 text-4xl">
              <div className="w-12 h-12 bg-gradient-to-b from-orange-400 to-orange-500 rounded-full shadow-2xl hover:rotate-180 transition-all duration-500 flex items-center justify-center animate-spin-slow">
                <span>🚀</span>
              </div>
              <span className="text-yellow-300 animate-pulse text-3xl">→</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Hotel Summary */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center">
            <span className="text-2xl">🏨</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
            <p className="text-sm text-gray-600">{hotel.city}</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">
              ₹{hotel.price} <span className="text-sm text-gray-500">per night</span>
            </p>
          </div>
        </div>
      </div>

      {/* Guest Details */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-gray-900">Guest Details</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="guestName"
            placeholder="Full Name"
            value={formData.guestName}
            onChange={handleChange}
            required
            className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Stay Details */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-gray-900">Stay Details</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 pt-4">
          <select
            name="rooms"
            value={formData.rooms}
            onChange={handleChange}
            className="p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500"
          >
            <option value={1}>1 Room</option>
            <option value={2}>2 Rooms</option>
            <option value={3}>3 Rooms</option>
          </select>
          <input
            type="number"
            name="adults"
            placeholder="Adults"
            value={formData.adults}
            onChange={handleChange}
            min={1}
            className="p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="number"
            name="children"
            placeholder="Children"
            value={formData.children}
            onChange={handleChange}
            min={0}
            className="p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Total & Buttons */}
      <div className="pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center text-2xl font-bold text-gray-900 mb-6">
          <span>Total:</span>
          <span>₹{hotel.price * formData.rooms}</span>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 px-6 rounded-2xl transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Booking...
              </>
            ) : (
              "Confirm Booking"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;
