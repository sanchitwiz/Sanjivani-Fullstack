import React from "react";

const Card = ({ disease, onClick }) => {
  return (
    <div
      onClick={() => onClick(disease)}
      className="group p-6 bg-gradient-to-b from-rose-50 to-rose-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 
               cursor-pointer border-2 border-transparent hover:border-pink-100 relative 
               overflow-hidden transform hover:-translate-y-1 h-[420px] flex flex-col"
    >
      {/* Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-100 to-pink-50" />

      {/* Image Container */}
      <div className="w-full h-48 rounded-xl mb-4 overflow-hidden relative">
  <div className={`w-full h-full ${!disease.icon && 'bg-pink-50'} flex items-center justify-center`}>

    {disease.icon ? (
        <img 
            src={disease.icon} 
            alt="Disease icon"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-pink-300 text-4xl">❤️</span>
        )}
      </div>
      <div className="absolute bottom-2 right-2 bg-black text-white px-3 py-1 rounded-full text-sm">
        Learn More
      </div>
    </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-3 font-serif relative">
          {disease.name}
          <span className="absolute -bottom-1 left-0 w-12 h-1 bg-pink-200 rounded-full" />
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
          {disease.description}
        </p>

        {/* Warning Level */}
        <div className="mt-auto flex items-center gap-2 text-sm">
          <span className={`w-3 h-3 rounded-full ${disease.severity === 'High' ? 'bg-red-400' : 'bg-yellow-400'}`} />
          <span className="font-medium text-gray-500">
            {disease.severity} Priority
          </span>
        </div>
      </div>

      {/* Hover Effect Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-50 opacity-0 
                     group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default Card;