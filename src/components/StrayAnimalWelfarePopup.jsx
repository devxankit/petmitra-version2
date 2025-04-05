import React, { useState, useEffect } from 'react';

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const StrayAnimalWelfarePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4 transition-opacity duration-300 ease-out">
      <div className="relative w-full max-w-md transform rounded-lg bg-white p-6 shadow-2xl transition-all duration-300 ease-out scale-100 animate-fade-in">
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 z-10 rounded-full bg-gray-100 p-1 text-gray-700 shadow-md transition hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Close popup"
        >
          <CloseIcon />
        </button>

        <div className="mb-4 overflow-hidden rounded-lg shadow-md">
          <img
            src="https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" // Previous image restored
            alt="A stray animal looking hopeful"
            className="h-48 w-full object-cover transition duration-300 hover:scale-105"
          />
        </div>

        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-orange-600 md:text-3xl">
            They Need a <span className="text-red-600">Friend</span>!
          </h2>
          <p className="mb-4 text-base text-gray-800 md:text-lg">
            Countless strays face hardship daily. Your kindness can change their world. Be their <span className="font-semibold text-orange-600">Mitra</span>.
          </p>

          <p className="mb-6 animate-pulse text-xl font-extrabold text-red-600">
            🚨 Be Their Hope! Act Now! 🚨
          </p>

           <p className="mb-5 text-sm text-gray-700 md:text-base">
             Help is simple: Consider <strong className='text-emerald-700'>Adopting</strong>, <strong className='text-blue-700'>Donating</strong>, <strong className='text-purple-700'>Volunteering</strong>, or just <strong className='text-yellow-800'>Reporting</strong> an animal in distress.
           </p>

          <button
            onClick={() => {
              alert("Button clicked! Link this to your 'Learn More' or 'Donate' page.");
              handleClose();
            }}
            className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          >
            Discover How to Help
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StrayAnimalWelfarePopup;