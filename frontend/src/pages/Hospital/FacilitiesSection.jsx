import React, { useState } from 'react';
import AddFacilitiesModal from './AddFacilitiesModal';

const FacilitiesSection = ({facilities}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableFacilities, setAvailableFacilities] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveFacilities = (selectedFacilities) => {
    setAvailableFacilities(selectedFacilities);
  };

  return (
    <div className="my-1">
      <div className="bg-white text-black p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Facilities Available Today</h3>
        {availableFacilities.length > 0 ? (
          <ul className="list-disc list-inside">
            {availableFacilities.map((facility, index) => (
              <li key={index} className="hover:text-[#bc181d] transition-colors">
                {facility}
              </li>
            ))}
          </ul>
        ) : (
          <p>No facilities available today.</p>
        )}
            <button 
            className="mt-8 bg-[#bc181d] text-white px-4 rounded-md py-2 transition-all duration-300 hover:bg-white hover:text-[#bc181d] hover:border-[#bc181d] border-2"
            onClick={handleOpenModal}
            >
            Add Facility
            </button>
      </div>

      <AddFacilitiesModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveFacilities} 
        facilities={facilities}
    />
    </div>
  );
};

export default FacilitiesSection;
