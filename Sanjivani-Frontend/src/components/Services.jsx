import React from 'react'
import { FaVirus, FaTooth, FaHeartbeat, FaBone, FaClipboard, FaLungs } from 'react-icons/fa'

const Services = () => {
  return (
    <section className="bg-white px-4 py-16 md:px-24 md:py-24" id="services">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 font-serif">Our Medical Services</h1>
          <p className="text-lg text-red-600 mt-4">Comprehensive care tailored to your needs</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {/* COVID Test */}
          <div className="p-6 bg-white text-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-red-300 border-2">
            <FaVirus className="text-4xl text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">COVID-19 Testing</h3>
            <p className="text-gray-600">RT-PCR & Rapid antigen tests</p>
          </div>

          {/* Dental Care */}
          <div className="p-6 bg-red-600 text-white text-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white hover:text-red-600 hover:border-red-600 border-2">
            <FaTooth className="text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Dental Care</h3>
            <p className="text-red-100 hover:text-red-700">Preventive & cosmetic dentistry</p>
          </div>

          {/* Cardiology */}
          <div className="p-6 bg-white text-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-red-300 border-2">
            <FaHeartbeat className="text-4xl text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Cardiology</h3>
            <p className="text-gray-600">Heart health monitoring</p>
          </div>

          {/* Orthopedic */}
          <div className="p-6 bg-red-600 text-white text-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white hover:text-red-600 hover:border-red-600 border-2">
            <FaBone className="text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Orthopedics</h3>
            <p className="text-red-100 hover:text-red-700">Bone & joint care</p>
          </div>

          {/* Research */}
          <div className="p-6 bg-white text-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-red-300 border-2">
            <FaClipboard className="text-4xl text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Medical Research</h3>
            <p className="text-gray-600">Innovative treatments</p>
          </div>

          {/* Pulmonology */}
          <div className="p-6 bg-red-600 text-white text-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white hover:text-red-600 hover:border-red-600 border-2">
            <FaLungs className="text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Pulmonology</h3>
            <p className="text-red-100 hover:text-red-700">Respiratory health</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services