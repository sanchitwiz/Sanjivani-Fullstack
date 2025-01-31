import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import { FaChevronRight, FaHospital } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const HospitalLogin = ({setAdminSharedEmail}) => {
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
      const response = await axios.get(`${baseURL}/admin/${email}`);
      console.log("yaha tk aarah h", response);
      
      const admin = response.data;

      if (admin && admin.password === password) {
        console.log('Login successful:', admin);
        setAdminSharedEmail(email);
        localStorage.setItem('adminSharedEmail', email);
        console.log('adminSharedEmail stored in localStorage:', localStorage.getItem('adminSharedEmail'));
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('An error occurred while trying to log in yaha.');
        console.error(err);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 p-4">
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        {/* Close Button */}
        <Link to="/" className="absolute top-4 right-4 text-red-600 hover:text-red-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>

        <div className="text-center mb-8">
          <div className="inline-block bg-red-100 p-4 rounded-full mb-4">
            <FaHospital className="w-12 h-12 text-red-600" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-red-700">Hospital Portal</h2>
          <p className="text-red-600 mt-2">Manage your medical facility's services</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-red-700 text-sm font-medium mb-1">
              Hospital Email
            </label>
            <input
              type="email"
              className="w-full p-3 border-2 border-red-100 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
              placeholder="admin@hospital.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-red-700 text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 border-2 border-red-100 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all pr-12"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <span>Access Portal</span>
                <FaChevronRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center pt-4">
            <p className="text-red-600 text-sm">
              Need help?{' '}
              <a href="mailto:support@sanjivani.com" className="font-semibold hover:text-red-800">
                Contact Support
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HospitalLogin;