import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Modal from "./WomenConditionModal";
import { EMERGENCY_CONDITIONS } from "./constant";
import Card from "./DiseaseCard";
import { FaSearch, FaHeart, FaVenus } from "react-icons/fa";
import { Link } from "react-router-dom";

const App = () => {
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDiseaseClick = (disease) => {
    setSelectedDisease(disease);
  };

  const handleCloseModal = () => {
    setSelectedDisease(null);
  };

  const filteredDiseases = EMERGENCY_CONDITIONS.filter((disease) =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
// bg-gradient-to-b from-rose-50 to-rose-100
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans relative overflow-hidden">
      {/* Feminine floral watermark */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://img.icons8.com/ios-filled/100/ff69b4/floral-pattern.png')] bg-repeat"></div>

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-rose-600 to-rose-500 text-white py-4 px-6 flex flex-col md:flex-row justify-between items-center shadow-lg backdrop-blur-sm">
        <Link to='/' className="flex items-center mb-4 md:mb-0 group">
          <FaVenus className="mr-2 text-rose-200 animate-pulse h-8 w-8 transform group-hover:rotate-180 transition-all duration-500" />
          <h1 className="text-2xl font-bold font-serif bg-clip-text text-transparent bg-gradient-to-r from-rose-100 to-rose-50">
            Sanjivani Women's Wellness
          </h1>
        </Link>
        
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-rose-400" />
          </div>
          <input
            type="text"
            placeholder="Search women's health conditions..."
            className="pl-10 pr-4 py-3 rounded-full w-full bg-white/90 text-gray-700 
                     border-2 border-rose-200 focus:border-rose-400 focus:ring-2 
                     focus:ring-rose-200 transition-all duration-200 shadow-sm
                     placeholder-rose-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block bg-rose-100 rounded-full p-4 mb-3 shadow-md">
            <FaHeart className="text-rose-600 w-8 h-8 animate-heartbeat" />
          </div>
          <h2 className="text-4xl font-bold text-rose-700 mb-4 font-serif underline decoration-rose-300 decoration-wavy">
            Women's Health Companion
          </h2>
          <p className="text-rose-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Empowering women with compassionate care and specialized medical guidance
          </p>
        </div>

        {/* Condition Cards */}
        {filteredDiseases.length === 0 ? (
          <div className="text-center py-12 bg-white/80 rounded-xl shadow-sm">
            <p className="text-rose-600 text-lg mb-4">No conditions found matching your search</p>
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-rose-500 to-rose-400 text-white rounded-full
                       hover:from-rose-600 hover:to-rose-500 transition-all duration-300 shadow-md
                       hover:shadow-lg flex items-center gap-2 mx-auto"
            >
              <FaSearch className="w-4 h-4" />
              Clear Search
            </button>
          </div>
        ) : (
          <>
            {/* Mobile Swiper */}
            <div className="block md:hidden">
              <Swiper 
                spaceBetween={20} 
                slidesPerView={1}
                className="pb-10"
                effect="creative"
                creativeEffect={{
                  prev: { shadow: true, translate: ["-120%", 0, -500] },
                  next: { translate: ["120%", 0, 0] }
                }}
              >
                {filteredDiseases.map((disease, index) => (
                  <SwiperSlide key={index}>
                    <div className="px-2 py-4">
                      <Card disease={disease} onClick={handleDiseaseClick} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {filteredDiseases.map((disease, index) => (
                <Card 
                  key={index} 
                  disease={disease} 
                  onClick={handleDiseaseClick}
                  className="transform transition-all duration-300 hover:scale-[1.02] 
                            shadow-lg hover:shadow-xl border-2 border-rose-50"
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {selectedDisease && <Modal disease={selectedDisease} onClose={handleCloseModal} />}

      {/* Floating CTA */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="p-4 bg-rose-500 text-white rounded-full shadow-xl hover:bg-rose-600 
                          transition-all duration-300 animate-bounce-slow">
          <FaVenus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default App;