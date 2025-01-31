import React from 'react';
import { FaUser, FaAmbulance, FaHospitalAlt, FaClock, FaPhoneAlt } from 'react-icons/fa';
import { MdArrowBack } from 'react-icons/md';
import { Link } from 'react-router-dom';

const AmbulanceTracking = () => {
  const driverDetails = {
    name: 'John Doe',
    vehicleNumber: 'AB1234',
    hospitalName: 'City Hospital',
    eta: '15 mins',
  };

  return (
    <div className="bg-gray-100 min-h-screen h-max flex flex-col justify-center items-center p-5">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-[#bc181d] p-4 shadow-lg z-10">
        <div className="flex items-center justify-between mx-auto">
          <Link to="/" className="text-xl font-semibold text-white flex items-center hover:text-gray-300">
            <MdArrowBack className="mr-2" />
            Go Back
          </Link>
          <h1 className="text-2xl font-bold text-white font-sans ">
            Ambulance Tracking
          </h1>
          <Link to="/">
            <h1 className="text-2xl font-bold text-white font-sans hover:text-gray-300">Sanjivani</h1>
          </Link>
        </div>
      </div>

      {/* Main Content with margin to avoid header overlap */}
      <div className="container mt-24 p-2 bg-white shadow-md rounded-lg max-w-5xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <div className="relative bg-gray-200 h-60 lg:h-72 rounded-lg flex justify-center items-center shadow-inner overflow-hidden">
            {/* Simulated loading spinner */}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-white"></div>
            </div>
            <p className="text-lg font-semibold text-gray-200 z-10">Loading Map...</p>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-2xl font-extrabold" style={{ color: '#bc181d' }}>Ambulance Details</h2>

            {/* Detail Cards */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg shadow-sm">
                <FaClock className="text-2xl text-gray-600" />
                <p className="text-base font-semibold"><strong>ETA:</strong> {driverDetails.eta}</p>
              </div>

              <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg shadow-sm">
                <FaUser className="text-2xl text-gray-600" />
                <p className="text-base font-semibold"><strong>Driver:</strong> {driverDetails.name}</p>
              </div>

              <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg shadow-sm">
                <FaAmbulance className="text-2xl text-gray-600" />
                <p className="text-base font-semibold"><strong>Vehicle:</strong> {driverDetails.vehicleNumber}</p>
              </div>

              <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg shadow-sm">
                <FaHospitalAlt className="text-2xl text-gray-600" />
                <p className="text-base font-semibold"><strong>Hospital:</strong> {driverDetails.hospitalName}</p>
              </div>
            </div>

            {/* Contact Button */}
            <button
              className="mt-5 px-5 py-2 flex items-center justify-center space-x-2 text-sm text-white font-semibold rounded-full shadow-lg bg-red-600 hover:bg-white hover:text-[#bc181d] hover:border-[#bc181d] border-2 transition duration-300"
            >
              <FaPhoneAlt className="text-lg" />
              <span>Contact Driver</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceTracking;
