import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import LocationTracker2 from '../components/LocationTracker2'; // Import the LocationTracker2 component

const Dashboard = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null); // For the popup/modal
  const [showPopup, setShowPopup] = useState(false); // To toggle the popup/modal

  // Filter states
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  // Fetch cases from API
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch('https://petmitra-version2.onrender.com/api/reports'); // Update API URL
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setCases(data || []); // Ensure data is an array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  // Filter and sort functions
  const filteredCases = cases
    .filter((case_) => {
      const matchesUrgency =
        urgencyFilter === 'all' || case_.urgency === urgencyFilter;
      const matchesSearch =
        case_.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        case_.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        case_.animalType?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesUrgency && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  // Urgency badge styles
  const urgencyStyles = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  // Status badge styles
  const statusStyles = {
    pending: 'bg-orange-100 text-orange-800',
    addressed: 'bg-green-100 text-green-800',
  };

  // Handle status update
  const handleStatusUpdate = (caseId, newStatus, userName) => {
    setCases((prevCases) =>
      prevCases.map((case_) =>
        case_._id === caseId
          ? { ...case_, status: newStatus, updatedBy: userName }
          : case_
      )
    );
  };

  // Handle opening the share popup
  const handleOpenSharePopup = (case_) => {
    setSelectedCase(case_);
    setShowPopup(true);
  };

  // Handle closing the share popup
  const handleCloseSharePopup = () => {
    setSelectedCase(null);
    setShowPopup(false);
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto pt-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Search cases..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
              >
                <option value="all">All Urgency Levels</option>
                <option value="high">High Urgency</option>
                <option value="medium">Medium Urgency</option>
                <option value="low">Low Urgency</option>
              </select>

              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Loading & Error Handling */}
          {loading && (
            <p className="text-center text-gray-500">Loading cases...</p>
          )}
          {error && (
            <p className="text-center text-red-500">Error: {error}</p>
          )}

          {/* Cases Grid */}
          {!loading && !error && filteredCases.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCases.map((case_) => (
                <div
                  key={case_._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative h-48">
                    <img
                      src={case_.images?.[0] || '/placeholder-image.jpg'}
                      alt={`Case ${case_._id}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          urgencyStyles[case_.urgency] || ''
                        }`}
                      >
                        {case_.urgency
                          ? case_.urgency.charAt(0).toUpperCase() +
                            case_.urgency.slice(1)
                          : 'Unknown'}{' '}
                        Urgency
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {case_.animalType || 'Unknown Animal'}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          statusStyles[case_.status] || ''
                        }`}
                      >
                        {case_.status
                          ? case_.status.charAt(0).toUpperCase() +
                            case_.status.slice(1)
                          : 'Unknown'}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">
                      {case_.description || 'No description available.'}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="text-sm text-gray-600">
                          {case_.location || 'Unknown Location'}
                        </span>
                      </div>

                      {/* Display reporter's name and phone number */}
                      <div className="flex items-start">
                        <div>
                          <p className="text-sm text-gray-600 font-semibold">
                            Reporter Name: {case_.xname || 'Unknown'}
                          </p>
                          <p className="text-sm text-gray-500">
                            Contact: {case_.phone || 'No contact info'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                      View Details
                    </button>

                    {/* Status Button */}
                    <button
                      className="mt-4 w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                      onClick={() =>
                        handleStatusUpdate(
                          case_._id,
                          case_.status === 'pending' ? 'addressed' : 'pending',
                          'Current User'
                        )
                      }
                    >
                      {case_.status === 'pending'
                        ? 'Mark as Addressed'
                        : 'Mark as Pending'}
                    </button>

                    {/* Share Button */}
                    <button
                      className="mt-2 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                      onClick={() => handleOpenSharePopup(case_)}
                    >
                      Share with Nearest Vet Hospitals
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredCases.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No cases found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Popup/Modal for Sharing */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4">Share Case</h2>
            <LocationTracker2 /> {/* Render the LocationTracker2 component */}
            <button
              className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              onClick={handleCloseSharePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Dashboard;