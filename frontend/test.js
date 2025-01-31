import axios from 'axios';

const fetchData = async () => {
  try {
    const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
    const response = await axios.get(`${baseURL}/admin/shalin@gmail.com`);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData();

// {
//     _id: '670b7ef3ca34e9118ccef7dd',
//     username: 'shalin',
//     password: 'password1',
//     hospital: '670b7ef3ca34e9118ccef7d1',
//     availableFacilities: [ 'MRI', 'Blood Bank' ],
//     ambulances: [],
//     availableDoctors: [ 'Dr. John Doe', 'Dr. Jane Smith' ],
//     bloodBank: [ 'A+', 'B+', 'O-' ],
//     __v: 0,
//     email: 'shalin@gmail.com',
//     hospitalName: 'Shalin Hospital',
//     bedsAvailable: 1200,
//     bedsTaken: 720
//  }
