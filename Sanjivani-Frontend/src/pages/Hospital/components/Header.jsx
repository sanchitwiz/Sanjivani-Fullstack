import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = ({ adminData }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

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

    const handleLogout = () => {
        alert("Logged out!");
        localStorage.removeItem('adminSharedEmail');
        navigate('/hospital-login');
    };

    return (
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <div className="relative">
                <div className="flex items-center space-x-1 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
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
    );
};

export default Header;