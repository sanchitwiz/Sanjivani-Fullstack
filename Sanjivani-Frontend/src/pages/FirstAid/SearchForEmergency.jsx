import React, { useState } from 'react';
import { FaSearch, FaCamera } from 'react-icons/fa';
import FirstAidModal from './FirstAidModal';
import CameraModal from './CameraModal';

const SearchForEmergency = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFirstAidModal, setShowFirstAidModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [imageResult, setImageResult] = useState(''); // State to hold the result from CameraModal

  // Handle search by text
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowFirstAidModal(true); // Open FirstAidModal when search is triggered
    }
  };

  // Handle opening the camera modal
  const handleCameraClick = () => {
    setShowCameraModal(true); // Open CameraModal
  };

  // Close First Aid Modal
  const closeFirstAidModal = () => {
    setShowFirstAidModal(false);
  };

  // Close Camera Modal
  const closeCameraModal = () => {
    setShowCameraModal(false);
  };

  // Triggered after capturing an image, it sets the image result as a query
  const handleCameraSearch = () => {
    setShowCameraModal(false); // Close the camera modal
    setShowFirstAidModal(true); // Open the first aid modal with the image result
  };

  return (
    <div className="flex flex-col items-center justify-center h-[50vh] mb-24 bg-red-50">
      <h1 className="text-4xl font-bold mb-10 text-red-700 font-serif">Emergency First Aid Assistance</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex w-full max-w-2xl shadow-lg">
        <input
          type="text"
          placeholder="Describe your emergency (e.g., 'bleeding', 'burn')"
          className="w-full p-4 rounded-l-xl border-2 border-red-300 outline-none focus:border-red-500 transition-colors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-red-500 text-white p-4 rounded-r-xl hover:bg-red-600 transition-all flex items-center gap-2"
        >
          <FaSearch className="w-5 h-5" />
          <span>Search</span>
        </button>
      </form>

      {/* Camera Option */}
      <button
        onClick={handleCameraClick}
        className="mt-8 flex items-center bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl hover:from-white hover:to-white hover:text-red-600 hover:border-2 hover:border-red-500 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <FaCamera className="mr-3 w-5 h-5" /> 
        Scan Emergency with Camera
      </button>

      {/* First Aid Modal */}
      {showFirstAidModal && (
        <FirstAidModal 
          query={searchQuery || imageResult}
          onClose={closeFirstAidModal} 
          imageResult={imageResult}
        />
      )}

      {/* Camera Modal */}
      {showCameraModal && (
        <CameraModal 
          onClose={closeCameraModal} 
          onSearch={handleCameraSearch}
          setImageResult={setImageResult}
        />
      )}
    </div>
  );
};

export default SearchForEmergency;
