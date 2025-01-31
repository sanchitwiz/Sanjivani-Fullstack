import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const ForgotPassword = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCountdown]);

  const handleSendOtp = () => {
    setOtpSent(true);
    setResendCountdown(60); // Start a 1-minute timer for resend
  };

  const handleResendOtp = () => {
    if (resendCountdown === 0) {
      setResendCountdown(60); // Reset the timer to 1 minute
    }
  };

  const handleVerifyOtp = () => {
    // OTP verification logic here
    console.log(`Verifying OTP: ${otp}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-lg w-[70%] h-[400px] p-6 md:p-0">
        {/* Left Section: Form */}
        <div className="flex flex-col mr-24 md:p-12 w-full md:w-3/4">
          <h2 className="font-mono mb-3 text-2xl font-bold">Forgot Password</h2>
          <p className="mb-6 font-sans font-light text-[#bc181d] text-sm">
            Enter your email to receive an OTP and reset your password.
          </p>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {otpSent && (
            <input
              type="text"
              className="w-full p-3 mt-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
              placeholder="Enter the OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          )}
          <div className="flex justify-between items-center mt-4">
            <Link to="/user-login" className="text-sm text-[#bc181d]">Back to login</Link>
            {otpSent ? (
              <>
                <button
                  onClick={handleResendOtp}
                  className="flex justify-center items-center p-3 space-x-2 font-sans font-bold text-white rounded-md px-6 bg-[#bc181d] hover:bg-white hover:text-[#bc181d] hover:border-[#bc181d] shadow-blue-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border-2 transition hover:-translate-y-0.5 duration-150 text-sm"
                  disabled={resendCountdown > 0}
                >
                  {resendCountdown > 0 ? `Send Again (${resendCountdown}s)` : 'Send Again'}
                </button>
                <button
                  onClick={handleVerifyOtp}
                  className="flex justify-center items-center p-3 space-x-2 font-sans font-bold text-white rounded-md px-6 bg-green-600 hover:bg-green-700 shadow-sm hover:shadow-lg border-2 transition hover:-translate-y-0.5 duration-150 text-sm"
                >
                  Verify OTP
                </button>
              </>
            ) : (
              <button
                onClick={handleSendOtp}
                className="flex justify-center items-center p-3 space-x-2 font-sans font-bold text-white rounded-md px-6 bg-[#bc181d] hover:bg-white hover:text-[#bc181d] hover:border-[#bc181d] shadow-blue-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border-2 transition hover:-translate-y-0.5 duration-150 text-sm"
              >
                Send OTP
              </button>
            )}
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="hidden md:flex md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1666361759686-ce64c9e1d1b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="Forgot Password Illustration"
            className="w-full h-full object-cover rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
