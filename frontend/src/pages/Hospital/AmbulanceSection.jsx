import React, { useState } from 'react';
import AmbulanceTrackerModal from './AmbulaceTrackerModal';
// import AmbulanceTrackerModal from './AmbulanceTrackerModal';

const AmbulanceSection = ({ adminSharedEmail, onOpenModal, clientRequests, onClientSelect, ambulances }) => {
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);

  // Function to open the tracker modal
  const onAmbulanceClick = (ambulance) => {
    setSelectedAmbulance(ambulance); // Set the selected ambulance
  };

  // Function to close the tracker modal
  const closeModal = () => {
    setSelectedAmbulance(null); // Clear the selected ambulance
  };

  return (
    <div className="my-1">
      <div className="bg-white text-black p-4 rounded-lg border-[#bc181d] border-2">
        <h3 className="text-lg font-semibold mb-2">Ambulances Available</h3>
        {ambulances.length > 0 ? (
          <ul className="list-disc list-inside">
            {ambulances.map((ambulance, index) => (
              <li
                key={ambulance._id}
                className="hover:text-[#bc181d] transition-colors cursor-pointer"
                onClick={() => onAmbulanceClick(ambulance)} // Handle click on ambulance
              >
                Ambulance {index + 1}: {ambulance.number} <br /> Driver: {ambulance.driverName} <br /> Mobile: {ambulance.mobile}
              </li>
            ))}
          </ul>
        ) : (
          <p>No ambulances available today.</p>
        )}
        <h3 className="text-lg font-semibold mt-4 mb-2">Client Requests</h3>
        {clientRequests.length > 0 ? (
          <ul className="list-disc list-inside">
            {clientRequests.map((client, index) => (
              <li 
                key={index} 
                className="hover:text-[#bc181d] transition-colors cursor-pointer"
                onClick={() => onClientSelect(client)}
              >
                {client}
              </li>
            ))}
          </ul>
        ) : (
          <p>No client requests at the moment.</p>
        )}
        <button 
          className="mt-8 bg-[#bc181d] text-white px-4 rounded-md py-2 transition-all duration-300 hover:bg-white hover:text-[#bc181d] hover:border-[#bc181d] border-2"
          onClick={onOpenModal}
        >
          Add Ambulance
        </button>

        {/* Ambulance Tracker Modal */}
        {selectedAmbulance && (
          <AmbulanceTrackerModal
            ambulanceId={selectedAmbulance._id}
            onClose={closeModal} // Close the modal
          />
        )}
      </div>
    </div>
  );
};

export default AmbulanceSection;
