import React from "react";
import bg from "../Assests/images/user.png";
// import NavBar from "./Navbar";

const ComplaintsList = ({ complaints }) => {
  console.log(complaints);

  return (
    <>
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
                  src={bg}
                  alt={complaint._id}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl text-uppercase text-left font-semibold">
                    Complaint ID: {complaint._id}
                  </h3>
                  <p className="text-gray-700 text-left text-lg mt-4">
                    Location:{" "}
                    {complaint.location
                      ? `${complaint.location.lat}, ${complaint.location.lng}`
                      : "N/A"}
                  </p>
                  <p className="text-gray-700 text-left text-lg mt-4">
                    Description: {complaint.complaint}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg text-center text-gray-700 mt-4">
              No complaints available.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ComplaintsList;
