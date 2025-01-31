import React, { useEffect, useRef, useState } from 'react';
import { FaHospitalSymbol, FaHeart, FaPlus, FaAmbulance} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

// Variants for the dropdown animation
const dropdownVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
};

const Navbar = ({ isLoggedIn, onLogout, sharedValue, sharedEmail, setSharedValue }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isProfileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [userData, setUserData] = useState(null); // State for user data
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const location = useLocation();
  isLoggedIn = sharedValue;

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isDropdownVisible) {
          setDropdownVisible(false);
        }
      }

      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        if (isProfileDropdownVisible) {
          setProfileDropdownVisible(false);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isDropdownVisible, isProfileDropdownVisible]);

  // Fetch user data with Axios
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // You would get the user token from localStorage or wherever you store it
        const token = localStorage.getItem('userToken');
        
        if (token) {
          // Set up headers for authentication
          const config = {
            headers: {
              Authorization: `Bearer ${token}` // Assuming you use Bearer token for authentication
            }
          };

          // Make API request to get the user data
          const response = await axios.get(`http://localhost:5001/user/${sharedEmail}`, config);
          setUserData(response.data); // Store the user data in state
          console.log(response.data.username);
          
          
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (isLoggedIn) {
      fetchUserData(); // Fetch user data only when logged in
    }
  }, [isLoggedIn, sharedEmail]);

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Remove the token when logging out
    localStorage.removeItem('adminSharedEmail'); // Add this line to remove adminSharedEmail
    setSharedValue(false); // Ensure the state reflects the logged-out status
    onLogout();
  };

  return (
    <header className="relative">
      <nav className="bg-gradient-to-r from-red-200 to-red-300 shadow-sm fixed top-0 w-full z-50 border-b border-red-200">
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
          <Link className="text-xl font-semibold flex items-center" to='/'>
            <FaAmbulance className="h-8 w-8 text-red-600 mr-3 animate-pulse" />
            <span className="text-2xl font-serif text-black">Sanjivani</span>
          </Link>

          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <Link 
              to='/' 
              className="text-black hover:text-gray-600 font-medium transition-colors relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            {location.pathname !== '/profile' && (
              <>
                <Link 
                  to="#faqs" 
                  className="text-black hover:text-gray-600 font-medium transition-colors relative group"
                >
                  FAQs
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </>
            )}
            
            <Link 
              to="/search-hospital" 
              className="text-black hover:text-gray-600 font-medium transition-colors relative group"
            >
              Search Hospital
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link 
              to="/scan-your-reports" 
              className="text-black hover:text-gray-600 font-medium transition-colors relative group"
            >
              Scan Reports
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* Keep Women Emergency section with pink styling */}
            <Link 
              to="/women-conditon" 
              className="relative group px-4 py-2 rounded-full transition-all duration-300
                bg-gradient-to-r from-pink-200 to-pink-100 hover:from-pink-300 hover:to-pink-200
                shadow-lg hover:shadow-pink-300/30
                text-pink-700 hover:text-pink-900
                font-semibold
                flex items-center gap-2
                border-2 border-pink-200
                hover:scale-[1.02]"
            >
              <span className="text-red-400 group-hover:text-red-500 transition-colors">
              ❤️‍🩹
              </span>
              Women Emergency
              <span className="absolute -top-1 -right-1">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                </span>
              </span>
            </Link>
          </div>

          <div className="relative" ref={isLoggedIn ? profileDropdownRef : dropdownRef}>
            {isLoggedIn ? (
              <div className="flex items-center space-x-3 cursor-pointer group" onClick={toggleProfileDropdown}>
                <div className="relative">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-red-200 group-hover:border-red-400 transition-colors"
                />

                  <div className="absolute inset-0 rounded-full bg-red-100/30 group-hover:bg-red-100/50 transition-colors" />
                </div>
                <span className="text-red-700 group-hover:text-red-900 transition-colors">
                  {userData ? userData.username : 'User'}
                </span>
              </div>
            ) : location.pathname !== '/profile' ? (
              <button
                onClick={toggleDropdown}
                className="px-6 py-2 mx-4 rounded-full transition-all duration-300
                         bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600
                         text-white font-semibold
                         shadow-md hover:shadow-lg hover:shadow-red-200
                         flex items-center gap-2
                         hover:scale-[1.05]"
              >
                <FaHospitalSymbol className="w-5 h-5" />
                Log in
              </button>
            ) : (
              <Link to='/'>
                <button
                  className="px-6 py-2 mx-4 rounded-full transition-all duration-300
                           bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600
                           text-white font-semibold
                           shadow-md hover:shadow-lg hover:shadow-red-200
                           flex items-center gap-2
                           hover:scale-[1.05]"
                >
                  Go Back
                </button>
              </Link>
            )}

            {/* Dropdown Menus */}
            {isDropdownVisible && !isLoggedIn && (
              <motion.div
                className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-xl z-50 border border-red-100"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={dropdownVariants}
                transition={{ duration: 0.2 }}
              >
                <ul className="py-2">
                  <li className="border-b border-red-50">
                    <Link
                      to="/user-login"
                      className="block px-4 py-3 hover:bg-red-50 text-red-700 hover:text-red-900 transition-colors"
                    >
                      User Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/hospital-login"
                      className="block px-4 py-3 hover:bg-red-50 text-red-700 hover:text-red-900 transition-colors"
                    >
                      Hospital Login
                    </Link>
                  </li>
                </ul>
              </motion.div>
            )}

            {isProfileDropdownVisible && isLoggedIn && (
              <motion.div
                className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-xl z-50 border border-red-100"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={dropdownVariants}
                transition={{ duration: 0.2 }}
              >
                <ul className="py-2">
                  <li className="border-b border-red-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-3 hover:bg-red-50 text-red-700 hover:text-red-900 transition-colors"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 hover:bg-red-50 text-red-700 hover:text-red-900 transition-colors"
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
