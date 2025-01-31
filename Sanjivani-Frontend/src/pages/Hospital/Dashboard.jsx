import React, { useState, useEffect, useRef } from 'react';
import { FaHospitalSymbol, FaTachometerAlt, FaUserInjured, FaUserMd, FaClipboardList, FaBell, FaCog, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import AmbulanceSection from './AmbulanceSection';
import BloodBankSection from './BloodBankSection';
import DoctorList from '../../components/DoctorList';
import FacilityList from '../../components/FacilityList';
import AddAmbulanceModal from './AddAmbulanceModal';
import HospitalDataSection from './components/HospitalDataSection';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io('http://localhost:5001');

const Dashboard = ({adminSharedEmail}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [bedsTaken, setBedsTaken] = useState(0);
    const [bedsAvailable, setBedsAvailable] = useState(0);
    const [facilities, setFacilities] = useState([]);
    const [availableDoctors, setAvailableDoctors] = useState([]);
    const [adminData, setAdminData] = useState({});
    const [hospitalData, setHospitalData] = useState({});
    const [isAmbulanceModalOpen, setIsAmbulanceModalOpen] = useState(false);
    const [clientRequests, setClientRequests] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [ambulances, setAmbulances] = useState([]);
    const [currentAdminEmail, setCurrentAdminEmail] = useState(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const saveToLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    const getFromLocalStorage = (key, fallbackValue = null) => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : fallbackValue;
    };

    useEffect(() => {
        if (adminSharedEmail) {
            localStorage.setItem('adminSharedEmail', adminSharedEmail);
        }
    }, [adminSharedEmail]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const savedEmail = localStorage.getItem('adminSharedEmail');
        const emailToUse = adminSharedEmail || savedEmail;
        if (emailToUse) {
            const fetchAdminData = async () => {
                try {
                    const adminResponse = await axios.get(`http://localhost:5001/admin/${emailToUse}`);
                    setAdminData(adminResponse.data);
                    setBedsTaken(adminResponse.data.bedsTaken);
                    setBedsAvailable(adminResponse.data.bedsAvailable);
                    setFacilities(adminResponse.data.availableFacilities || []);
                    setAvailableDoctors(adminResponse.data.availableDoctors || []);
                    setAmbulances(adminResponse.data.ambulances || []);

                    const hospitalResponse = await axios.get(`http://localhost:5001/hospital/${adminResponse.data.hospital}`);
                    setHospitalData(hospitalResponse.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    navigate('/hospital-login');
                }
            };
            if (!getFromLocalStorage('adminData')) {
                fetchAdminData();
            } else {
                setAdminData(getFromLocalStorage('adminData'));
                setHospitalData(getFromLocalStorage('hospitalData'));
                setBedsTaken(getFromLocalStorage('adminData').bedsTaken);
                setBedsAvailable(getFromLocalStorage('adminData').bedsAvailable);
                setFacilities(getFromLocalStorage('adminData').availableFacilities || []);
                setAvailableDoctors(getFromLocalStorage('adminData').availableDoctors || []);
                setAmbulances(getFromLocalStorage('ambulances'));
                setClientRequests(getFromLocalStorage('clientRequests'));
            }
        } else {
            navigate('/hospital-login');
        }
    }, [adminSharedEmail, navigate]);

    useEffect(() => {
        const handleAmbulanceRequest = (data) => {
            if (data.hospitalID === adminData.hospital) {
                setClientRequests(prevRequests => {
                    if (!prevRequests.includes(data.clientName)) {
                        const newRequests = [...prevRequests, data.clientName];
                        saveToLocalStorage('clientRequests', newRequests);
                        return newRequests;
                    }
                    return prevRequests;
                });
                setCurrentAdminEmail(data.adminEmail);
            }
        };
        socket.on('ambulanceRequest', handleAmbulanceRequest);
        return () => {
            socket.off('ambulanceRequest', handleAmbulanceRequest);
        };
    }, [adminData.hospital]);

    useEffect(() => {
        socket.on('ambulanceAssigned', async ({ ambulanceId }) => {
            try {
                const response = await axios.get(`http://localhost:5001/ambulance/${ambulanceId}`);
                const newAmbulance = response.data;
                const updatedAmbulances = [...ambulances, newAmbulance];
                
                setAmbulances(prevAmbulances => [...prevAmbulances, newAmbulance]);
                setClientRequests(prevRequests => prevRequests.filter(request => request !== selectedClient));
                setSelectedClient(null);
                setIsAmbulanceModalOpen(false);
            } catch (error) {
                console.error('Error fetching ambulance details:', error);
            }
        });

        return () => {
            socket.off('ambulanceAssigned');
        };
    }, [selectedClient, ambulances]);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleLogout = () => {
        // alert("Logged out!");
        toast.success("Logged Out Successfully !")
        localStorage.removeItem('adminSharedEmail');
        navigate('/hospital-login');
    };

    const updateBedsTaken = async (change) => {
        const newBedsTaken = bedsTaken + change;
        if (newBedsTaken < 0 || newBedsTaken > (bedsTaken + bedsAvailable)) return;
    
        try {
            const emailToUse = adminSharedEmail || localStorage.getItem('adminSharedEmail');
            const response = await axios.put(`http://localhost:5001/admin/${emailToUse}/bedsTaken/update`, { bedsTaken: newBedsTaken });
            
            if (response.data && response.data.bedsTaken !== undefined) {
                setBedsTaken(response.data.bedsTaken);
                setBedsAvailable(bedsTaken + bedsAvailable - response.data.bedsTaken);
            }
        } catch (error) {
            console.error('Error updating beds:', error);
        }
    };

    const handleDoctorToggle = (doctorName) => {
        setAvailableDoctors(prev => 
            prev.includes(doctorName) ? prev.filter(name => name !== doctorName) : [...prev, doctorName]
        );
    };

    const handleFacilityToggle = (facilityName) => {
        setFacilities(prev => 
            prev.includes(facilityName) ? prev.filter(name => name !== facilityName) : [...prev, facilityName]
        );
    };

    const updateAvailableDoctors = async () => {
        const savedEmail = localStorage.getItem('adminSharedEmail');
        const emailToUse = adminSharedEmail || savedEmail;
        try {
            await axios.put(`http://localhost:5001/admin/${emailToUse}/availableDoctors/update`, {
                updateData: availableDoctors
            });
            alert('Available doctors updated successfully');
        } catch (error) {
            console.error('Error updating available doctors:', error);
            alert('Failed to update available doctors');
        }
    };

    const updateAvailableFacilities = async () => {
        const savedEmail = localStorage.getItem('adminSharedEmail');
        const emailToUse = adminSharedEmail || savedEmail;
        try {
            await axios.put(`http://localhost:5001/admin/${emailToUse}/availableFacilities/update`, {
                updateData: facilities
            });
            alert('Available facilities updated successfully');
        } catch (error) {
            console.error('Error updating available facilities:', error);
            alert('Failed to update available facilities');
        }
    };

    const handleSaveAmbulances = async (newAmbulances) => {
        try {
            const response = await axios.post('http://localhost:5001/ambulance/admin/assign', {
                ambulanceNumber: newAmbulances[0].ambulanceNumber,
                driverName: newAmbulances[0].driverName,
                mobile: newAmbulances[0].mobile,
                adminEmail: currentAdminEmail
            });
            
            alert('Ambulance assignment request sent successfully');
        } catch (error) {
            console.error('Error assigning ambulance:', error);
            alert('Failed to assign ambulance');
        }
    };

    const handleClientSelection = (clientName) => {
        setSelectedClient(clientName);
        setIsAmbulanceModalOpen(true);
    };

    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex min-h-screen">
                <div className="w-1/5 text-black flex flex-col sticky top-0 h-full bottom-0">
                    <Link to='/dashboard' className="text-2xl font-semibold flex items-center pl-10 pt-3 pb-2 bg-[#bc181d] rounded-sm" href="#!">
                        <FaHospitalSymbol className="h-18 mr-4 text-white" />
                        <span className="text-white">Sanjivani</span>
                    </Link>
                    <nav className="mt-8">
                        <ul className='text-black'>
                            <li className="py-2 px-6 flex items-center hover:bg-[#bc181d] hover:text-white cursor-pointer transition-colors duration-300">
                                <FaTachometerAlt className="mr-2 hover:text-white" /> Dashboard
                            </li>
                            <li className="py-2 px-6 flex items-center hover:bg-[#bc181d] hover:text-white cursor-pointer transition-colors duration-300">
                                <FaUserInjured className="mr-2 hover:text-white" /> Patients
                            </li>
                            <li className="py-2 px-6 flex items-center hover:bg-[#bc181d] hover:text-white cursor-pointer transition-colors duration-300">
                                <FaUserMd className="mr-2 hover:text-white" /> Specialists
                            </li>
                            <li className="py-2 px-6 flex items-center hover:bg-[#bc181d] hover:text-white cursor-pointer transition-colors duration-300">
                                <FaClipboardList className="mr-2 hover:text-white" /> Procurement
                            </li>
                            <li className="py-2 px-6 flex items-center hover:bg-[#bc181d] hover:text-white cursor-pointer transition-colors duration-300">
                                <FaBell className="mr-2 hover:text-white" /> Notifications
                            </li>
                            <li className="py-2 px-6 flex items-center hover:bg-[#bc181d] hover:text-white cursor-pointer transition-colors duration-300">
                                <FaCog className="mr-2 hover:text-white" /> Settings
                            </li>
                        </ul>
                    </nav>
                    <div className="p-6">
                        <div className="bg-white text-black p-2 rounded-lg">
                            <h3 className="text-lg font-semibold">No. of Beds Available</h3>
                            <p>Taken: {bedsTaken}</p>
                            <p>Available: {bedsAvailable}</p>
                            <div className="mt-3">
                                <button onClick={() => updateBedsTaken(1)} className="bg-red-700 text-white px-2 py-1 rounded">
                                    Increase Taken Beds
                                </button>
                                <button onClick={() => updateBedsTaken(-1)} className="bg-red-700 text-white px-2 py-1 rounded mt-1">
                                    Decrease Taken Beds
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[90%] bg-gray-100 p-6 max-h-full">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Dashboard</h2>
                        <div className="relative">
                            <div className="flex items-center space-x-1 cursor-pointer" onClick={toggleDropdown}>
                                <span className="font-semibold">{adminData.username}</span>
                                <FaCaretDown />
                                <FaUserCircle className="text-xl" />
                            </div>

                            {dropdownOpen && (
                                <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                    <ul className="py-2">
                                        <li
                                            onClick={handleLogout}
                                            className="block px-4 py-2 text-sm text-black hover:bg-[#bc181d] hover:text-white cursor-pointer"
                                        >
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div>
                            <DoctorList 
                                doctors={hospitalData.doctors || []}
                                availableDoctors={availableDoctors}
                                onToggle={handleDoctorToggle}
                            />
                            <button 
                                onClick={updateAvailableDoctors}
                                className="mt-4 bg-[#bc181d] text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                            >
                                Update Available Doctors
                            </button>
                        </div>
                        <div>
                            <FacilityList 
                                facilities={hospitalData.services ? hospitalData.services.map(service => service.name) : []}
                                availableFacilities={facilities}
                                onToggle={handleFacilityToggle}
                            />
                            <button 
                                onClick={updateAvailableFacilities}
                                className="mt-4 bg-[#bc181d] text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                            >
                                Update Available Facilities
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-10 mb-8">
                        <AmbulanceSection 
                            className="bg-[#bc181d] text-white rounded-lg transition-all duration-300 hover:bg-white hover:text-[#bc181d] hover:border-[#bc181d] border-2 w-40 h-40 p-10" 
                            adminSharedEmail={adminSharedEmail} 
                            onOpenModal={() => setIsAmbulanceModalOpen(true)}
                            clientRequests={clientRequests}
                            onClientSelect={handleClientSelection}
                            ambulances={ambulances}
                        />
                        <BloodBankSection 
                            className="bg-[#bc181d] text-white rounded-lg transition-all duration-300 hover:bg-white hover:text-[#bc181d] hover:border-[#bc181d] border-2 w-40 h-40 p-10" 
                            adminSharedEmail={adminSharedEmail} 
                        />
                    </div>

                    <HospitalDataSection 
                        hospitalName={hospitalData.name || adminData.hospitalName}
                        facilities={hospitalData.services}
                        doctors={hospitalData.doctors}
                    />
                </div>
            </div>
            <AddAmbulanceModal
                isOpen={isAmbulanceModalOpen}
                onClose={() => setIsAmbulanceModalOpen(false)}
                onSave={handleSaveAmbulances}
                selectedClient={selectedClient}
            />
        </div>
    );
};

export default Dashboard;
