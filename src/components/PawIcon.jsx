// src/components/PawIcon.jsx (Revised for simpler outline)
import React from 'react';

const PawIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Main Pad */}
    <path d="M12 14.5c-2.5 0-4.5 2-4.5 4.5S9.5 23.5 12 23.5s4.5-2 4.5-4.5S14.5 14.5 12 14.5z" fill="currentColor" opacity="0.1"/> {/* Optional faint fill for main pad */}
    <path d="M12 14.5c-2.5 0-4.5 2-4.5 4.5" />

    {/* Toes */}
    <circle cx="8" cy="12.5" r="1.5" />
    <circle cx="11" cy="11" r="1.5" />
    <circle cx="14" cy="11" r="1.5" />
    <circle cx="17" cy="12.5" r="1.5" />

     {/* Connective curves (optional, adjust as needed) */}
     <path d="M8.5 14c.5-1 1.5-2 3.5-2s3 1 3.5 2" />
  </svg>
);

// Even simpler conceptual outline:
const PawIconSimple = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11 5.5c-1.93 0-3.5 1.57-3.5 3.5V11c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2V9c0-1.93-1.57-3.5-3.5-3.5z"/>
      <path d="M7.5 9.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
      <path d="M16.5 9.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
      <path d="M12 14.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>
);


// Let's use the simpler one for the example: PawIconSimple
export default PawIconSimple;