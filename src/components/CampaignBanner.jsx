import React from 'react';

const CampaignBanner = () => {
  return (
    // Container: Full width, fixed height, background, flex layout for content
    <div className="w-full h-24 bg-gradient-to-  bg-white  flex items-center justify-center sm:justify-between px-4 sm:px-6 shadow-sm overflow-hidden">

      {/* Campaign Message Section */}
      <div className="text-center sm:text-left">
        <p className="text-base sm:text-lg font-semibold text-orange-800">
          Join Pet-Mitra's Mission: Be a Friend to Strays!
        </p>
        {/* Blinking Tagline */}
        <p className="text-sm sm:text-base text-gray-700 mt-1">
          Your small act of kindness makes a world of difference.{' '}
          <span className="font-bold text-red-600 animate-pulse">
            🐾 Help Save a Life Today!
          </span>
        </p>
      </div>

      {/* Optional Call to Action Button (hidden on very small screens for space) */}
      <div className="hidden sm:block ml-4">
     
      </div>

    </div>
  );
};

export default CampaignBanner;