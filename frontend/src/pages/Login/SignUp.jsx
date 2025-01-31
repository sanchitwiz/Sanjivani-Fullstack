import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
      const response = await axios.post(`${baseURL}/user/new`, {
        username: name,
        email,
        phoneNumber,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('userToken', token);
      navigate('/user-login');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Sign up failed. Please try again.');
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
          <FaHeart className="w-12 h-12 text-red-600 mx-auto mb-4 animate-pulse" />
          <h2 className="text-3xl font-serif font-bold text-red-700">Patient Registration</h2>
          <p className="text-red-600 mt-2">Create your medical services account</p>
        </div>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
            {errorMessage}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-3 border-2 border-red-100 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="tel"
            className="w-full p-3 border-2 border-red-100 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <input
            type="email"
            className="w-full p-3 border-2 border-red-100 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

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
            onClick={handleSignUp}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all font-semibold"
          >
            Create Account
          </button>

          <div className="text-center pt-4">
            <p className="text-red-600 text-sm">
              Already have an account?{' '}
              <Link to="/user-login" className="font-semibold hover:text-red-800">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;