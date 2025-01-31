import React from 'react';

const DoctorList = ({ doctors, availableDoctors, onToggle }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-[#bc181d] border-2 mt-4">
      <h3 className="text-lg font-semibold mb-4">All Doctors</h3>
      {doctors.map((doctor) => (
        <div key={doctor._id} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={doctor._id}
            checked={availableDoctors.includes(doctor.name)}
            onChange={() => onToggle(doctor.name)}
            className="mr-2"
          />
          <label htmlFor={doctor._id}>{doctor.name} - {doctor.specialty}</label>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;