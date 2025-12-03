import { useNavigate } from "react-router-dom";
import { useBookingsView } from "../hooks/useBookingsView";  

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const { handleBookHotel } = useBookingsView();  

  const handleBookNow = (e) => {
    e.stopPropagation();
    handleBookHotel(hotel);
    
    const button = e.target.closest('button');
    button.textContent = '✅ Booked!';
    button.style.background = '#10b981';
    setTimeout(() => {
      button.textContent = 'Book Now';
      button.style.background = '';
    }, 1500);
  };

  return (
    <div
      className="group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 hover:border-orange-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
      onClick={() => navigate(`/hotel/${hotel._id}`)}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={hotel.image || hotel.images?.[0]}
          alt={hotel.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* OYO Style Price Badge */}
        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 rounded-lg shadow-lg">
          <span className="text-sm font-bold">₹{hotel.price}</span>
          {hotel.originalPrice && (
            <span className="ml-1 text-xs line-through text-orange-200">₹{hotel.originalPrice}</span>
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-xl shadow-md border border-gray-200">
          <div className="flex items-center gap-1 text-xs font-semibold text-gray-800">
            <span className="text-yellow-400">⭐</span>
            {hotel.rating || "4.5"}
            {hotel.reviews && (
              <span className="text-gray-500 font-normal">({hotel.reviews})</span>
            )}
          </div>
        </div>

        {/* PP Badge */}
        <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
          PP
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Hotel Name & Location */}
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-orange-600 transition-colors mb-1">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span>📍</span>
            <span className="truncate">{hotel.city}</span>
          </div>
        </div>

        {/* Amenities Row */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">AC</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">WiFi</span>
          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">TV</span>
        </div>

        {/* Features */}
        <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Free Cancellation
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
            Instant Confirm
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <span className="text-xl font-bold text-orange-600 block">₹{hotel.price}</span>
            <span className="text-xs text-gray-500">night</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/hotel/${hotel._id}`);
              }}
              className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex-1"
            >
              View
            </button>
            <button
              onClick={handleBookNow}
              className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex-1"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
