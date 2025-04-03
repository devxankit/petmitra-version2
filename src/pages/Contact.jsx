
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Contact = () => {
    return (
        <>
        <NavBar />
      <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Contact Us</h2>
          <p className="text-gray-700 mb-4">For any inquiries, reach us at:</p>
          <p className="text-blue-500 font-semibold text-lg mb-6">help@petMitra.com</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-blue-600 hover:text-blue-800">Facebook</a>
            <a href="#" className="text-blue-600 hover:text-blue-800">Twitter</a>
            <a href="#" className="text-blue-600 hover:text-blue-800">Instagram</a>
          </div>
        </div>
      </div>
        <Footer />
      </>
    );
  };
  
  export default Contact;
  