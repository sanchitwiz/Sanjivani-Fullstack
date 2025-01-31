import axios from 'axios';

export const fetchAdminData = async (emailToUse, setAdminData, setHospitalData, setBedsTaken, setBedsAvailable, setFacilities, setAvailableDoctors, setAmbulances, navigate) => {
  try {
    const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
    const adminResponse = await axios.get(`${baseURL}/admin/${emailToUse}`);
    setAdminData(adminResponse.data);
    setBedsTaken(adminResponse.data.bedsTaken);
    setBedsAvailable(adminResponse.data.bedsAvailable);
    setFacilities(adminResponse.data.availableFacilities || []);
    setAvailableDoctors(adminResponse.data.availableDoctors || []);
    setAmbulances(adminResponse.data.ambulances || []);

    const hospitalResponse = await axios.get(`${baseURL}/hospital/${adminResponse.data.hospital}`);
    setHospitalData(hospitalResponse.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    navigate('/hospital-login');
  }
};