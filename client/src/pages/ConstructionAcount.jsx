import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import userBg from "../Assests/images/user.png";
import ComplaintsList from "../components/complaintList.jsx";
import NavBar from "../components/Navbar.jsx";

const ConstructorAccount = () => {
  const { id } = useParams();
  const [constructorData, setConstructorData] = useState(null);

  useEffect(() => {
    const fetchConstructorData = async () => {
      try {
        const response = await axios.get(`/api/constructorprofile/${id}`);
        console.log(response);
        setConstructorData(response.data); // Set the whole response data
      } catch (error) {
        console.error("Error fetching constructor data", error);
      }
    };

    fetchConstructorData();
  }, [id]);

  if (!constructorData) {
    return <div>Loading...</div>;
  }

  // Extract constructor and complaints from constructorData
  const { constructor, complaints } = constructorData;

  return (
    <>
      <NavBar id={"black"} />
      <div className="bg-white relative">
        <section className="h-[95vh] flex flex-col justify-between my-16">
          <div className="container mt-8 w-[100%] h-[45rem] bg-white rounded-lg p-5 shadow-lg">
            <div className="content flex justify-between items-center">
              <div className="left-side w-[35%] flex flex-col items-center relative">
                <img
                  id="idimage"
                  src={userBg}
                  alt="img1"
                  className="w-[12rem] h-[12rem] rounded-full"
                />
                <div className="details text-2xl my-5 text-center">
                  <p className="topic py-2 font-medium text-left">
                    User Name: {constructor.name}
                  </p>
                  <p className="topic py-2 font-medium text-left">
                    Email ID: {constructor.email}
                  </p>
                </div>
              </div>

              <table className="text-lg content-table border-collapse h-[35rem] w-[50rem] mx-auto shadow-lg rounded-t-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#26ccca] text-white text-left font-bold">
                    <th className="py-[30px] pl-8">Project Name</th>
                    <th className="py-[30px] pl-8">Project start date</th>
                    <th className="py-[30px] pl-8">Status</th>
                    <th className="py-[30px] pl-8">Complaints</th>
                  </tr>
                </thead>
                <tbody className="text-xl bg-white">
                  {constructor.projects.map((project, index) => (
                    <tr
                      key={index}
                      className={`border-b border-[#dddddd] ${
                        index % 2 === 0 ? "bg-[#f3f3f3]" : ""
                      }`}
                    >
                      <td className="py-[30px]">{project.name}</td>
                      <td className="py-[30px]">{project.startDate}</td>{" "}
                      <td className="py-[30px]">{project.status}</td>
                      <td className="py-[30px]">{complaints.length}</td>
                      <td className="py-[30px]">
                        <input type="image" alt="image" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <ComplaintsList complaints={complaints || []} />{" "}
        {/* Pass complaints here */}
      </div>
    </>
  );
};

export default ConstructorAccount;
