import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFirstAid, FaHeart, FaMedkit, FaTimes } from 'react-icons/fa';

const FirstAidModal = ({ query, onClose, imageResult }) => {
  const [firstAidData, setFirstAidData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(imageResult);
  

  useEffect(() => {
    const fetchFirstAidData = async () => {
      try {
        const response = await axios.post('http://localhost:5001/get-first-aid', { prompt: query || imageResult });
        setFirstAidData(response.data);
      } catch (err) {
        setError('Failed to fetch first aid data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    if (imageResult || query) {
      fetchFirstAidData();
    }
  }, [query, imageResult]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gradient-to-b from-red-50 to-white rounded-xl p-8 w-11/12 md:w-2/3 lg:w-1/2 relative border-2 border-red-100 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition-colors"
          >
            <FaTimes className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center">
            <div className="animate-spin mb-4">
              <FaHeart className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-red-800 font-serif mb-2">
              Analyzing Emergency Details
            </h2>
            <p className="text-red-600">Fetching specialized first aid guidance...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gradient-to-b from-red-50 to-white rounded-xl p-8 w-11/12 md:w-2/3 lg:w-1/2 relative border-2 border-red-100 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition-colors"
          >
            <FaTimes className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center text-center">
            <div className="bg-red-100 p-3 rounded-full mb-4">
              <FaTimes className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-red-800 font-serif mb-2">
              Connection Issue Detected
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <FaTimes className="w-4 h-4" />
              Close and Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Function to convert YouTube URL to embed URL
  const getEmbedUrl = (url) => {
    if (url && url.includes('youtube.com')) {
      const videoId = url.split('v=')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-red-50 to-white rounded-xl p-6 w-11/12 md:w-3/4 lg:w-2/3 relative max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-red-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition-colors"
        >
          <FaTimes className="w-6 h-6" />
        </button>
  
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-red-100 p-3 rounded-full">
            <FaMedkit className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-red-800 font-serif">
            Emergency Guidance for {query}
          </h2>
        </div>
  
        {firstAidData?.firstAidInstructions && (
          <div className="mb-6">
            <div className="space-y-2">
              {firstAidData.firstAidInstructions.parts[0].text.split('\n').map((instruction, index) => (
                <p key={index} className="mb-2">{instruction.trim()}</p>
              ))}
            </div>
          </div>
        )}

  
        {firstAidData?.youtubeVideo && firstAidData.youtubeVideo !== 'No relevant video found' && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
              <FaFirstAid className="text-red-600 w-5 h-5" />
              <h3 className="text-lg font-semibold text-red-800">Instructional Video</h3>
            </div>
            <div className="rounded-xl overflow-hidden border border-red-100 aspect-video">
              <iframe
                src={getEmbedUrl(firstAidData.youtubeVideo)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        )}
  
        {(!firstAidData?.firstAidInstructions && !firstAidData?.youtubeVideo) && (
          <div className="text-center py-6">
            <p className="text-red-600 text-base">
              No specialized guidance found. Consult a medical professional immediately.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirstAidModal;