import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BookingForm from "./BookingForm";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔥 Redux se hotels lo
  const hotels = useSelector((state) => state.hotels.hotels);

  const [hotel, setHotel] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [showBooking, setShowBooking] = useState(false);

  // 🔥 API ki jagah Redux se hotel find karna
  useEffect(() => {
    if (hotels.length > 0) {
      const foundHotel = hotels.find((h) => h._id === id);
      setHotel(foundHotel);
    }
  }, [hotels, id]);

  if (!hotel)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏨</span>
          </div>
          <p className="text-lg text-gray-600 font-medium">Loading hotel details...</p>
        </div>
      </div>
    );

  const images = hotel.images || [hotel.image];

  const prevImage = () => {
    setCurrentImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Navigation */}
          <div className="flex items-center justify-between mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-gray-700 hover:text-orange-600 font-medium text-sm transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Hotels
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Instant Confirmation
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Image Gallery */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
              <div className="relative h-80 sm:h-96 lg:h-[500px]">

                <img
                  src={images[currentImg]}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-orange-500 text-white px-3 py-1.5 text-sm font-bold rounded-full shadow-lg">
                    Best Rooms
                  </span>
                  <span className="bg-white/90 text-gray-800 px-3 py-1.5 text-sm font-semibold rounded-full shadow-md backdrop-blur-sm border">
                    Best Deal
                  </span>
                </div>

                {/* Controls */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg border backdrop-blur-sm transition-all duration-200"
                    >
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg border backdrop-blur-sm transition-all duration-200"
                    >
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-2xl">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImg(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          idx === currentImg ? "w-6 bg-white shadow-md" : "bg-white/50 hover:bg-white"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Hotel Info & Booking */}
            <div className="space-y-6">

              {/* Header */}
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                    <div className="flex items-center gap-2 text-lg text-gray-700 mb-2">
                      <span>📍</span>
                      <span>{hotel.city}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm font-bold text-yellow-400 mb-1">
                      <span>⭐</span>
                      {hotel.rating || "4.5"}
                      <span className="text-gray-500 font-normal">
                        ({hotel.reviews || 0} reviews)
                      </span>
                    </div>
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                      Verified Property
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-orange-600">₹{hotel.price}</span>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{hotel.originalPrice || "2500"}
                    </span>
                    <span className="text-sm text-green-600 font-semibold">per night</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Taxes included • No hidden charges
                  </p>
                </div>
              </div>

              {/* Amenities */}
              {hotel.amenities?.length > 0 && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 text-sm">✓</span>
                    </span>
                    Amenities
                  </h3>

                  <div className="grid grid-cols-2 gap-2">
                    {hotel.amenities.map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-700 p-2 hover:bg-gray-50 rounded-xl transition-colors"
                      >
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-2xl border border-green-100">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="font-semibold text-green-800">Free Cancellation</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-2xl border border-orange-100">
                    <span className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="font-semibold text-orange-800">Instant Booking</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowBooking(true)}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    🏨 Book This Room Now
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Popup */}
      {showBooking && hotel && (
        <div className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 border-b border-gray-100 p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Complete Your Booking</h2>
                <button
                  onClick={() => setShowBooking(false)}
                  className="p-2 hover:bg-gray-100 rounded-2xl transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <BookingForm hotel={hotel} onClose={() => setShowBooking(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default HotelDetails;
