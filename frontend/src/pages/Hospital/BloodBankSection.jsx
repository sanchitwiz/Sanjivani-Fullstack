import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddBloodBankModal from './AddBloodBankModal';
import { useNavigate } from 'react-router-dom';

const BloodBankSection = ({ adminSharedEmail }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bloodBank, setBloodBank] = useState([]);
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('adminSharedEmail'); // Retrieve from localStorage
    const emailToUse = adminSharedEmail || savedEmail;

    if (emailToUse) {
      const fetchAdminData = async () => {
        try {
          const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
          const response = await axios.get(`${baseURL}/admin/${emailToUse}`);
          setAdminData(response.data);
          setBloodBank(response.data.bloodBank || []); // Set bloodBank from API response
        } catch (error) {
          console.error('Error fetching admin data:', error);
        }
      };

      fetchAdminData();
    } else {
      navigate('/hospital-login'); // Redirect to login if no email found
    }
  }, [adminSharedEmail, navigate]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveBloodBank = (newBloodBank) => {
    // Append the new blood types to the existing blood bank
    setBloodBank((prevBloodBank) => [...prevBloodBank, ...newBloodBank]);
    setIsModalOpen(false);
  };

  return (
    <div className="my-1">
      <div className="bg-white text-black p-4 rounded-lg border-[#bc181d] border-2">
        <h3 className="text-lg font-semibold mb-2">Blood Bank Information</h3>
        {bloodBank.length > 0 ? (
          <ul className="list-disc list-inside">
            {bloodBank.map((blood, index) => (
              <li key={index} className="hover:text-[#bc181d] transition-colors">
                {blood} {/* Since bloodBank is an array of strings */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No blood information available today.</p>
        )}
        <button 
          className="mt-8 bg-[#bc181d] text-white px-4 rounded-md py-2 transition-all duration-300 hover:bg-white hover:text-[#bc181d] hover:border-[#bc181d] border-2"
          onClick={handleOpenModal}
        >
          Add Blood Type
        </button>
      </div>

      <AddBloodBankModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveBloodBank} 
      />
    </div>
  );
};

export default BloodBankSection;
