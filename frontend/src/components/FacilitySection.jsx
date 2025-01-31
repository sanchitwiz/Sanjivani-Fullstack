import React from 'react';

const FacilitySection = ({ facilities }) => {
  return (
    <div className="bg-white rounded-lg shadow-md text-center border-[#bc181d] border-2">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Facilities Available Today</h3>
        {facilities.length > 0 ? (
          <ul className="list-disc list-inside">
            {facilities.map((facility, index) => (
              <li key={index} className="hover:text-[#bc181d] transition-colors">
                {facility}
              </li>
            ))}
          </ul>
        ) : (
          <p>No facilities available today.</p>
        )}
      </div>
    </div>
  );
};

export default FacilitySection;