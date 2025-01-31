import React from 'react';

const FacilityList = ({ facilities, availableFacilities, onToggle }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-[#bc181d] border-2 mt-4">
      <h3 className="text-lg font-semibold mb-4">All Facilities</h3>
      {facilities.map((facility) => (
        <div key={facility} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={facility}
            checked={availableFacilities.includes(facility)}
            onChange={() => onToggle(facility)}
            className="mr-2"
          />
          <label htmlFor={facility}>{facility}</label>
        </div>
      ))}
    </div>
  );
};

export default FacilityList;