import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { FaAmbulance, FaTimes, FaMapMarkerAlt, FaClock, FaHospital } from 'react-icons/fa';
import { MdLocalHospital, MdEmergency } from 'react-icons/md';
import image from './assets/aiims_delhi.png'

const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
const socket = io(`${baseURL}`);

const HospitalCard = ({ hospital, isLoggedIn, adminSharedEmail }) => {
  const [showAmbulance, setShowAmbulance] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [ambulanceId, setAmbulanceId] = useState(null);
  const [clientName, setClientName] = useState('');
  // const [isHovered, setIsHovered] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    socket.on('ambulanceAssigned', (data) => {
      setAmbulanceId(data.ambulanceId);
      setBookingDetails(prev => ({
        ...prev,
        trackingLink: `${baseURL}/ambulance/${data.ambulanceId}/track`,
      }));
    });

    return () => socket.off('ambulanceAssigned');
  }, [adminSharedEmail]);

  const bookAmbulance = async () => {
    if (!clientName.trim()) {
      alert('Please enter your name before booking.');
      return;
    }

    try {
      const storedAdminEmail = localStorage.getItem('adminSharedEmail');
      await axios.post(`${baseURL}/ambulance/client/request`, {
        name: clientName,
        hospitalID: hospital._id,
        adminEmail: storedAdminEmail
      });

      setBookingDetails({
        eta: '15 minutes',
        source: 'Your Location',
        destination: hospital.name,
        trackingLink: '',
      });
      setShowAmbulance(true);
    } catch (error) {
      console.error('Booking error:', error);
      alert(error.response?.data?.message || 'Failed to book ambulance');
    }
  };

  useEffect(() => {
    const loadImage = async () => {
      try {
        // First try: Check if image exists in local assets
        // const localImage = await import(`./assets/hospitals/${hospital.name.toLowerCase().replace(/\s+/g, '-')}.jpg`);
        setImgSrc(image);
      } catch (error) {
        // Fallback 1: Try Google Places API search
        const googleImage = `https://source.unsplash.com/featured/400x300/?hospital,${encodeURIComponent(hospital.name)}`;
        
        // Verify if image actually loads
        const img = new Image();
        img.src = googleImage;
        img.onload = () => setImgSrc(googleImage);
        img.onerror = () => {
          // Final fallback: Text-based placeholder
          setImgSrc(`https://placehold.co/400x300/ffffff/DC2626?text=${encodeURIComponent(hospital.name.substring(0, 30))}`);
        };
      }
    };

    loadImage();
  }, [hospital.name]);

  return (
    <div className="relative w-full p-2">
      <div 
        className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hospital Image */}
        <div className="relative h-56 bg-gray-100">
          <img
            src={imgSrc || `https://placehold.co/400x300?text=${encodeURIComponent(hospital.name)}`}
            alt={hospital.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <h2 className="text-xl font-bold text-white truncate">{hospital.name}</h2>
            <p className="text-red-200 flex items-center mt-1">
              <MdLocalHospital className="mr-2 text-lg" />
              {hospital.bedsAvailable} Beds Available
            </p>
          </div>
        </div>

        {/* Always Visible Desktop Content */}
        <div className="hidden md:block p-4">
          <h3 className="text-lg font-bold mb-3 flex items-center text-red-600">
            <MdEmergency className="mr-2" />
            Key Services
          </h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {hospital.services.slice(0, 4).map((service) => (
              <div
                key={service._id}
                className="text-sm bg-red-50 text-red-700 p-2 rounded-lg truncate"
              >
                {service.name}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter full name for ambulance request"
              className="w-full p-2 border border-red-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={bookAmbulance}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <FaAmbulance />
              Request Emergency Ambulance
            </button>
          </div>
        </div>

        {/* Hover Overlay for Additional Services */}
        {/* {isHovered && (
          <div className="hidden md:flex absolute inset-0 bg-black/90 text-white p-4 flex-col">
            <h3 className="text-lg font-bold mb-3 flex items-center">
              <MdEmergency className="mr-2 text-red-400" />
              All Services
            </h3>
            <ul className="flex-1 space-y-2 overflow-y-auto">
              {hospital.services.map((service) => (
                <li 
                  key={service._id}
                  className="flex items-center p-2 bg-white/5 rounded-lg"
                >
                  <span className="text-red-400 mr-2">•</span>
                  {service.name}
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </div>

      {/* Booking Modal */}
      {showAmbulance && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-red-600 text-white p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FaAmbulance />
                Ambulance Dispatch
              </h2>
              <button 
                onClick={() => setShowAmbulance(false)}
                className="hover:text-red-200"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <FaClock className="text-red-600 text-xl" />
                <div>
                  <p className="font-semibold">Estimated Arrival Time</p>
                  <p>{bookingDetails.eta}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-red-600 text-xl" />
                <div>
                  <p className="font-semibold">Destination</p>
                  <p>{hospital.name}</p>
                </div>
              </div>

              {ambulanceId && (
                <a
                  href={bookingDetails.trackingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full bg-red-50 text-red-700 p-3 rounded-lg hover:bg-red-100 transition-colors items-center justify-center gap-2"
                >
                  <FaMapMarkerAlt />
                  Track Ambulance in Real-Time
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalCard;