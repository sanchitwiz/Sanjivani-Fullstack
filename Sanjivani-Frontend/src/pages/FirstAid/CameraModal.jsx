import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const CameraModal = ({ onClose, onSearch, setImageResult }) => {
  const [isCaptured, setIsCaptured] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [result, setResult] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const cancelledCamera = () => {
    stopCamera();
    onClose();
  };

  const startCamera = async () => {
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'user' } },
      });
      setStream(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsLoading(false);
    } catch (error) {
      handleCameraError(error);
      setIsLoading(false);
    }
  };

  const stopCamera = () => {

    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };


  const handleCameraError = (error) => {
    if (error.name === 'NotFoundError') {
      setErrorMessage('No camera found on this device.');
    } else if (error.name === 'NotAllowedError') {
      setErrorMessage('Permission to access the camera was denied.');
    } else if (error.name === 'NotReadableError') {
      setErrorMessage('The camera is currently being used by another application.');
    } else {
      setErrorMessage('An unexpected error occurred while accessing the camera.');
    }
    console.error('Error accessing the camera:', error);
    stopCamera();
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext('2d');
      
      const targetWidth = 300; // Adjust the target width
      const targetHeight = (video.videoHeight / video.videoWidth) * targetWidth;
      
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      context.drawImage(video, 0, 0, targetWidth, targetHeight);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
          setIsCaptured(true);
          setCapturedImage(URL.createObjectURL(blob));

          stopCamera();
          saveImageToServer(file);
        }
      }, 'image/jpeg', 0.7);
    }
    stopCamera();
  };

  const saveImageToServer = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
  
    try {
      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setResult(response.data);
      setImageResult(JSON.stringify(response.data.predicted_injury_name, null, 2));
      console.log('Image saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving image:', error);
    } finally {
      stopCamera();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 overflow-hidden mt-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[45%]">
        <h2 className="text-xl font-bold mb-4">Scan Your Condition</h2>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        {isLoading && (
          <div className="flex items-center justify-center mb-4">
            <p>Loading camera...</p>
          </div>
        )}

        <div className="w-full h-[400px] bg-gray-300 mb-4 flex items-center justify-center">
          {!isCaptured ? (
            !isLoading && (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
                onLoadedData={() => setErrorMessage(null)}
              />
            )
          ) : (
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-full object-cover"
            />
          )}
          <canvas ref={canvasRef} className="hidden" width={640} height={480} />
        </div>

        {!isCaptured ? (
          <button
            className="bg-[#bc181d] text-white px-4 py-2 rounded-md hover:bg-white hover:text-[#bc181d] hover:border-[#bc181d] border-2 transition duration-300"
            onClick={captureImage}
            disabled={isLoading || errorMessage}
          >
            Capture
          </button>
        ) : (
          <button
            className="bg-[#bc181d] text-white px-4 py-2 rounded-md hover:bg-white hover:text-[#bc181d] hover:border-[#bc181d] border-2 transition duration-300"
            onClick={onSearch}
          >
            Search
          </button>
        )}

        <button
          className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all"
          onClick={cancelledCamera}
        >
          Close
        </button>

        {/* Display backend results */}
        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded shadow">
            <h3 className="text-lg font-semibold">Result:</h3>
            <pre className="text-sm text-gray-700">{JSON.stringify(result.predicted_injury_name, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraModal;