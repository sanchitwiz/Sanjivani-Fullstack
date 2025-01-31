import React, { useState } from 'react';
import AddFacilitiesModal from '../AddFacilitiesModal';

const DoctorsSection = ({ doctors }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveDoctors = (selectedDoctors) => {
        // This function should be implemented to update the doctors in the backend
        console.log('Selected doctors:', selectedDoctors);
        handleCloseModal();
    };

    return (
        <div className="my-1">
            <div className="bg-white text-black p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Doctors Present Today</h3>
                {doctors && doctors.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {doctors.map((doctor, index) => (
                            <li key={index} className="hover:text-[#bc181d] transition-colors">
                                {doctor.name} - {doctor.specialty}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No doctors present today.</p>
                )}
                <button 
                    className="mt-8 bg-[#bc181d] text-white px-4 rounded-md py-2 transition-all duration-300 hover:bg-white hover:text-[#bc181d] hover:border-[#bc181d] border-2"
                    onClick={handleOpenModal}
                >
                    Add Doctor
                </button>
            </div>

            <AddFacilitiesModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onSave={handleSaveDoctors} 
                facilities={doctors.map(d => d.name)}
            />
        </div>
    );
};

export default DoctorsSection;