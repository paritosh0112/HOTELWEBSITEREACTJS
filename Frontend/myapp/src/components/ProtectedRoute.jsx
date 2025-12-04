import React from "react";
import { Link } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";

const ProtectedRoute = ({ children }) => {
  const { isDark } = useDarkMode();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-8 transition-all duration-300 ${
        isDark 
          ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white' 
          : 'bg-gradient-to-b from-orange-50 via-white to-slate-50 text-gray-900'
      }`}>
        <div className="max-w-md w-full space-y-8 text-center">
          {/* Lock Icon */}
          <div className={`w-28 h-28 mx-auto mb-8 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-sm transition-all duration-300 ${
            isDark 
              ? 'bg-slate-800/50 border-4 border-slate-600 shadow-slate-500/25' 
              : 'bg-white/80 border-4 border-orange-200 shadow-orange-200/50'
          }`}>
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl ${
              isDark 
                ? 'bg-gradient-to-br from-slate-700 to-slate-600' 
                : 'bg-gradient-to-br from-orange-500 to-orange-600'
            }`}>
              <span className="text-4xl">🔒</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className={`text-3xl md:text-4xl font-black tracking-tight ${
              isDark ? 'text-white drop-shadow-2xl' : 'text-gray-900'
            }`}>
              Please Sign In
            </h1>
            <p className={`text-lg md:text-xl font-semibold ${
              isDark ? 'text-slate-300' : 'text-gray-600'
            }`}>
              Access your saved hotels, bookings & favorites
            </p>
          </div>

          {/* Quick Stats */}
          <div className={`grid grid-cols-3 gap-4 p-6 rounded-3xl shadow-xl mb-8 ${
            isDark 
              ? 'bg-slate-800/50 border border-slate-700 backdrop-blur-sm' 
              : 'bg-white/80 border border-orange-100 shadow-orange-100/50'
          }`}>
            <div>
              <div className={`text-2xl font-black ${
                isDark ? 'text-amber-400' : 'text-orange-600'
              }`}>
                🏨
              </div>
              <p className={`text-xs font-semibold ${
                isDark ? 'text-slate-400' : 'text-gray-500'
              }`}>
                Hotels
              </p>
            </div>
            <div>
              <div className={`text-2xl font-black ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                📋
              </div>
              <p className={`text-xs font-semibold ${
                isDark ? 'text-slate-400' : 'text-gray-500'
              }`}>
                Bookings
              </p>
            </div>
            <div>
              <div className={`text-2xl font-black ${
                isDark ? 'text-pink-400' : 'text-pink-600'
              }`}>
                ❤️
              </div>
              <p className={`text-xs font-semibold ${
                isDark ? 'text-slate-400' : 'text-gray-500'
              }`}>
                Favorites
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            to="/login"
            className={`block w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black py-4 px-8 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 text-lg tracking-wide uppercase`}
          >
            🔑 Sign In Now
          </Link>

          {/* Alternative Option */}
          <div className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
            isDark 
              ? 'bg-slate-800/30 border-slate-700 hover:border-slate-500 hover:bg-slate-700/20' 
              : 'bg-white/50 border-orange-100 hover:border-orange-200 hover:bg-orange-50'
          }`}>
            <p className={`text-sm ${
              isDark ? 'text-slate-400' : 'text-gray-600'
            }`}>
              New to PP Hotels?{' '}
              <Link 
                to="/signup" 
                className={`font-semibold underline hover:no-underline transition-all ${
                  isDark ? 'text-amber-400 hover:text-amber-300' : 'text-orange-600 hover:text-orange-500'
                }`}
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-orange-400/10 to-orange-500/10 rounded-full blur-xl animate-pulse opacity-60 hidden lg:block" />
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-pink-400/10 to-rose-500/10 rounded-full blur-2xl animate-pulse opacity-50 hidden lg:block" />
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
