import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import { fetchHotels, setFilterCity, setFilterName, setFilterPrice, setSortOrder, clearFilters, selectFilteredHotels } from "./store/slices/hotelsSlice";

import HotelCard from "./components/HotelCard";
import HotelDetails from "./components/HotelDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import useDarkMode from "./hooks/useDarkMode";
import MyBookings from "./components/MyBookings";
import ChatBot from "./components/ChatBot";

function AppContent() {
  const { isDark, themeName, toggleTheme } = useDarkMode();
  const dispatch = useDispatch();
  
  const hotelsState = useSelector((state) => state.hotels);
  const filteredHotels = useSelector(selectFilteredHotels);
  const { filters, sortOrder, status } = hotelsState;
  const bookings = useSelector((state) => state.bookings.bookings);
  
  // 🔥 VIEW MODE STATE
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchHotels());
    }
  }, [status, dispatch]);

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const allCities = hotelsState.hotels 
    ? Array.from(new Set(hotelsState.hotels.map(hotel => hotel.city))).slice(0, 10)
    : [];

  const handleCityFilter = (city) => {
    dispatch(setFilterCity(city));
  };

  // 🔥 VIEW TOGGLE HANDLER
  const toggleViewMode = () => {
    setViewMode(viewMode === 'cards' ? 'table' : 'cards');
  };

  return (
    <Router>
      <div className={`min-h-screen transition-all duration-300 ${
        isDark 
          ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white' 
          : 'bg-gradient-to-b from-orange-50 via-white to-slate-50 text-gray-900'
      }`}>
        <Navbar theme={themeName} toggleTheme={toggleTheme} />
        
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="max-w-7xl mx-auto px-4 py-6 lg:px-8">
                  {/* Header */}
                  <div className={`backdrop-blur-sm border rounded-2xl shadow-sm mb-6 p-6 transition-all duration-300 ${
                    isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-orange-100'
                  }`}>
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-6 bg-gradient-to-b rounded-sm" 
                               style={isDark ? {background: 'linear-gradient(to bottom, #fbbf24, #f59e0b)'} : {}} />
                          <span className={`text-sm font-semibold tracking-wide uppercase ${
                            isDark ? 'text-amber-400' : 'text-orange-600'
                          }`}>
                            Super Saver Deals
                          </span>
                        </div>
                        <h1 className={`text-2xl lg:text-3xl font-bold transition-all duration-300 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          Hotels in {filters.city || "India"}
                        </h1>
                        <p className={`text-sm mt-1 transition-all duration-300 ${
                          isDark ? 'text-slate-400' : 'text-gray-600'
                        }`}>
                          {filteredHotels.length} hotels • Best prices guaranteed
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 🔥 REAL DATA CITY BUTTONS */}
                  {allCities.length > 0 && (
                    <div className={`mb-6 p-4 rounded-3xl shadow-xl transition-all duration-300 ${
                      isDark 
                        ? 'bg-slate-800/50 border border-slate-700' 
                        : 'bg-white/80 border border-orange-100 shadow-lg'
                    }`}>
                      <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        📍 Available Cities
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {allCities.map((city) => (
                          <button
                            key={city}
                            onClick={() => handleCityFilter(city)}
                            className={`px-4 py-2.5 rounded-2xl font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300 border flex items-center gap-2 ${
                              filters.city === city
                                ? (isDark 
                                    ? 'bg-amber-500/90 text-white border-amber-400 shadow-amber-500/25' 
                                    : 'bg-orange-500 text-white border-orange-400 shadow-orange-200'
                                  )
                                : (isDark
                                    ? 'bg-slate-700 hover:bg-slate-600 text-slate-200 border-slate-600 hover:border-slate-500'
                                    : 'bg-white hover:bg-gray-50 text-gray-800 border-gray-200 hover:border-orange-300'
                                  )
                            }`}
                          >
                            📍 {city}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Search Bar */}
                  <div className={`shadow-lg border rounded-2xl mb-6 overflow-hidden transition-all duration-300 ${
                    isDark ? 'bg-slate-800/50 border-slate-600 shadow-black/20' : 'bg-white border-gray-100 shadow-lg'
                  }`}>
                    <div className={`p-4 border-b transition-all duration-300 ${
                      isDark ? 'border-slate-600 bg-slate-800/50' : 'border-gray-100'
                    }`}>
                      <div className={`flex items-center gap-2 text-sm transition-all duration-300 ${
                        isDark ? 'text-slate-400' : 'text-gray-600'
                      }`}>
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        Search hotels by name, location, or amenities
                      </div>
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 p-4">
                      <div className="relative">
                        <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm transition-all duration-300 ${
                          isDark ? 'text-slate-400' : 'text-gray-400'
                        }`}>
                          🏨 Hotel
                        </span>
                        <input
                          type="text"
                          placeholder="Hotel name"
                          value={filters.name}
                          onChange={(e) => dispatch(setFilterName(e.target.value))}
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-orange-400 transition-all duration-200 ${
                            isDark 
                              ? 'bg-slate-700/50 border-slate-500 text-white placeholder-slate-400 hover:bg-slate-700 focus:ring-amber-400 focus:border-amber-400' 
                              : 'border-gray-200 bg-gray-50 hover:bg-white focus:ring-orange-400 focus:border-orange-400'
                          }`}
                        />
                      </div>

                      <div className="relative">
                        <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm transition-all duration-300 ${
                          isDark ? 'text-slate-400' : 'text-gray-400'
                        }`}>
                          📍 Location
                        </span>
                        <input
                          type="text"
                          placeholder="City or area"
                          value={filters.city}
                          onChange={(e) => dispatch(setFilterCity(e.target.value))}
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-orange-400 transition-all duration-200 ${
                            isDark 
                              ? 'bg-slate-700/50 border-slate-500 text-white placeholder-slate-400 hover:bg-slate-700 focus:ring-amber-400 focus:border-amber-400' 
                              : 'border-gray-200 bg-gray-50 hover:bg-white focus:ring-orange-400 focus:border-orange-400'
                          }`}
                        />
                      </div>

                      <div className="relative">
                        <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm transition-all duration-300 ${
                          isDark ? 'text-slate-400' : 'text-gray-400'
                        }`}>
                          💰 ₹0 - ₹
                        </span>
                        <input
                          type="number"
                          placeholder="5000"
                          value={filters.price}
                          onChange={(e) => dispatch(setFilterPrice(e.target.value))}
                          className={`w-full pl-12 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-orange-400 transition-all duration-200 ${
                            isDark 
                              ? 'bg-slate-700/50 border-slate-500 text-white placeholder-slate-400 hover:bg-slate-700 focus:ring-amber-400 focus:border-amber-400' 
                              : 'border-gray-200 bg-gray-50 hover:bg-white focus:ring-orange-400 focus:border-orange-400'
                          }`}
                        />
                      </div>

                      <div className="relative">
                        <select
                          value={sortOrder}
                          onChange={(e) => dispatch(setSortOrder(e.target.value))}
                          className={`w-full pl-4 pr-8 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-orange-400 transition-all duration-200 appearance-none cursor-pointer ${
                            isDark 
                              ? 'bg-slate-700/50 border-slate-500 text-white hover:bg-slate-700 focus:ring-amber-400 focus:border-amber-400' 
                              : 'border-gray-200 bg-gray-50 hover:bg-white focus:ring-orange-400 focus:border-orange-400'
                          }`}
                        >
                          <option value="rating-desc">⭐ Rating: High to Low</option>
                          <option value="rating-asc">⭐ Rating: Low to High</option>
                          <option value="price-asc">💰 Price: Low to High</option>
                          <option value="price-desc">💰 Price: High to Low</option>
                          <option value="name-asc">🔤 Name: A → Z</option>
                          <option value="name-desc">🔤 Name: Z → A</option>
                        </select>
                        <span className={`absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                          isDark ? 'text-slate-400' : 'text-gray-400'
                        }`}>
                          ▼
                        </span>
                      </div>
                    </div>

                    <div className="px-4 pb-4 flex gap-3">
                      <button
                        onClick={handleClearFilters}
                        className={`flex-1 py-3 px-4 text-sm font-medium rounded-xl transition-all duration-200 border ${
                          isDark 
                            ? 'bg-slate-700/50 hover:bg-slate-600 text-slate-200 border-slate-500 hover:border-slate-400' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200'
                        }`}
                      >
                        Clear All
                      </button>
                    </div>
                  </div>

                  {/* 🔥 VIEW TOGGLE BUTTONS */}
                  <div className={`mb-6 p-4 rounded-2xl shadow-lg transition-all duration-300 ${
                    isDark ? 'bg-slate-800/50 border border-slate-700' : 'bg-white/80 border border-orange-100'
                  }`}>
                    <div className="flex items-center justify-between">
                      <h3 className={`text-lg font-bold flex items-center gap-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        📊 Display Options ({filteredHotels.length} hotels)
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setViewMode('cards')}
                          className={`px-4 py-2.5 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300 flex items-center gap-1 ${
                            viewMode === 'cards'
                              ? 'bg-orange-500 text-white shadow-orange-300 hover:shadow-orange-400' 
                              : (isDark 
                                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600' 
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                                )
                          }`}
                        >
                          📱 Cards
                        </button>
                        <button
                          onClick={() => setViewMode('table')}
                          className={`px-4 py-2.5 rounded-xl font-semibold text-sm shadow-lg transition-all duration-300 flex items-center gap-1 ${
                            viewMode === 'table'
                              ? 'bg-orange-500 text-white shadow-orange-300 hover:shadow-orange-400' 
                              : (isDark 
                                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600' 
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                                )
                          }`}
                        >
                          📋 Table
                        </button>
                      </div>
                    </div>
                  </div>

                  
                  {status === 'loading' ? (
                    <div className="col-span-full flex items-center justify-center py-20">
                      <div className="text-lg">Loading hotels...</div>
                    </div>
                  ) : filteredHotels.length > 0 ? (
                    viewMode === 'cards' ? (
                      //  CARDS VIEW
                      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredHotels.map((hotel) => (
                          <div key={hotel._id} className="group">
                            <div className={`rounded-2xl shadow-sm hover:shadow-md border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                              isDark 
                                ? 'bg-slate-800/50 hover:shadow-slate-500/30 border-slate-600 hover:border-amber-400/50' 
                                : 'bg-white hover:shadow-md border-gray-100 hover:border-orange-200'
                            }`}>
                              <HotelCard hotel={hotel} />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                     
                      <div className={`rounded-3xl shadow-2xl border overflow-hidden transition-all duration-300 ${
                        isDark ? 'bg-slate-800/50 border-slate-600' : 'bg-white border-gray-100'
                      }`}>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className={`bg-gradient-to-r ${
                              isDark ? 'from-slate-700 to-slate-600' : 'from-orange-50 to-orange-100'
                            } border-b-2 border-orange-100`}>
                              <tr>
                                <th className={`px-8 py-6 text-left text-sm font-bold uppercase tracking-wider ${
                                  isDark ? 'text-slate-200' : 'text-gray-700'
                                }`}>
                                  Hotel Details
                                </th>
                                <th className={`px-8 py-6 text-left text-sm font-bold uppercase tracking-wider ${
                                  isDark ? 'text-slate-200' : 'text-gray-700'
                                }`}>
                                  Location
                                </th>
                                <th className={`px-8 py-6 text-right text-sm font-bold uppercase tracking-wider ${
                                  isDark ? 'text-slate-200' : 'text-gray-700'
                                }`}>
                                  Price
                                </th>
                                <th className={`px-8 py-6 text-left text-sm font-bold uppercase tracking-wider ${
                                  isDark ? 'text-slate-200' : 'text-gray-700'
                                }`}>
                                  Rating
                                </th>
                               
                              </tr>
                              
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {filteredHotels.map((hotel) => (
                                <tr key={hotel._id} className={`hover:bg-orange-50 transition-all duration-200 ${
                                  isDark ? 'hover:bg-slate-700/50' : ''
                                }`}>
                                  <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                      <img 
                                        src={hotel.image } 
                                        alt={hotel.name}
                                        className="w-16 h-16 rounded-2xl object-cover shadow-lg"
                                      />
                                      <div>
                                        <div className={`font-bold text-lg ${
                                          isDark ? 'text-white' : 'text-gray-900'
                                        }`}>
                                          {hotel.name}
                                        </div>
                                        <div className={`text-sm ${
                                          isDark ? 'text-slate-400' : 'text-gray-500'
                                        }`}>
                                          {hotel.city}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className={`px-8 py-6 text-sm font-semibold ${
                                    isDark ? 'text-slate-200' : 'text-gray-900'
                                  }`}>
                                    {hotel.city}
                                  </td>
                                  <td className="px-8 py-6 text-right">
                                    <div className="text-2xl font-black text-orange-600">₹{hotel.price}</div>
                                    <div className={`text-xs ${
                                      isDark ? 'text-slate-400' : 'text-gray-500'
                                    }`}>
                                      per night
                                    </div>
                                  </td>
                                  <td className="px-8 py-6">
                                    <div className="flex items-center gap-1 text-yellow-400 text-lg font-semibold">
                                      ⭐ {hotel.rating }
                                    </div>
                                   
                                  </td>
                                  
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                    )
                  ) : (
                    <div className={`col-span-full flex flex-col items-center justify-center py-20 text-center rounded-2xl border-2 border-dashed transition-all duration-300 ${
                      isDark ? 'bg-slate-800/30 border-slate-500' : 'bg-white/50 border-gray-200'
                    }`}>
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 ${
                        isDark ? 'bg-slate-700/50' : 'bg-orange-100'
                      }`}>
                        <span className="text-3xl">🏨</span>
                      </div>
                      <h3 className={`text-xl font-semibold mb-2 transition-all duration-300 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        No hotels found
                      </h3>
                      <p className={`text-gray-600 mb-6 max-w-md transition-all duration-300 ${
                        isDark ? 'text-slate-400' : ''
                      }`}>
                        Try different search terms or adjust your filters
                      </p>
                      <button
                        onClick={handleClearFilters}
                        className="px-6 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-all duration-200"
                      >
                        Show All Hotels
                      </button>
                    </div>
                  )}

                  {filteredHotels.length > 0 && (
                    <div className={`mt-8 pt-6 border-t text-center transition-all duration-300 ${
                      isDark ? 'border-slate-600' : 'border-gray-200'
                    }`}>
                      <div className={`flex flex-wrap items-center justify-center gap-6 text-sm transition-all duration-300 ${
                        isDark ? 'text-slate-400' : 'text-gray-600'
                      }`}>
                        <span>🛡️ Safe & Clean Hotels</span>
                        <span>✅ Free Cancellation</span>
                        <span>📱 Instant Booking</span>
                        <span className={`font-semibold ${
                          isDark ? 'text-amber-400' : 'text-orange-600'
                        }`}>
                          Showing {filteredHotels.length} hotels
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </ProtectedRoute>
            }
          />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
        </Routes>
        <ChatBot />
      </div>
    </Router>
    
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
