import React from 'react';

const AmbulanceTrackerModal = ({ ambulanceId, onClose }) => {
  const ambulanceLink = `http://localhost:5001/ambulance/${ambulanceId}/rider`;

  // Function to copy the link to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(ambulanceLink);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Ambulance Tracker</h3>
        <p className="mb-4">Copy the link below to track the ambulance:</p>
        <div className="bg-gray-100 p-2 rounded mb-4">{ambulanceLink}</div>
        <button 
          className="bg-[#bc181d] text-white px-4 rounded-md py-2 transition-all duration-300 hover:bg-white hover:text-[#bc181d] hover:border-[#bc181d] border-2"
          onClick={copyToClipboard}
        >
          Copy Link
        </button>
        <button 
          className="mt-4 ml-3 bg-gray-400 text-white px-4 rounded-md py-2 transition-all duration-300 hover:bg-white hover:text-gray-400 hover:border-gray-400 border-2"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AmbulanceTrackerModal;
