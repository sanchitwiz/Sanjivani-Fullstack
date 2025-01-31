import React from 'react';
import { FaHeart, FaFacebookF, FaTwitter, FaInstagram, FaAmbulance } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-6 md:space-y-0">
          
          {/* Logo Section */}
          <Link to='/' className="group">
            <div className="flex items-center transition-transform duration-300 hover:scale-105">
              <FaHeart className="w-8 h-8 text-red-300 mr-2 animate-pulse" />
              <h2 className="text-2xl font-serif font-bold tracking-wide">
                Sanjivani Care
              </h2>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-6 md:gap-8">
            <Link 
              to="/about" 
              className="hover:text-red-200 transition-colors duration-300 relative group"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-200 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/services" 
              className="hover:text-red-200 transition-colors duration-300 relative group"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-200 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/contact" 
              className="hover:text-red-200 transition-colors duration-300 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-200 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/privacy" 
              className="hover:text-red-200 transition-colors duration-300 relative group"
            >
              Privacy Policy
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-200 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Social Media */}
          <div className="flex gap-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
               className="p-2 rounded-full hover:bg-red-500 transition-colors duration-300">
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
               className="p-2 rounded-full hover:bg-red-500 transition-colors duration-300">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
               className="p-2 rounded-full hover:bg-red-500 transition-colors duration-300">
              <FaInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-red-500 my-6"></div>

        {/* Copyright Section */}
        <div className="text-center text-red-200 text-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaAmbulance className="text-red-300 animate-pulse" />
            <p className="flex items-center gap-1">
              Made with <FaHeart className="text-red-300 mx-1" /> by Code_Wizz
            </p>
          </div>
          <p>© {new Date().getFullYear()} Sanchit and Soni</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;