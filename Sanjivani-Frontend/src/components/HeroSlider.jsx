import React, { useState, useEffect, useRef } from 'react';
import ai_injury_detection from '../assets/ai_injury.png'
import nearby_hospital_pic from '../assets/nearby_hospital.png'
import medical_reports_ai from '../assets/medical_reports_pic.png'
import { Link } from 'react-router-dom';
import { FaAmbulance, FaClinicMedical, FaClock, FaFileMedical, FaStethoscope } from 'react-icons/fa';

const HomeSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const slides = [
    {
      heading: 'AI First Aid For Injury',
      banner: ai_injury_detection,
      subHeading: 'Immediate First Aid',
      buttonText: '🏥 Using Precise AI',
      buttonLink: '/',
      description: 'Quickly locate certified medical centers with emergency services and specialist availability.',
      icon: <FaClinicMedical className="w-8 h-8 text-red-500" />
    },
    {
      heading: 'AI Medical Reports Analysis',
      subHeading: 'Smart Report Scanning',
      banner: medical_reports_ai,
      buttonText: '🖨️ Scan Reports',
      buttonLink: '/scan-your-reports',
      description: 'Instant AI-powered analysis of lab results with detailed health insights and recommendations.',
      icon: <FaFileMedical className="w-8 h-8 text-red-500" />
    },
    {
      heading: 'Ambulance Tracking',
      banner: nearby_hospital_pic,
      subHeading: 'Live Ambulance Tracking',
      buttonText: '🚑 Track Assistance',
      buttonLink: '/ambulance-tracking',
      description: 'Real-time emergency vehicle monitoring with estimated arrival times and route optimization.',
      icon: <FaAmbulance className="w-8 h-8 text-red-500" />
    },
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [isDragging, slides.length]);

  // Mouse swipe functions
  const handleMouseDown = (e) => {
    setStartX(e.pageX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.pageX - startX;
      if (deltaX > 100) {
        // Swipe Right
        setActiveSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
        setIsDragging(false);
      } else if (deltaX < -100) {
        // Swipe Left
        setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
        setIsDragging(false);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section id="home" className="relative bg-white pt-28 pb-12 px-4 drag-none select-none">
      <div className="container mx-auto">
        <div
          ref={containerRef}
          className="relative overflow-hidden h-[80vh] w-full mx-auto rounded-2xl cursor-grab shadow-xl"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div className="relative h-full flex transition-transform duration-500 ease-in-out" 
               style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
            {slides.map((slide, index) => (
              <div key={index} className="min-w-full flex-shrink-0">
                <div className="container mx-auto flex flex-col lg:flex-row items-center h-full px-8">
                  {/* Text Content */}
                  <div className="lg:w-1/2 space-y-6 z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-red-100 p-3 rounded-xl">
                        {slide.icon}
                      </div>
                      <h4 className="text-red-600 font-semibold text-lg">
                        {slide.subHeading}
                      </h4>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                      {slide.heading}
                    </h1>
                    <p className="text-gray-600 text-lg max-w-xl">{slide.description}</p>
                    <Link
                      to={slide.buttonLink}
                      className="inline-block bg-gradient-to-r from-red-600 to-red-500 text-white py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-600 transition-all duration-300 font-medium"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>

                  {/* Image Section */}
                  <div className="lg:w-1/2 relative h-full flex items-center justify-center">
                    <img 
                      src={slide.banner} 
                      alt="Medical Services" 
                      className="w-full max-w-2xl rounded-2xl shadow-xl drag-none" 
                    />
                    
                    {/* Floating Badges */}
                    <div className="absolute -top-4 -right-8 bg-white p-5 rounded-2xl shadow-lg border border-red-50">
                      <div className="bg-red-100 text-red-500 rounded-full p-3 mb-2">
                        <FaStethoscope className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800">200+ Specialists Expert Care</span>
                      {/* <span className="text-xs text-gray-500">Expert Care</span> */}
                    </div>

                    <div className="absolute bottom-8 left-0 bg-white p-5 rounded-2xl shadow-lg border border-red-50">
                      <div className="bg-red-100 text-red-500 rounded-full p-3 mb-2">
                        <FaClock className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-semibold text-gray-800">24/7 Service Emergency Support</span>
                      {/* <span className="text-xs text-gray-500">Emergency Support</span> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeSlide 
                    ? 'bg-red-600 scale-125 ring-2 ring-red-300' 
                    : 'bg-red-200 hover:bg-red-400'
                }`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;