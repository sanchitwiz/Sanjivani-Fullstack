import React from 'react';
import { FaHospitalSymbol, FaTachometerAlt, FaUserInjured, FaUserMd, FaClipboardList, FaBell, FaCog } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="w-1/5 text-black flex flex-col sticky top-0 h-full bottom-0">
            <a className="text-2xl font-semibold flex items-center pl-10 pt-3 pb-2 bg-[#bc181d] rounded-sm" href="#!">
                <FaHospitalSymbol className="h-18 mr-4 text-white" />
                <span className="text-white">Sanjivani</span>
            </a>
            <nav className="mt-8">
                <ul className='text-black'>
                    {[
                        { icon: FaTachometerAlt, text: 'Dashboard' },
                        { icon: FaUserInjured, text: 'Patients' },
                        { icon: FaUserMd, text: 'Specialists' },
                        { icon: FaClipboardList, text: 'Procurement' },
                        { icon: FaBell, text: 'Notifications' },
                        { icon: FaCog, text: 'Settings' },
                    ].map(({ icon: Icon, text }, index) => (
                        <li key={index} className="py-2 px-6 flex items-center hover:bg-[#bc181d] hover:text-white cursor-pointer transition-colors duration-300">
                            <Icon className="mr-2 hover:text-white" /> {text}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;