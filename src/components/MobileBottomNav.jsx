// src/components/MobileBottomNav.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use React Router for navigation
import {
  PencilSquareIcon,
  ArchiveBoxIcon,       // Assuming this icon is for Login/Archive based on your last code
  HomeIcon as HomeIconSolid,
} from '@heroicons/react/24/outline'; // Using outline icons
import PawIcon from './PawIcon'; // Make sure this path is correct

const MobileBottomNav = () => {
  const navigate = useNavigate();

  // Standard navigation function for most buttons
  const handleNavigate = (path) => {
    console.log(`Navigating directly to: ${path}`);
    navigate(path);
  };

  // Special handler for the Report Case button to navigate home and trigger scroll
  const handleReportClick = () => {
    console.log('Report button clicked, navigating home and signaling scroll to HelpDesk...');
    // Navigate to the home page ('/') and pass state to signal scrolling
    navigate('/', {
      // Use a descriptive key/value pair that HomePage2 will look for
      state: { scrollToSection: 'helpDeskSection' }
    });
  };

  // --- Style Constants (Slimmed down version) ---
  const iconSize = "h-5 w-5";
  const iconBorderStyle = "rounded-full border border-indigo-600 p-1.5 mb-0.5";
  const iconContainerStyle = "flex flex-col items-center justify-center p-1 cursor-pointer text-indigo-700 hover:text-indigo-900 transition-colors duration-150";
  const textStyle = "text-xs font-medium";
  // --- End Style Constants ---

  return (
    // Main container - fixed bottom, full width, flex layout, hidden on medium screens+, white bg, subtle top border and shadow
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden bg-white py-0.5 border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">

      {/* Report Case Item - Uses the special handleReportClick */}
      <button
        onClick={handleReportClick} // <-- Use the scroll-triggering handler
        className={`${iconContainerStyle} flex-1`} // flex-1 distributes space evenly
        aria-label="Report Case"
      >
        <div className={iconBorderStyle}>
          <PencilSquareIcon className={iconSize} />
        </div>
        {/* Text label specific to this button */}
        <span className={`${textStyle} text-indigo-800`}>Report Case</span>
      </button>

      {/* Archive/Login Item - Uses standard navigation */}
      {/* Updated path to /login based on your last code snippet */}
      <button
        onClick={() => handleNavigate('/login')} // <-- Use standard navigation
        className={`${iconContainerStyle} flex-1`}
        aria-label="Login / Archive" // Updated Aria Label for clarity
      >
        <div className={iconBorderStyle}>
          <ArchiveBoxIcon className={iconSize} />
        </div>
        {/* No text label as per previous examples */}
      </button>

      {/* Paw/Adopt Item - Uses standard navigation */}
      {/* Updated path to /adopt based on your last code snippet */}
      <button
        onClick={() => handleNavigate('/adopt')} // <-- Use standard navigation
        className={`${iconContainerStyle} flex-1`}
        aria-label="Adopt a Pet" // Updated Aria Label
      >
        <div className={iconBorderStyle}>
          <PawIcon className={iconSize} />
        </div>
        {/* No text label */}
      </button>

      {/* Home Item - Uses standard navigation */}
      <button
        onClick={() => handleNavigate('/')} // <-- Use standard navigation
        className={`${iconContainerStyle} flex-1`}
        aria-label="Home"
      >
        <div className={iconBorderStyle}>
          <HomeIconSolid className={iconSize} />
        </div>
        {/* No text label */}
      </button>

    </nav>
  );
};

export default MobileBottomNav;