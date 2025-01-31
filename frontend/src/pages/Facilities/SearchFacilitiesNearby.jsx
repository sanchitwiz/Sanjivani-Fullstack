import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { ImSpinner2 } from 'react-icons/im';

const SearchFacilitiesNearby = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [showModal, setShowModal] = useState(false);
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  useEffect(() => {
    if (!showModal) return;

    // Clear the existing map container before reinitializing
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      mapContainer.innerHTML = ''; // Clears the map container
    }

    const newMap = new window.mappls.Map('map', {
      center: { lat: userLocation.lat || 28.612964, lng: userLocation.lng || 77.229463 },
      zoom: 12,
    });
    setMap(newMap);
  }, [showModal, userLocation]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      return
    }
    setLoading(true)
      try {
        const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
        const response = await axios.post(`${baseURL}/get-hospital`, { prompt: searchQuery });
        setHospitals(response.data.hospitals);
        setShowModal(true);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      } finally {
        setLoading(false)
      }
    
  };

  const loadRoute = (hospital) => {
    const { coordinates } = hospital.location;
    const { lat, lng } = userLocation;
    
    // Debug: Log coordinates
    console.log('User Location:', { lat, lng });
    console.log('Hospital Coordinates:', coordinates);
    
    const baseURL = import.meta.env.MODE === "development" 
      ? "http://localhost:5001" 
      : "/";
    
    const routeUrl = `${baseURL}/route?startLat=${lat}&startLng=${lng}&endLat=${coordinates[1]}&endLng=${coordinates[0]}`;
    
    console.log('Route URL:', routeUrl);

    axios.get(routeUrl).then((response) => {
      if (response.data.route && response.data.route.geometry) {
        const decodedPath = decodePolyline(response.data.route.geometry);
        new window.mappls.Polyline({
          path: decodedPath,
          map: map,
          strokeColor: '#00f',
          strokeOpacity: 1.0,
          strokeWeight: 4,
        });

        new window.mappls.Marker({
          map: map,
          position: { lat: coordinates[1], lng: coordinates[0] },
          title: hospital.name,
        });

        map.setCenter({ lat: coordinates[1], lng: coordinates[0] });
      }
    }).catch((error) => {
      console.error('Error fetching route:', error);
    });
  };

  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      points.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }
    return points;
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[40vh] pt-6 bg-red-50">
      <h1 className="text-4xl font-bold mb-10 text-red-700 font-serif">Find Medical Facilities</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex w-full max-w-2xl shadow-lg">
        <input
          type="text"
          placeholder="Search for medical facility (e.g., 'Cardiology')"
          className="w-full p-4 rounded-l-lg border-2 border-red-300 outline-none focus:border-red-500 transition-colors"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="bg-red-500 text-white p-4 rounded-r-lg hover:bg-red-600 transition-all flex items-center gap-2"
        >
          {loading ? <ImSpinner2 className="animate-spin w-5 h-5" /> : <FaSearch className="w-5 h-5" />}
          <span>{loading ? 'Searching...' : 'Search'}</span>
        </button>
      </form>

      {loading && (
        <p className="mt-4 text-red-700 font-semibold">Please wait, Finding the Nearest Hospital for you...</p>
      )}

      {/* Modal for Hospital List */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-2xl w-11/12 max-w-5xl relative" style={{ height: '80vh' }}>
            <div className="p-6 border-b border-red-100 flex justify-between items-center">
              <h5 className="text-2xl font-semibold text-red-700">Nearby Medical Facilities</h5>
              <button
                type="button"
                className="text-red-500 hover:text-red-700 text-2xl transition-colors"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
            <div className="p-6 h-[calc(100%-80px)] flex gap-6">
              {/* Hospital List */}
              <ul className="w-1/3 overflow-y-auto pr-4 border-r border-red-50">
                {hospitals.map((hospital, index) => (
                  <li
                    key={index}
                    className="p-4 mb-2 rounded-lg hover:bg-red-50 cursor-pointer transition-colors border border-red-100"
                    onClick={() => loadRoute(hospital)}
                  >
                    <h5 className="font-semibold text-red-700">{hospital.name}</h5>
                    <p className="text-gray-600 text-sm mt-1">{hospital.address}</p>
                  </li>
                ))}
              </ul>

              {/* Map Container */}
              <div 
                id="map" 
                className="w-2/3 h-full rounded-xl overflow-hidden border-2 border-red-100 shadow-inner"
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFacilitiesNearby;
