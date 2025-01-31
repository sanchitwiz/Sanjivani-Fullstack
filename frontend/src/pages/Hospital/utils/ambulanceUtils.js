import axios from 'axios';

export const handleAmbulanceAssignment = async (ambulanceId, setAmbulances, setClientRequests, selectedClient, setSelectedClient, setIsAmbulanceModalOpen) => {
  try {
    const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
    const response = await axios.get(`${baseURL}/ambulance/${ambulanceId}`);
    const newAmbulance = response.data;
    
    setAmbulances(prevAmbulances => [...prevAmbulances, newAmbulance]);
    setClientRequests(prevRequests => prevRequests.filter(request => request !== selectedClient));
    setSelectedClient(null);
    setIsAmbulanceModalOpen(false);
  } catch (error) {
    console.error('Error fetching ambulance details:', error);
  }
};