import React, { useState } from "react";
import MapboxComponent from "../components/MapLocationSelection";
import axios from "axios";
import NavBar from "../components/Navbar";

function Forum() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [showMap, setShowMap] = useState(false);
  const [complaint, setComplaint] = useState("");
  const [loading, setLoading] = useState(false); // For loading state

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the file, not the URL
  };

  const handleLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation({ lat: lat, lng: lng });
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
    setLocation({ lat: lat, lng: lng });
    setShowMap(false); // Hide the map after selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts
    const formData = new FormData();
    formData.append("image", image); // Append the file itself
    formData.append("location", JSON.stringify(location)); // Stringify location data
    formData.append("complaint", complaint);

    try {
      const response = await axios.post(`/api/complaint`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        alert("Complaint submitted successfully!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false once submission is complete
    }
  };

  return (
    <>
      <NavBar id={"black"} />
      <div className="mx-auto p-6 bg-white shadow-lg rounded-lg my-28 w-[60rem]">
        <h2 className="text-2xl font-semibold mb-4">Submit a Complaint</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Upload Photo</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {image && (
              <img
                src={URL.createObjectURL(image)} // For preview
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
            {location.lat && location.lng && (
              <p className="my-4 text-sm text-gray-600">
                Location: Lat: {location.lat}, Lng: {location.lng}
              </p>
            )}
          </div>

          {showMap && (
            <div className="my-2">
              <MapboxComponent onLocationSelect={handleLocationSelect} />
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2">Your Complaint</label>
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-vertical"
              placeholder="Write your complaint here..."
              aria-label="Complaint"
              minLength={10} // example validation
              maxLength={500} // example validation
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Forum;
