import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import {
  PencilSquareIcon,
  ArchiveBoxIcon,       
  HomeIcon as HomeIconSolid,
} from '@heroicons/react/24/outline'; 
import PawIcon from './PawIcon'; 
const MobileBottomNav = () => {
  const navigate = useNavigate();


  const handleNavigate = (path) => {
    console.log(`Navigating directly to: ${path}`);
    navigate(path);
  };


  const handleReportClick = () => {
    console.log('Report button clicked, navigating home and signaling scroll to HelpDesk...');
  
    navigate('/', {

      state: { scrollToSection: 'helpDeskSection' }
    });
  };


  const iconSize = "h-5 w-5";
  const iconBorderStyle = "rounded-full border border-indigo-600 p-1.5 mb-0.5";
  const iconContainerStyle = "flex flex-col items-center justify-center p-1 cursor-pointer text-indigo-700 hover:text-indigo-900 transition-colors duration-150";
  const textStyle = "text-xs font-medium";
  

  return (

<nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden bg-white py-0.5 border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">

      {/* Report Case Item - Uses the special handleReportClick */}
      <button
        onClick={handleReportClick} 
        className={`${iconContainerStyle} flex-1`} 
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
        onClick={() => handleNavigate('/login')} 
        className={`${iconContainerStyle} flex-1`}
        aria-label="Login / Archive" 
      >
        <div className={iconBorderStyle}>
          <ArchiveBoxIcon className={iconSize} />
        </div>
        {/* No text label as per previous examples */}
      </button>

      {/* Paw/Adopt Item - Uses standard navigation */}
      {/* Updated path to /adopt based on your last code snippet */}
      <button
        onClick={() => handleNavigate('/adopt')} 
        className={`${iconContainerStyle} flex-1`}
        aria-label="Adopt a Pet" 
      >
        <div className={iconBorderStyle}>
          <PawIcon className={iconSize} />
        </div>
        {/* No text label */}
      </button>

      {/* Home Item - Uses standard navigation */}
      <button
        onClick={() => handleNavigate('/')} 
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