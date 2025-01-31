import React, { useEffect, useRef, useState } from 'react';

const AddAmbulanceModal = ({ isOpen, onClose, onSave, selectedClient }) => {
  const [ambulanceForms, setAmbulanceForms] = useState([{ ambulanceNumber: '', driverName: '', mobile: '' }]);
  const modalRef = useRef(null);

  const handleInputChange = (index, field, value) => {
    const updatedForms = [...ambulanceForms];
    updatedForms[index][field] = value;
    setAmbulanceForms(updatedForms);
  };

  const addMoreAmbulance = () => {
    setAmbulanceForms([...ambulanceForms, { ambulanceNumber: '', driverName: '', mobile: '' }]);
  };

  const handleSubmit = async () => {
    onSave(ambulanceForms);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 overflow-hidden">
      <div ref={modalRef} className="bg-white w-1/2 rounded-lg p-4 shadow-lg max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Add Ambulances</h2>
        {selectedClient && (
          <p className="mb-4">Assigning ambulance for client: {selectedClient}</p>
        )}
        <div className="flex flex-col space-y-4 overflow-y-auto max-h-[60vh]">
          {ambulanceForms.map((form, index) => (
            <div key={index} className="space-y-2">
              <div>
                <label className="block text-sm font-medium">Ambulance Number</label>
                <input
                  type="text"
                  value={form.ambulanceNumber}
                  onChange={(e) => handleInputChange(index, 'ambulanceNumber', e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Driver Name</label>
                <input
                  type="text"
                  value={form.driverName}
                  onChange={(e) => handleInputChange(index, 'driverName', e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Driver Mobile</label>
                <input
                  type="text"
                  value={form.mobile}
                  onChange={(e) => handleInputChange(index, 'mobile', e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={addMoreAmbulance}
          >
            Add More Ambulance
          </button>
          <div>
            <button
              className="mr-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-[#bc181d] text-white px-4 py-2 rounded transition-all duration-300 hover:scale-110"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAmbulanceModal;