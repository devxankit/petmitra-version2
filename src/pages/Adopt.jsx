import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";


const defaultPets = [
  {
    id: 1,
    name: "Bella",
    age: "2 years",
    breed: "Golden Retriever",
    location: "Mumbai",
    image: "https://images.wagwalkingweb.com/media/daily_wag/blog_articles/hero/1670938235.1927571/fun-facts-about-labrador-retrievers.jpg",
  },
  {
    id: 2,
    name: "Milo",
    age: "1 year",
    breed: "Labrador",
    location: "Delhi",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6XMS58bwOyFIN2EVtUlIbP_Cn7h8mHvcJaO_GKVyA2AgPIBRRLYPPc1hRPvTrfLzoU-c&usqp=CAU",
  },
  {
    id: 3,
    name: "Simba",
    age: "3 years",
    breed: "Persian Cat",
    location: "Bangalore",
    image: "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg",
  },
];

export default function Adopt() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [filteredPets, setFilteredPets] = useState([]);
  const [showAdoptForm, setShowAdoptForm] = useState(false);
  const [showListPetForm, setShowListPetForm] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states for adoption
  const [adoptForm, setAdoptForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    reason: ""
  });

  // Form states for listing a pet
  const [listPetForm, setListPetForm] = useState({
    name: "",
    age: "",
    breed: "",
    location: "",
    description: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    image: ""
  });

  // Fetch all pets on component mount
  useEffect(() => {
    const fetchPets = async () => {
      try {
        // Simulated API call with local data
        setPets(defaultPets);
        setFilteredPets(defaultPets);
        
        // Extract unique breeds for filter dropdown
        const uniqueBreeds = [...new Set(defaultPets.map(pet => pet.breed))];
        setBreeds(uniqueBreeds);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pets:", error);
        setError("Failed to load pets. Using default data.");
        setPets(defaultPets);
        setFilteredPets(defaultPets);
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Filter pets based on search and breed selection
  useEffect(() => {
    const filtered = pets.filter(pet => {
      const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase()) || 
                          pet.location.toLowerCase().includes(search.toLowerCase());
      const matchesBreed = selectedBreed === "" || pet.breed === selectedBreed;
      return matchesSearch && matchesBreed;
    });
    
    setFilteredPets(filtered);
  }, [search, selectedBreed, pets]);

  // Handle adoption form input changes
  const handleAdoptFormChange = (e) => {
    const { name, value } = e.target;
    setAdoptForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle list pet form input changes
  const handleListPetFormChange = (e) => {
    const { name, value } = e.target;
    setListPetForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit adoption request
  const handleAdoptSubmit = (e) => {
    e.preventDefault();
    alert("Adoption request submitted successfully!)");
    setShowAdoptForm(false);
    setAdoptForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      reason: ""
    });
  };

  // Submit list pet form
  const handleListPetSubmit = (e) => {
    e.preventDefault();
    
    const newPet = {
      ...listPetForm,
      id: Date.now(), // Temporary unique ID
      image: listPetForm.image || "https://source.unsplash.com/300x200/?pet"
    };

    setPets(prev => [...prev, newPet]);
    setFilteredPets(prev => [...prev, newPet]);
    
    alert("Pet listed for adoption successfully!");
    setShowListPetForm(false);
    setListPetForm({
      name: "",
      age: "",
      breed: "",
      location: "",
      description: "",
      ownerName: "",
      ownerEmail: "",
      ownerPhone: "",
      image: ""
    });
  };

  // Open adoption form for a specific pet
  const openAdoptForm = (pet) => {
    setSelectedPet(pet);
    setShowAdoptForm(true);
  };

  return (
    <>
      <NavBar />
      <div className="p-6 lg:p-12">
        {/* Hero Section */}
        <section className="text-center py-16 bg-blue-100 rounded-2xl">
          <h1 className="text-4xl font-bold text-blue-700">Find Your Perfect Companion</h1>
          <p className="text-lg text-gray-600 mt-2">Adopt, Don't Shop! Give a pet a loving home.</p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => window.scrollTo({top: document.getElementById('pets-section').offsetTop, behavior: 'smooth'})}
            >
              View Pets
            </button>
            <button 
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              onClick={() => setShowListPetForm(true)}
            >
              List Your Pet
            </button>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="mt-10 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700">Search for a Pet</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <input
              type="text"
              placeholder="Search by name or location"
              className="border border-gray-300 p-2 rounded-md w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="border border-gray-300 p-2 rounded-md w-full"
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
            >
              <option value="">All Breeds</option>
              {breeds.map((breed, index) => (
                <option key={index} value={breed}>{breed}</option>
              ))}
            </select>
            <button 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full"
              onClick={() => {
                if (search === "" && selectedBreed === "") {
                  setFilteredPets(pets);
                }
              }}
            >
              Search
            </button>
          </div>
        </section>

        {/* Pet Listings */}
        <section id="pets-section" className="mt-10">
          <h2 className="text-3xl font-bold text-gray-800">Available Pets</h2>
          {loading ? (
            <div className="text-center py-10">
              <p className="text-gray-600">Loading pets...</p>
            </div>
          ) : (
            <>
              {filteredPets.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-600">No pets match your search criteria. Try adjusting your filters or <button 
                    className="text-blue-600 underline" 
                    onClick={() => setShowListPetForm(true)}
                  >
                    list a pet for adoption
                  </button>.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {filteredPets.map((pet) => (
                    <div key={pet.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                      <img 
                        src={pet.image || "https://source.unsplash.com/300x200/?pet"} 
                        alt={pet.name} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800">{pet.name}</h3>
                        <div className="mt-2 space-y-1">
                          <p className="text-gray-600"><span className="font-medium">Age:</span> {pet.age}</p>
                          <p className="text-gray-600"><span className="font-medium">Breed:</span> {pet.breed}</p>
                          <p className="text-gray-600"><span className="font-medium">Location:</span> {pet.location}</p>
                          {pet.description && (
                            <p className="text-gray-600 mt-2">{pet.description}</p>
                          )}
                        </div>
                        <button 
                          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                          onClick={() => openAdoptForm(pet)}
                        >
                          Adopt Me
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {error && (
            <div className="text-center py-6">
              <p className="text-amber-600">{error}</p>
            </div>
          )}
        </section>

        {/* FAQs */}
        <section className="mt-14">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold">How much does it cost to adopt a pet?</h3>
              <p className="text-gray-600">Adoption fees vary but are typically affordable and cover vaccinations and basic medical care.</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold">What documents are required?</h3>
              <p className="text-gray-600">A valid ID and proof of residence are required. Some pets may require additional verification.</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold">How long does the adoption process take?</h3>
              <p className="text-gray-600">Once your application is submitted, the process typically takes 1-2 weeks for review and approval.</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold">Can I list my pet for adoption?</h3>
              <p className="text-gray-600">Yes, you can list your pet for adoption through our platform. Click the "List Your Pet" button above.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Adoption Form Modal */}
      {showAdoptForm && selectedPet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Adopt {selectedPet.name}</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowAdoptForm(false)}
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleAdoptSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={adoptForm.name}
                      onChange={handleAdoptFormChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={adoptForm.email}
                      onChange={handleAdoptFormChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={adoptForm.phone}
                      onChange={handleAdoptFormChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Address</label>
                    <textarea
                      name="address"
                      value={adoptForm.address}
                      onChange={handleAdoptFormChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Why do you want to adopt {selectedPet.name}?</label>
                    <textarea
                      name="reason"
                      value={adoptForm.reason}
                      onChange={handleAdoptFormChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Submit Adoption Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* List Pet Form Modal */}
      {showListPetForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">List Your Pet for Adoption</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowListPetForm(false)}
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleListPetSubmit}>
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700">Pet Information</h3>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Pet Name</label>
                    <input
                      type="text"
                      name="name"
                      value={listPetForm.name}
                      onChange={handleListPetFormChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Age</label>
                    <input
                      type="text"
                      name="age"
                      value={listPetForm.age}
                      onChange={handleListPetFormChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      placeholder="e.g. 2 years"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Breed</label>
                    <input
                      type="text"
                      name="breed"
                      value={listPetForm.breed}
                      onChange={handleListPetFormChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={listPetForm.location}
                      onChange={handleListPetFormChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={listPetForm.description}
                      onChange={handleListPetFormChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      rows="3"
                      placeholder="Tell us about your pet's personality, habits, etc."
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      name="image"
                      value={listPetForm.image}
                      onChange={handleListPetFormChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      placeholder="https://example.com/pet-image.jpg"
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave blank to use a placeholder image</p>
                  </div>
                  
                  <h3 className="font-semibold text-gray-700 pt-2">Owner Information</h3>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      name="ownerName"
                      value={listPetForm.ownerName}
                      onChange={handleListPetFormChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="ownerEmail"
                      value={listPetForm.ownerEmail}
                      onChange={handleListPetFormChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="ownerPhone"
                      value={listPetForm.ownerPhone}
                      onChange={handleListPetFormChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <button 
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                  >
                    List Pet for Adoption
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}