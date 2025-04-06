import React, { forwardRef, useState } from "react";

const HelpDesk = forwardRef((props, ref) => {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [issue, setIssue] = useState("");
  const [urgency, setUrgency] = useState("not urgent");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "R4G5ctQMCOPqzR3WbfrwjQv7FLc8npljpHQTdWdvnEw"; 

  const predefinedIssues = [
    "Injured Animal",
    "Stray in Danger",
    "Abandoned Pet",
    "Animal Abuse",
  ];

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    const imagePromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result);
      });
    });

    Promise.all(imagePromises).then((uploadedImages) => {
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
    });
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const platform = new window.H.service.Platform({ apikey: apiKey });
      const service = platform.getSearchService();

      return new Promise((resolve, reject) => {
        service.reverseGeocode(
          {
            at: `${latitude},${longitude}`,
          },
          (result) => {
            const address = result.items[0];
            if (address) {
              const formattedAddress = `${address.address.street || ""} ${
                address.address.houseNumber || ""
              }, ${address.address.district || ""} ${
                address.address.city || ""
              }, ${address.address.countryName || ""}`;
              resolve(formattedAddress.trim());
            } else {
              resolve(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
            }
          },
          (error) => {
            reject(error);
          }
        );
      });
    } catch (error) {
      return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    }
  };

  const handleLocationTracking = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const address = await getAddressFromCoordinates(latitude, longitude);
          setLocation(address);
        } catch (error) {
          console.error("Error fetching address:", error);
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Please enable location services or enter manually.");
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSubmitReport = async () => {
    if (!images || images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }
    if (!description) {
      alert("Please provide a problem description.");
      return;
    }
    if (!issue) {
      alert("Please select an issue.");
      return;
    }
    if (!location) {
      alert("Please provide your location.");
      return;
    }

    setLoading(true);

    const reportData = {
      images,
      description,
      issue,
      urgency,
      location,
    };

    try {
      const response = await fetch(
        "https://petmitra-version2.onrender.com/api/reports",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reportData),
        }
      );

      if (response.ok) {
        alert('Report Submitted Successfully! \n\nThank you for reporting the situation. Our team is reviewing the information, and help will be on the way shortly.\n\nIn the meantime, here are some steps you can take:\n1. Ensure the safety of the animal and anyone nearby.\n2. Keep the animal calm and avoid any sudden movements or loud noises.\n3. Provide first aid if you are trained, and ensure the animal is in a safe, comfortable space.\n4. Keep track of any changes in the animal’s condition and note any key details to share with the responding team.\n\nRest assured, assistance will be there soon. Stay safe, and thank you for your quick action!');
        setImages([]);
        setDescription("");
        setIssue("");
        setUrgency("not urgent");
        setLocation("");
      } else {
        const errorData = await response.json();
        console.error("Error Response:", errorData);
        alert(`Failed to submit report: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Error submitting report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={ref} className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Help Stray Animals in Need
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Report injured animals and connect with nearby help instantly
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Report a Problem
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="font-semibold mb-2">Upload an Image:</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-blue-500 text-center">
                    <p>📸 Click to upload images</p>
                  </div>
                </label>
                <div className="mt-4 flex flex-wrap gap-2">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded"
                    />
                  ))}
                </div>
                <p className="font-semibold mt-4 mb-2">Description:</p>
                <textarea
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Describe the problem..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold mb-2">Select an Issue:</p>
                <select
                  className="w-full border border-gray-300 rounded p-2"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                >
                  <option value="">-- Select an Issue --</option>
                  {predefinedIssues.map((issue) => (
                    <option key={issue} value={issue}>
                      {issue}
                    </option>
                  ))}
                </select>
                <p className="font-semibold mb-2">Urgency Level:</p>
                <div className="flex gap-4 justify-center">
                  {["very urgent", "urgent", "not urgent"].map((level) => (
                    <label key={level} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="urgency"
                        value={level}
                        checked={urgency === level}
                        onChange={() => setUrgency(level)}
                      />
                      {level}
                    </label>
                  ))}
                </div>
                <p className="font-semibold mb-2">Location:</p>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <button
                  className="mt-2 w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
                  onClick={handleLocationTracking}
                  disabled={loading}
                >
                  {loading ? "Getting Location..." : "📍 Use My Location"}
                </button>
              </div>
            </div>
            <div className="text-center mt-6">
              <button
                className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                onClick={handleSubmitReport}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});

export default HelpDesk;