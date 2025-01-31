import React, { useEffect, useRef, useState } from 'react';

const AddFacilitiesModal = ({ isOpen, onClose, onSave, facilities }) => {
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const modalRef = useRef(null); // Create a ref for the modal

  const handleCheckboxChange = (facility) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  const handleSubmit = () => {
    onSave(selectedFacilities);
    onClose();
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  // Use useEffect to handle clicks outside the modal
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 overflow-hidden">
        <div
          ref={modalRef}
          className="bg-white w-1/2 rounded-lg p-4 shadow-lg overflow-auto"
        >
          <h2 className="text-xl font-semibold mb-4">Select Facilities</h2>
          <div className="flex flex-col space-y-2 max-h-48 overflow-y-auto">
            {facilities.map((facility) => (
              <label
                key={facility}
                className="flex items-center hover:text-[#bc181d] transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedFacilities.includes(facility)}
                  onChange={() => handleCheckboxChange(facility)}
                  className="mr-2"
                />
                {facility}
              </label>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="mr-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-[#bc181d] text-white px-4 py-2 rounded transition-all duration-300 hover:bg-red-600"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddFacilitiesModal;
