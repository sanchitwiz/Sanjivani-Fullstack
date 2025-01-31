import React from 'react';

const DoctorSection = ({ doctors }) => {
  return (
    <div className="bg-white rounded-lg shadow-md text-center border-[#bc181d] border-2">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Doctors Present Today</h3>
        {doctors.length > 0 ? (
          <ul className="list-disc list-inside">
            {doctors.map((doctor, index) => (
              <li key={index} className="hover:text-[#bc181d] transition-colors">
                {doctor}
              </li>
            ))}
          </ul>
        ) : (
          <p>No doctors present today.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorSection;