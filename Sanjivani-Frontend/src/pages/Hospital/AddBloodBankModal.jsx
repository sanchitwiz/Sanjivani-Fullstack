import React, { useEffect, useRef, useState } from 'react';

const AddBloodBankModal = ({ isOpen, onClose, onSave }) => {
  const [bloodForms, setBloodForms] = useState([{ bloodType: '', bloodGroup: '' }]);
  const modalRef = useRef(null);

  const handleInputChange = (index, field, value) => {
    const updatedForms = [...bloodForms];
    updatedForms[index][field] = value;
    setBloodForms(updatedForms);
  };

  const addMoreBloodType = () => {
    setBloodForms([...bloodForms, { bloodType: '', bloodGroup: '' }]);
  };

  const handleSubmit = () => {
    // Convert blood type and group into single strings like "A+", "B-", etc.
    const combinedBloodForms = bloodForms.map(form => `${form.bloodType}${form.bloodGroup}`);
    onSave(combinedBloodForms); // Pass the array of combined blood types back to the parent
    onClose();
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

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
        <div ref={modalRef} className="bg-white w-1/2 rounded-lg p-4 shadow-lg overflow-auto max-h-[80vh]">
          <h2 className="text-xl font-semibold mb-4">Add Blood Types</h2>
          <div className="flex flex-col space-y-4">
            {bloodForms.map((form, index) => (
              <div key={index} className="space-y-2">
                <div>
                  <label className="block text-sm font-medium">Blood Type</label>
                  <input
                    type="text"
                    value={form.bloodType}
                    onChange={(e) => handleInputChange(index, 'bloodType', e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="e.g., A, B, O, AB"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Blood Group</label>
                  <input
                    type="text"
                    value={form.bloodGroup}
                    onChange={(e) => handleInputChange(index, 'bloodGroup', e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="e.g., +, -"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={addMoreBloodType}
            >
              Add More Blood Type
            </button>
            <div>
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
      </div>
    )
  );
};

export default AddBloodBankModal;
