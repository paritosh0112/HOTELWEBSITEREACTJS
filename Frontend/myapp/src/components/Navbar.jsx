import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
  // ✅ FIXED: HOOK IMPORT

const Navbar = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const { isDark } = useDarkMode();  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <nav className={`shadow-sm border-b sticky top-0 z-50 transition-all duration-300 ${
      isDark 
        ? 'bg-slate-900/95 backdrop-blur-sm border-slate-700 text-white' 
        : 'bg-white/95 backdrop-blur-sm border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/")}>
            <div className="relative">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-br from-amber-500 to-orange-500' 
                  : 'bg-gradient-to-br from-orange-500 to-orange-600'
              }`}>
                <span className="text-white font-bold text-sm">PP</span>
              </div>
              <div className={`absolute -inset-1 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping ${
                isDark ? 'bg-gradient-to-r from-amber-400 to-orange-400' : 'bg-gradient-to-r from-orange-400 to-orange-500'
              }`} />
            </div>
            <div>
              <h1 className={`text-2xl font-black tracking-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Hotels
              </h1>
              <span className={`text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                isDark 
                  ? 'bg-amber-500/20 text-amber-300' 
                  : 'bg-orange-100 text-orange-600'
              }`}>
                Super Chain
              </span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 lg:gap-4">
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-2xl hover:shadow-md transition-all duration-200 ${
                isDark 
                  ? 'text-slate-300 hover:bg-slate-700 hover:text-white' 
                  : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
              }`}
              title={isDark ? "Switch to Light" : "Switch to Dark"}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Quick Actions */}
            

            {/* Notifications */}
            {/* <button className={`relative p-2.5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 group ${
              isDark 
                ? 'text-slate-300 hover:text-white hover:bg-slate-700' 
                : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform duration-200">
                3
              </div>
            </button> */}

            {/* User Menu */}
            {currentUser ? (
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="hidden lg:flex flex-col items-end">
                  <p className={`text-sm font-bold truncate max-w-[140px] ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Hi, {currentUser.name}
                  </p>
                  <p className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    isDark 
                      ? 'text-emerald-400 bg-emerald-500/20' 
                      : 'text-emerald-600 bg-emerald-100'
                  }`}>
                    Premier Member
                  </p>
                </div>
                <div className="relative group">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200 ${
                    isDark 
                      ? 'bg-gradient-to-br from-amber-500 to-orange-500' 
                      : 'bg-gradient-to-br from-orange-500 to-orange-600'
                  }`}>
                    <span className="text-white font-bold text-sm">
                      {currentUser.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  {/* User Dropdown */}
                  <div className={`absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${
                    isDark ? 'bg-slate-800/95 border-slate-700' : ''
                  }`}>
                    <div className={`p-4 border-b transition-all duration-200 ${
                      isDark ? 'border-slate-700 bg-slate-800/50' : 'border-gray-100'
                    }`}>
                      <p className={`font-semibold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {currentUser.name}
                      </p>
                      <p className={`text-sm ${
                        isDark ? 'text-slate-400' : 'text-gray-500'
                      }`}>
                        Premier Member
                      </p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/my-bookings"
                        className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-orange-50 transition-colors block ${
                          isDark 
                            ? 'text-slate-200 hover:bg-slate-700/50 hover:text-white' 
                            : 'text-gray-700'
                        }`}
                      >
                        📋 My Bookings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors ${
                          isDark 
                            ? 'text-red-400 hover:bg-slate-700/50 hover:text-red-300' 
                            : 'text-red-600 hover:bg-red-50'
                        }`}
                      >
                        🚪 Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 lg:gap-3">
                <Link
                  to="/login"
                  className={`px-4 py-2.5 text-sm font-semibold rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap ${
                    isDark 
                      ? 'text-slate-200 border-slate-600 hover:border-slate-500 hover:bg-slate-700 hover:text-white' 
                      : 'text-gray-700 border-gray-200 hover:border-orange-200 hover:bg-orange-50'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`px-6 py-2.5 text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap ${
                    isDark 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' 
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                  }`}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className={`md:hidden backdrop-blur-sm border-t shadow-sm transition-all duration-300 ${
        isDark ? 'bg-slate-900/95 border-slate-700' : 'bg-white/95 border-gray-100'
      }`}>
        <div className="flex justify-around py-3 px-2">
          <button className={`flex flex-col items-center text-xs p-2 rounded-2xl transition-all duration-200 ${
            isDark 
              ? 'text-slate-400 hover:text-white hover:bg-slate-700' 
              : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
          }`}>
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </button>
          <button className={`flex flex-col items-center text-xs font-semibold p-3 rounded-2xl shadow-lg transition-all duration-200 ${
            isDark 
              ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30' 
              : 'text-orange-600 bg-gradient-to-r from-orange-500/10 to-orange-400/10 shadow-orange-200/50'
          }`}>
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Hotels
          </button>
          <button className={`flex flex-col items-center text-xs p-2 rounded-2xl transition-all duration-200 ${
            isDark 
              ? 'text-slate-400 hover:text-white hover:bg-slate-700' 
              : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
          }`}>
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </button>
          <button className={`flex flex-col items-center text-xs p-2 rounded-2xl transition-all duration-200 ${
            isDark 
              ? 'text-slate-400 hover:text-white hover:bg-slate-700' 
              : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
          }`}>
            <div className={`w-6 h-6 mb-1 rounded-xl flex items-center justify-center ${
              isDark ? 'bg-amber-500' : 'bg-orange-500'
            }`}>
              <span className="text-white text-xs font-bold">M</span>
            </div>
            More
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
