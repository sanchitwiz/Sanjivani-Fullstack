import React from "react";
import { Link } from "react-router-dom";

const Modal = ({ disease, onClose }) => {
  if (!disease) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-8 w-11/12 max-w-5xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-3xl text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          &times;
        </button>

        {/* Disease Name */}
        <div className="border-b-2 border-teal-600 pb-4 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 font-serif">
            {disease.name}
          </h2>
          <span className="text-sm text-teal-600 font-medium mt-1 block">
            Medical Condition Overview
          </span>
        </div>

        {/* Disease Description */}
        <div className="bg-blue-50 rounded-lg p-5 mb-8">
          <p className="text-gray-700 leading-relaxed text-lg">
            {disease.description}
          </p>
        </div>

        {/* Recovery Plan */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Recovery Plan
            </h3>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm mb-6">
            <p className="text-gray-700 text-lg mb-4">
              <span className="font-semibold text-teal-600">Duration:</span>{" "}
              {disease.recoveryPlan.duration}
            </p>
          </div>

          {/* Daily Plan */}
          <div className="grid gap-4">
            {disease.recoveryPlan.dailyPlan.map((dayPlan, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📌</span>
                  </div>
                  <h4 className="text-xl font-medium text-gray-800">
                    Day {dayPlan.day}
                  </h4>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-teal-600">
                      Food Intake
                    </span>
                    <p className="text-gray-700">{dayPlan.foodIntake}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-teal-600">
                      Sleep Hours
                    </span>
                    <p className="text-gray-700">{dayPlan.sleepHours}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-teal-600">
                      Avoid
                    </span>
                    <p className="text-gray-700">{dayPlan.avoid}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* When to Visit a Doctor */}
        <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">
              When to Seek Medical Attention
            </h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg flex items-center justify-between">
  {disease.visitDoctor}  
  <Link 
    to='/search-hospital' 
    className="bg-blue-600 text-white font-medium px-4 py-1.5 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
  >
    Search Hospitals
  </Link>
</p>


        </div>
      </div>
    </div>
  );
};

export default Modal;