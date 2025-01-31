import React, { useState, useEffect } from 'react';
import { MdArrowBack, MdSearch, MdWarning } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HospitalCard from './HospitalCards';
import { FaHospital, FaHeartbeat } from 'react-icons/fa';

const HospitalList = ({ isLoggedIn, adminSharedEmail }) => {
  const [search, setSearch] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get('http://localhost:5001/hospital');
        setHospitals(response.data);
      } catch (err) {
        setError('Failed to fetch hospital data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const filteredHospitals = hospitals
    .filter(hospital => 
      hospital.name.toLowerCase().includes(search.toLowerCase()) ||
      hospital.specialities.some(s => s.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="hover:text-red-200 flex items-center">
            <MdArrowBack className="mr-2 text-xl" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
          <h1 className="text-2xl font-serif font-bold flex items-center">
            <FaHospital className="mr-3" />
            Medical Facilities Directory
          </h1>
          <div className="w-32 flex justify-end">
            <FaHeartbeat className="text-2xl" />
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MdSearch className="text-red-500 text-2xl" />
          </div>
          <input
            type="text"
            placeholder="Search hospitals by name or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-red-100 rounded-xl shadow-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-red-600">Loading medical facilities...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 p-6 rounded-xl text-red-700 text-center">
            <MdWarning className="text-3xl mx-auto mb-3" />
            {error}
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredHospitals.length > 0 ? (
              filteredHospitals.map((hospital) => (
                <div key={hospital._id} className="w-full p-2">
                  <HospitalCard 
                    hospital={hospital} 
                    isLoggedIn={isLoggedIn} 
                    adminSharedEmail={adminSharedEmail}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <MdWarning className="text-4xl text-red-500 mx-auto mb-4" />
                <p className="text-xl text-red-600">No matching hospitals found</p>
                <p className="text-red-500 mt-2">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalList;