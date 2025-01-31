import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaSave, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [originalData, setOriginalData] = useState({});
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  // Get email from localStorage
  const storedEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/user/${storedEmail}`);
        const user = response.data;
        setUserData({
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          password: '',
        });
        setOriginalData(user);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data');
        setIsLoading(false);
      }
    };

    if (storedEmail) {
      fetchUserData();
    } else {
      toast.error('No user email found');
      setIsLoading(false);
    }
  }, [storedEmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancel = () => {
    setUserData(originalData);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const { email, username, phoneNumber, password } = userData;
      const payload = { email, username, phoneNumber };
      
      // Only include password if it's changed
      if (password.trim() !== '') {
        payload.password = password;
      }

      await axios.put('http://localhost:5001/user/updateByEmail', payload);
      
      toast.success('Profile updated successfully');
      setIsEditing(false);
      // Refresh original data
      setOriginalData({ ...userData, password: '' });
    } catch (error) {
      console.error('Error updating user data:', error);
      toast.error('Failed to update profile');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 pt-16">
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-700 h-32 relative">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <FaUserCircle className="w-32 h-32 text-white bg-red-100 rounded-full p-2 border-8 border-white shadow-lg" />
            </div>
          </div>

          <div className="pt-20 px-8 pb-8">
            <div className="text-center mb-8">
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  className="text-3xl font-bold text-gray-800 text-center bg-gray-50 rounded-lg p-2 w-full max-w-xs mx-auto focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Username"
                />
              ) : (
                <h1 className="text-3xl font-bold text-gray-800">{userData.username}</h1>
              )}
              <div className="mt-2">
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    readOnly
                    className="text-gray-600 text-center bg-gray-50 rounded-lg p-2 w-full max-w-xs mx-auto cursor-not-allowed"
                  />
                ) : (
                  <p className="text-gray-600">{userData.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <div className="flex items-center">
                        <span className="mr-2">+91</span>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={userData.phoneNumber}
                          onChange={handleInputChange}
                          className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-red-500 bg-transparent"
                          pattern="[0-9]{10}"
                          title="10-digit phone number"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-600">+91 {userData.phoneNumber}</p>
                    )}
                  </div>

                  {isEditing && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-red-500 bg-transparent"
                        placeholder="Enter new password"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-2 border-2 border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                    >
                      <FaSave className="mr-2" />
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                  >
                    <FaEdit className="mr-2" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;