import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error on input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }
    
    // 🔥 CONSOLE LOG - Login data print
    console.log("🔐 LOGIN DATA:", form);
    
    setIsLoading(true);
    setError("");

    // Simulate API delay
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === form.email && u.password === form.password
      );
      
      console.log("✅ FOUND USER:", user); // 🔥 Console log user data
      
      if (!user) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));
      console.log("💾 CURRENT USER SAVED:", user); // 🔥 Console log saved user
      
      navigate("/");
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 -right-32 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 -left-32 w-64 h-64 bg-orange-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Main card */}
        <div className="relative bg-white/90 backdrop-blur-xl border border-orange-100 rounded-3xl shadow-2xl shadow-orange-200/50 p-8 space-y-6">
          
          {/* Logo/Title */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl mb-6">
              <span className="text-white font-bold text-lg">PP</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              Sign in to continue your journey
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                <p className="text-sm text-red-800 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
                Email Address
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-4 flex items-center text-orange-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full pl-14 pr-4 py-4 rounded-2xl border-2 border-gray-200 bg-white text-lg placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 shadow-sm hover:shadow-md group-hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
                Password
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-4 flex items-center text-orange-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full pl-14 pr-4 py-4 rounded-2xl border-2 border-gray-200 bg-white text-lg placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 shadow-sm hover:shadow-md group-hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black py-5 px-8 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98] disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none disabled:cursor-not-allowed disabled:transform flex items-center justify-center gap-3 group"
            >
              {isLoading ? (
                <>
                  <div className="w-7 h-7 border-3 border-white/30 border-t-orange-300 rounded-full animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  🚀 Sign In
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-6">
            <div className="flex-grow border-t border-gray-200" />
            <span className="px-4 text-sm text-gray-500 font-medium">or</span>
            <div className="flex-grow border-t border-gray-200" />
          </div>

          {/* Sign up link */}
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-orange-600 hover:text-orange-700 transition-colors font-semibold inline-flex items-center gap-1 group"
              >
                Create Account
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </p>
            
            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                100% Secure
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                Instant Login
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
