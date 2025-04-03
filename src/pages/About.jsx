import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer';

const About = () => {
    return (

      
        <> 
        <NavBar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-gray-600 leading-relaxed">
            Welcome to our platform dedicated to the welfare of pets and stray animals. Our mission is to
            provide accessible medical services, facilitate pet adoptions, and ensure proper nourishment
            for animals in need.
          </p>
          <h2 className="text-2xl font-semibold text-gray-700 mt-6">Our Services</h2>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
            <li>Locate nearby animal hospitals for emergency and routine care.</li>
            <li>Connect pet seekers with shelters and adoption centers.</li>
            <li>Find pet food stores to support animal nourishment.</li>
            <li>Real-time location tracking for easy navigation.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-gray-700 mt-6">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            We aim to build a compassionate community where every animal gets the care, love, and support
            they deserve. Join us in making a difference.
          </p>
        </div>
      </div>
      <Footer />
      </>
    );
  };
  
  export default About;
  
