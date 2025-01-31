import React from 'react';
import axios from 'axios';

const DoctorSelection = ({ doctors, availableDoctors, adminEmail, onUpdate }) => {
  const handleDoctorToggle = async (doctorName) => {
    const updatedDoctors = availableDoctors.includes(doctorName)
      ? availableDoctors.filter(name => name !== doctorName)
      : [...availableDoctors, doctorName];

      try {
        const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
        await axios.put(`${baseURL}/admin/${adminEmail}/availableDoctors/update`, {
          availableDoctors: updatedDoctors
        });
        onUpdate(updatedDoctors);
      } catch (error) {
        console.error('Error updating available doctors:', error);
      }      
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-[#bc181d] border-2">
      <h3 className="text-lg font-semibold mb-4">Select Available Doctors</h3>
      {doctors.map((doctor) => (
        <div key={doctor._id} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={doctor._id}
            checked={availableDoctors.includes(doctor.name)}
            onChange={() => handleDoctorToggle(doctor.name)}
            className="mr-2"
          />
          <label htmlFor={doctor._id}>{doctor.name} - {doctor.specialty}</label>
        </div>
      ))}
    </div>
  );
};

export default DoctorSelection;