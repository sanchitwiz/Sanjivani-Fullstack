import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdArrowBack, MdWarning, MdDescription } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaRegFilePdf } from 'react-icons/fa';

const ScanYourLabReports = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [anomalies, setAnomalies] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.pdf',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
      setAnomalies(null);
    },
  });

  const analyzeLabReport = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnomalies([
        { test: 'Blood Sugar', result: 'High', normalRange: '70-100 mg/dL', userValue: '150 mg/dL' },
        { test: 'Cholesterol', result: 'High', normalRange: 'Below 200 mg/dL', userValue: '250 mg/dL' },
      ]);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="bg-red-50 min-h-screen py-8 px-4 lg:px-8">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 mb-8 rounded-b-lg shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="hover:text-red-200 flex items-center">
            <MdArrowBack className="mr-2" /> Back
          </Link>
          <h1 className="text-2xl font-serif font-bold flex items-center">
            <FaHeartbeat className="mr-3" /> Lab Report Analysis
          </h1>
          <div className="w-32"></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-red-200 rounded-xl p-8 text-center cursor-pointer hover:border-red-400 transition-colors group"
          >
            <input {...getInputProps()} />
            <div className="text-red-500 flex justify-center mb-4">
              <FaRegFilePdf className="w-12 h-12 group-hover:text-red-600 transition-colors" />
            </div>
            <p className="text-lg font-medium text-red-700 mb-2">
              Drag & Drop PDF Report
            </p>
            <p className="text-red-500 text-sm">or click to browse files</p>
          </div>

          {selectedFile && (
            <div className="mt-6">
              <div className="flex items-center justify-between bg-red-50 p-4 rounded-lg mb-4">
                <div className="flex items-center">
                  <MdDescription className="text-red-600 mr-3" />
                  <span className="font-medium">{selectedFile.name}</span>
                </div>
                <button 
                  onClick={() => {
                    setSelectedFile(null);
                    setFilePreview(null);
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <embed 
                  src={filePreview} 
                  type="application/pdf" 
                  className="w-full h-96" 
                />
              </div>

              <button
                onClick={analyzeLabReport}
                disabled={isAnalyzing}
                className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Analyzing...
                  </>
                ) : (
                  'Analyze Report'
                )}
              </button>
            </div>
          )}
        </div>

        {/* Anomalies Panel */}
        <div className="bg-white rounded-xl shadow-lg p-6 h-fit sticky top-6">
          <h2 className="text-xl font-serif font-bold text-red-700 mb-4 flex items-center">
            <MdWarning className="mr-2 text-red-600" /> Detected Anomalies
          </h2>

          {anomalies ? (
            <div className="space-y-4">
              {anomalies.map((anomaly, index) => (
                <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-600">
                  <h3 className="font-semibold text-red-800">{anomaly.test}</h3>
                  <div className="mt-2 space-y-1 text-sm">
                    <p><span className="font-medium">Result:</span> {anomaly.result}</p>
                    <p><span className="font-medium">Normal Range:</span> {anomaly.normalRange}</p>
                    <p><span className="font-medium">Your Value:</span> {anomaly.userValue}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-red-500">
              <p>Upload a lab report to analyze</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanYourLabReports;