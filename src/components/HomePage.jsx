// HomePage.jsx

import React, { useState } from 'react';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleLocationTracking = () => {
    alert("Location tracking feature will be implemented here");
  };

  const handleFindHospitals = () => {
    alert("Nearby hospitals feature will be implemented here");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Pet Mitra</div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? "✕" : "☰"}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
            <a href="/about" className="text-gray-700 hover:text-blue-600">About</a>
            <a href="/services" className="text-gray-700 hover:text-blue-600">Services</a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600">Contact</a>
            <button className="px-4 py-2 border rounded hover:bg-blue-50">Login</button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="/about" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="/services" className="text-gray-700 hover:text-blue-600">Services</a>
              <a href="/contact" className="text-gray-700 hover:text-blue-600">Contact</a>
              <button className="px-4 py-2 border rounded hover:bg-blue-50 w-full">Login</button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Help Stray Animals in Need
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Report injured animals and connect with nearby help instantly
          </p>
        </div>

        {/* Main Action Buttons */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Report Problem Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Report a Problem</h2>
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
              />
              <label htmlFor="imageUpload">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-blue-500">
                  <p>📸 Click to upload an image</p>
                </div>
              </label>
              {selectedImage && (
                <div className="mt-4">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="max-w-full h-auto rounded"
                  />
                </div>
              )}
            </div>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Submit Report
            </button>
          </div>

          {/* Location Services Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Find Nearby Help</h2>
            <div className="space-y-4">
              <button
                className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-50"
                onClick={handleLocationTracking}
              >
                📍 Track My Location
              </button>
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={handleFindHospitals}
              >
                Find Nearest Hospitals
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;