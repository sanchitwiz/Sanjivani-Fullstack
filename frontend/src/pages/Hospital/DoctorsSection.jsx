import React, { useState } from 'react';
import AddFacilitiesModal from './AddFacilitiesModal';

const DoctorsSection = ({doctorsList}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveDoctors = (selectedDoctors) => {
    setAvailableDoctors(selectedDoctors);
    handleCloseModal();
  };

  // Sample list of doctors that can be selected


  return (
    <div className="my-1">
      <div className="bg-white text-black p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Doctors Present Today</h3>
        
        {availableDoctors.length > 0 ? (
          <ul className="list-disc list-inside">
            {availableDoctors.map((doctor, index) => (
              <li key={index} className="hover:text-[#bc181d] transition-colors">
                {doctor}
              </li>
            ))}
          </ul>
        ) : (
          <p>No doctors present today.</p>
        )}

        <button 
          className="mt-[58px] bg-[#bc181d] text-white px-4 rounded-md py-2 transition-all duration-300 hover:bg-white hover:text-[#bc181d] hover:border-[#bc181d] border-2"
          onClick={handleOpenModal}
        >
          Add Doctor
        </button>
      </div>

      <AddFacilitiesModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveDoctors} 
        facilities={doctorsList} // Using the doctors list as options
      />
    </div>
  );
};

export default DoctorsSection;
