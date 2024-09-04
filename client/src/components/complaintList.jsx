import React from "react";
import bg from "../Assests/images/user.png";

const complaints = [
  {
    name: "complaints 1: Doorstep Donation",
    description:
      "A platform enabling people to donate items such as shoes, bags, and stationery to the needy or NGOs, with volunteers picking up donations from donors’ doorsteps.",
  },
  {
    name: "complaints 2: MineSafe",
    description:
      "A web application for tracking coal mine workers and ensuring their safety through real-time monitoring and alerts.",
  },
  {
    name: "complaints 3: Smart Healthcare Appointment System",
    description:
      "A DBMS complaints designed to streamline and automate the process of booking healthcare appointments with features like appointment reminders and easy rescheduling.",
  },
  {
    name: "complaints 3: Smart Healthcare Appointment System",
    description:
      "A DBMS complaints designed to streamline and automate the process of booking healthcare appointments with features like appointment reminders and easy rescheduling.",
  },
];

const ComplaintsList = () => {
  return (
    <div className="bg-white w-full h-screen pb-6">
      <h2 className="text-4xl font-bold mb-6 text-uppercase py-4">
        complaints
      </h2>
      <div className="grid grid-cols-2 gap-8 ">
        {complaints.map((complaint, index) => (
          <div
            key={index}
            className="m-4 border rounded-lg shadow-lg p-2 flex justify-center items-center space-x-4 h-full"
          >
            <img
              src={bg}
              alt={complaint.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-center ">
              <h3 className=" text-xl text-uppercase text-left font-semibold">
                {complaint.name}
              </h3>
              <p className="text-gray-700 text-left text-lg mt-2">
                {complaint.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintsList;
