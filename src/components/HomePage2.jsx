import React, { useRef, useEffect } from 'react'; // <-- Import useEffect
import { useLocation, useNavigate } from 'react-router-dom'; // <-- Import hooks from router
import MovingCards from './MovingCards';
import HelpDesk from './HelpDesk'; // <-- Make sure HelpDesk uses forwardRef (see step 2 below)
import LocationTracker2 from './LocationTracker2';
import ChatBot2 from './Chatbot2';
import NavBar from './NavBar';
import CampaignBanner from './CampaignBanner';

const HomePage2 = () => {
    const helpDeskRef = useRef(null);
    const location = useLocation(); // <-- Get location object
    const navigate = useNavigate(); // <-- Get navigate function

    // Original function for the internal button (can keep or remove if not needed elsewhere)
    const scrollToHelpDeskInternal = () => {
        console.log("Internal scroll button clicked.");
        helpDeskRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Effect to handle scrolling based on navigation state
    useEffect(() => {
        // Check if state exists and contains the signal to scroll to HelpDesk
        // Use the SAME key ('scrollToSection') and VALUE ('helpDeskSection') as sent from MobileBottomNav
        if (location.state?.scrollToSection === 'helpDeskSection') {
            console.log("Navigation state detected: Scrolling to HelpDesk.");

            // Use setTimeout to ensure HelpDesk ref is available after render/navigation
            const timer = setTimeout(() => {
                if (helpDeskRef.current) {
                    console.log("HelpDesk ref found, scrolling...");
                    helpDeskRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

                    // IMPORTANT: Clear the state after scrolling to prevent re-scrolling
                    navigate(location.pathname, { replace: true, state: {} });
                } else {
                    // This might happen if HelpDesk rendering is delayed or conditional
                    console.warn("HelpDesk ref not found when trying to scroll.");
                }
            }, 100); // Adjust delay slightly if needed (100ms is usually safe)

            // Cleanup function for the timeout
            return () => clearTimeout(timer);
        }
    }, [location.state, navigate, location.pathname]); // Dependencies: run when state or navigate changes


    // --- Rest of your component ---
    return (
        <div className="min-h-screen bg-white">
            {/* Top Section */}
            <div className="h-auto md:h-[470px] bg-blue-200 rounded-br-[150px] md:rounded-br-[350px] overflow-hidden">
                <NavBar />
                <div className="max-w-7xl mx-auto px-4 pb-8 pt-16 md:py-16 flex flex-col md:flex-row justify-between items-center">
                    <div className="max-w-full md:max-w-2xl mb-8 md:mb-[150px] text-center md:text-left">
                        <p className="text-purple-700 mb-4 text-lg md:text-xl">Be the voice of voiceless</p>
                        <h1 className="text-purple-600 text-4xl md:text-6xl font-bold mb-6 md:mb-8">
                            Animal Rescue &<br />
                            Welfare Platform
                        </h1>
                        {/* This button uses the internal scroll function */}
                        <button
                            onClick={scrollToHelpDeskInternal}
                            className="bg-purple-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-base md:text-lg font-medium hover:bg-purple-700 transition-colors"
                        >
                            Report a Problem
                        </button>
                    </div>
                    {/* Image */}
                    <div className="relative">
                        <div className="w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-white rounded-full overflow-hidden mx-auto md:mx-0">
                            <div className="absolute inset-0 rounded-full">
                                <img
                                    src="https://media.istockphoto.com/id/1278578528/photo/group-of-different-purebred-dogs-from-small-to-large-sitting-looking-at-the-camera-on-a-white.jpg?s=612x612&w=0&k=20&c=6mIGSD_EqTEUrfRMd4Eufjt7VuTpSDQYuOUOLdApbk0="
                                    alt="Dogs"
                                    className="object-cover w-full h-full rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div> {/* End Top Section */}

            {/* Other Sections */}
            <CampaignBanner />
            <MovingCards />

            {/* The HelpDesk component where the ref is attached */}
            <HelpDesk ref={helpDeskRef} />

            <LocationTracker2 />
            <ChatBot2 />
            {/* Make sure MobileBottomNav is rendered in your main App layout */}
        </div>
    );
};

export default HomePage2;