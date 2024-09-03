import React, { useState } from "react";
import MapboxComponent from "../components/MapLocationSelection";
import NavBar from "../components/Navbar";

function Forum() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [complaint, setComplaint] = useState("");

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation(`Lat: ${lat}, Lng: ${lng}`);
        },
        (error) => {
          console.error(error);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSelectFromMap = () => {
    setShowMap(true);
  };

  const handleLocationSelect = (lat, lng) => {
    setLocation(`Lat: ${lat}, Lng: ${lng}`);
    setShowMap(false); // Hide the map after selection
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      image,
      location,
      complaint,
    };
    console.log("Form Data:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <>
      <NavBar />
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Submit a Complaint</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Upload Photo</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {image && (
              <img
                src={image}
                alt="Preview"
                className="mt-4 w-32 h-32 object-cover"
              />
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Select Location</label>
            <div className="space-x-4">
              <button
                type="button"
                onClick={handleLiveLocation}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Use Live Location
              </button>
              <button
                type="button"
                onClick={handleSelectFromMap}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Select from Map
              </button>
            </div>
            {location && (
              <p className="mt-2 text-sm text-gray-600">Location: {location}</p>
            )}
          </div>

          {showMap && (
            <div className="mt-4">
              <MapboxComponent onLocationSelect={handleLocationSelect} />
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2">Your Complaint</label>
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your complaint here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </div>{" "}
    </>
  );
}

export default Forum;
