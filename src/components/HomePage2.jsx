import React, {useRef} from 'react';
import MovingCards from './MovingCards';
import HelpDesk from './HelpDesk';
import LocationTracker from './LocationTracker';
import LocationTracker2 from './LocationTracker2';
import Chatbot from './Chatbot';
import ChatBot2 from './Chatbot2';
import PetForm from './PetForm';
import NavBar from './NavBar';



const HomePage2 = () => {

    const helpDeskRef = useRef(null);

    const scrollToHelpDesk = () => {
      helpDeskRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };


    return (
        <div className="min-h-screen bg-white">
            <div className="h-[470px] bg-blue-200 rounded-br-[350px] overflow-hidden">
                {/* Navigation */}
                <NavBar />

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 py-16 flex justify-between items-center">
                    <div className="max-w-2xl mb-[150px]">
                        <p className="text-purple-700 mb-4 text-xl">Be the voice of voiceless</p>
                        <h1 className="text-purple-600 text-6xl font-bold mb-8">
                            Animal Rescue &<br />
                            Welfare Platform 
                        </h1>
                        <button onClick={scrollToHelpDesk} className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-purple-700 transition-colors">
                            Report a Problem
                        </button>
                    </div>

                    <div className="relative">
                        <div className="w-[400px] h-[400px] bg-white rounded-full overflow-hidden">
                            <div className="absolute inset-0 rounded-full"  >
                                <img
                                    src="https://media.istockphoto.com/id/1278578528/photo/group-of-different-purebred-dogs-from-small-to-large-sitting-looking-at-the-camera-on-a-white.jpg?s=612x612&w=0&k=20&c=6mIGSD_EqTEUrfRMd4Eufjt7VuTpSDQYuOUOLdApbk0="
                                    alt="Dogs"
                                    className="object-cover w-full h-full rounded-full"

                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <MovingCards />
            <HelpDesk ref={helpDeskRef}  />
            {/* <LocationTracker /> */}
            <LocationTracker2 />
            {/* <Chatbot/> */}
            <ChatBot2/>
            {/* <PetForm/> */}
            
        </div>
    );
};

export default HomePage2;