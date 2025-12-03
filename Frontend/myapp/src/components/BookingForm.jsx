import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ hotel, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    rooms: 1,
    adults: 2,
    children: 0
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Booking API call
      const bookingData = {
        ...formData,
        hotelId: hotel._id,
        hotelName: hotel.name,
        price: hotel.price,
        totalAmount: hotel.price * formData.rooms
      };
      
      await axios.post("http://localhost:5000/bookings", bookingData);
      onClose();
      navigate("/my-bookings");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

      {/* Total & CTA */}
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
