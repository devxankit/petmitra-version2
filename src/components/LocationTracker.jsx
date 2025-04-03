import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { MapPin, Loader } from "lucide-react";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "12px",
};

const LocationTracker = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace with your API Key
  });

  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLocationTracking = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setShowMap(true);
          setLoading(false);
        },
        () => {
          alert("Failed to get location. Enable GPS or enter manually.");
          setLoading(false);
        }
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Find Nearby Help</h2>

      <button
        className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 mx-auto"
        onClick={handleLocationTracking}
        disabled={loading}
      >
        {loading ? (
          <Loader className="animate-spin h-5 w-5" />
        ) : (
          <MapPin className="h-5 w-5" />
        )}
        {loading ? "Fetching Location..." : "Track My Location"}
      </button>

      {showMap && isLoaded && location && (
        <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 shadow-md">
          <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={location}>
            <Marker position={location} />
          </GoogleMap>
        </div>
      )}
    </div>
  );
};

export default LocationTracker;
