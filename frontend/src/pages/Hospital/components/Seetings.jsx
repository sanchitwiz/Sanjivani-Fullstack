import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar'; // Assuming Sidebar is in the same folder
import Header from './Header';   // Assuming Header is in the same folder

const Setting = () => {
  const [doctorData, setDoctorData] = useState({
    name: '',
    specialty: '',
    phone: ''
  });
  
  const [facilityData, setFacilityData] = useState({
    name: '',
    address: '',
    type: ''
  });

  const handleDoctorChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleFacilityChange = (e) => {
    setFacilityData({ ...facilityData, [e.target.name]: e.target.value });
  };

  const saveDoctor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/doctor', doctorData);
      alert('Doctor added successfully');
      console.log(response.data);
    } catch (error) {
      console.error('Error saving doctor:', error);
    }
  };

  const saveFacility = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/facility', facilityData);
      alert('Facility added successfully');
      console.log(response.data);
    } catch (error) {
      console.error('Error saving facility:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="main-content w-full">
        <div className="p-4 mx-4">
          <h2 className="text-2xl font-bold mb-4">Settings</h2>

          {/* Add New Doctor Form */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Add New Doctor</h3>
            <form onSubmit={saveDoctor} className="space-y-4">
              <div>
                <label className="block">Doctor Name</label>
                <input
                  type="text"
                  name="name"
                  value={doctorData.name}
                  onChange={handleDoctorChange}
                  className="border p-2 w-1/2 broder-2 border-[#bc181d] rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block">Specialty</label>
                <input
                  type="text"
                  name="specialty"
                  value={doctorData.specialty}
                  onChange={handleDoctorChange}
                  className="border p-2 w-1/2 broder-2 border-[#bc181d] rounded-md"
                  required
                />
              </div>
              <button type="submit" className="bg-[#bc181d] hover:bg-white hover:text-[#bc181d] hover:border-[#bc181d] border-2 rounded-md text-white p-2">Save Doctor</button>
            </form>
          </div>

          {/* Add New Facility Form */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Add New Facility</h3>
            <form onSubmit={saveFacility} className="space-y-4">
              <div>
                <label className="block">Facility Name</label>
                <input
                  type="text"
                  name="name"
                  value={facilityData.name}
                  onChange={handleFacilityChange}
                  className="border p-2 w-1/2 broder-2 border-[#bc181d] rounded-md"
                  required
                />
              </div>

              <button type="submit" className="bg-[#bc181d] hover:bg-white hover:text-[#bc181d] hover:border-[#bc181d] border-2 rounded-md text-white p-2">Save Facility</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
