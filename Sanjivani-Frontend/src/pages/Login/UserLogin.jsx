import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaAmbulance, FaFacebook, FaGoogle, FaHeart } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from 'axios';
import './style.css';

const UserLogin = ({sharedValue, setSharedValue, setSharedEmail}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/user/${email}`);
      const user = response.data;

      if (user && user.password === password) {
        const token = 'your_generated_token'; // This should come from your login logic
        localStorage.setItem('userToken', token);
        localStorage.setItem('adminSharedEmail', email); // Store adminSharedEmail
        navigate('/');
        setSharedValue(true);
        setSharedEmail(email);
        console.log('adminSharedEmail stored:', email); // Log for verification
      } else {
        setErrorMessage('Incorrect password. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('User not found. Please check your email.');
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="relative bg-white rounded-xl shadow-lg max-w-md w-full mx-4 p-8">
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
          <FaAmbulance className="w-12 h-12 text-red-600 mx-auto mb-4 animate-pulse" />
          <h2 className="text-3xl font-serif font-bold text-red-700">Patient Login</h2>
          <p className="text-red-600 mt-2">Access your medical services portal</p>
        </div>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
            {errorMessage}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <input
              type="email"
              className="w-full p-3 border-2 border-red-100 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 border-2 border-red-100 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all font-semibold flex items-center justify-center gap-2"
          >
            Sign In
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>

          <div className="text-center pt-4">
            <Link to="/forgot-password" className="text-red-600 hover:text-red-800 text-sm">
              Forgot Password?
            </Link>
          </div>

          <div className="relative py-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-red-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-red-500">Or continue with</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="w-full flex items-center justify-center gap-2 p-3 border-2 border-red-100 rounded-lg hover:border-red-200 transition-all text-red-600">
              <FaGoogle className="w-5 h-5" />
              <span className="text-sm">Google</span>
            </button>
            <button className="w-full flex items-center justify-center gap-2 p-3 border-2 border-red-100 rounded-lg hover:border-red-200 transition-all text-red-600">
              <FaFacebook className="w-5 h-5" />
              <span className="text-sm">Facebook</span>
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-red-600">
          New to Sanjivani?{' '}
          <Link to="/signup" className="font-semibold hover:text-red-800">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
