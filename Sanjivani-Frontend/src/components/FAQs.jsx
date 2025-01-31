import React, { useState } from 'react';
import { 
  FaFirstAid, 
  FaHospitalAlt, 
  FaAmbulance, 
  FaHeartbeat, 
  FaFilePdf, 
  FaXRay 
} from 'react-icons/fa';

const FAQItem = ({ question, answer, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-3">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <span className="text-red-600">{icon}</span>
          <h3 className="text-base font-medium text-gray-800">{question}</h3>
        </div>
        <span className={`text-red-600 ${isOpen ? 'transform rotate-180' : ''}`}>
          ▼
        </span>
      </div>
      {isOpen && (
        <div className="mt-2 ml-7 text-gray-600 text-sm">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQs = () => {
  const faqData = [
    {
      question: "How does emergency first aid guidance work?",
      answer: "Get step-by-step instructions for emergencies through our AI-powered system.",
      icon: <FaFirstAid className="text-lg" />,
    },
    {
      question: "How accurate is hospital location?",
      answer: "Real-time data shows nearest medical facilities with current availability.",
      icon: <FaHospitalAlt className="text-lg" />,
    },
    {
      question: "How does ambulance tracking work?",
      answer: "Track real-time locations and ETAs of dispatched ambulances.",
      icon: <FaAmbulance className="text-lg" />,
    },
    {
      question: "Blood bank availability?",
      answer: "Live updates on blood type availability every 15 minutes.",
      icon: <FaHeartbeat className="text-lg" />,
    },
    {
      question: "Are my medical reports secure?",
      answer: "End-to-end encrypted analysis with auto-delete after 24 hours.",
      icon: <FaFilePdf className="text-lg" />,
    },
    {
      question: "Can analyze medical imaging?",
      answer: "Preliminary analysis of common MRI/X-ray findings available.",
      icon: <FaXRay className="text-lg" />,
    },
  ];

  return (
    <div id='faqs' className="bg-white py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-red-700">
          Frequently Asked Questions
        </h2>
        <div className="bg-gray-50 rounded-lg p-4">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              icon={faq.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;