import React from "react";

const ComplaintsList = ({ complaints }) => {
  console.log(complaints.location);
  return (
    <div className="bg-white w-full h-screen pb-6">
      <h2 className="text-4xl font-bold mb-6 text-uppercase py-4">
        Complaints
      </h2>
      <div className="grid grid-cols-2 gap-8">
        {complaints.length > 0 ? (
          complaints.map((complaint, index) => (
            <div
              key={index}
              className="m-4 border rounded-lg shadow-lg p-4 flex items-center space-x-4 h-full"
            >
              <img
                src={complaint.image || "/path/to/default-image.png"} // Use complaint image or a default image
                alt={`Complaint ${complaint._id}`}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex flex-col justify-center">
                <h3 className="text-xl text-uppercase text-left font-semibold">
                  Complaint ID: {complaint._id}
                </h3>
                <p className="text-gray-700 text-left text-lg mt-2">
                  Location: {complaint.location ? `${complaint.location.lat}, ${complaint.location.lng}` : 'N/A'}
                </p>
                <p className="text-gray-700 text-left text-lg mt-2">
                  Description: {complaint.complaint}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg text-center text-gray-700 mt-4">No complaints available.</p>
        )}
      </div>
    </div>
  );
};

export default ComplaintsList;


// 18.398347192612576, 74.00223141779414
// 18.410614233941434, 73.81477096878608
// 18.55385069690164, 73.97696245444821
// 18.549950901919924, 73.79244025699204