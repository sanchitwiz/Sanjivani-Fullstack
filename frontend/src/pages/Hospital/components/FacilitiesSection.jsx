import React, { useState } from 'react';
import AddFacilitiesModal from '../AddFacilitiesModal';

const FacilitiesSection = ({ facilities }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveFacilities = (selectedFacilities) => {
        // This function should be implemented to update the facilities in the backend
        console.log('Selected facilities:', selectedFacilities);
        handleCloseModal();
    };

    return (
        <div className="my-1">
            <div className="bg-white text-black p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Facilities Available Today</h3>
                {facilities && facilities.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {facilities.map((facility, index) => (
                            <li key={index} className="hover:text-[#bc181d] transition-colors">
                                {facility.name}
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
                facilities={facilities.map(f => f.name)}
            />
        </div>
    );
};

export default FacilitiesSection;