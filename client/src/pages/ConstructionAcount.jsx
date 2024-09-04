import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import userBg from "../Assests/images/user.png";
import ComplaintsList from "../components/complaintList";
import NavBar from "../components/Navbar";

const constructorAccount = () => {
  return (
    <>
      {/* <NavBar /> */}
      <div className="bg-white w-full relative">
        <section className="h-[90vh] flex flex-col justify-between mt-[6.5rem]">
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
                    User Name: Suraj Gitte
                  </p>
                  <p className="topic py-2 font-medium text-left">
                    Email ID: suraj@gmail.com
                  </p>
                  <p className="topic py-2 font-medium text-left">
                    Phone NO: 9860126708
                  </p>
                  <p className="topic py-2 font-medium text-left">
                    Points: 400{" "}
                  </p>
                  <p className="topic py-2 font-medium text-left">
                    No Of Donations: 01
                  </p>
                  <p className="topic py-2 font-medium text-left">
                    Address: Pune, Maharashtra - 411037
                  </p>
                </div>
              </div>

              <table className=" text-lg content-table border-collapse h-[35rem] w-[50rem] mx-auto shadow-lg rounded-t-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#26ccca] text-white text-left font-bold">
                    <th className="py-[30px] pl-8">Project start date</th>
                    <th className="py-[30px] pl-8 ">Project start date</th>
                    <th className="py-[30px] pl-8">Status</th>
                    <th className="py-[30px] pl-8">complaints</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-b border-[#dddddd]">
                    <td className="py-[30px]">01/01/24</td>
                    <td className="py-[30px]">11.00 AM</td>
                    <td className="py-[30px] ">Completed</td>
                    <td className="py-[30px] ">20 T-shirts</td>
                  </tr>
                  <tr className="border-b border-[#dddddd] bg-[#f3f3f3]">
                    <td className="py-[30px] ">02/02/24</td>
                    <td className="py-[30px] ">2.00 PM</td>
                    <td className="py-[30px] ">Completed</td>
                    <td className="py-[30px] ">30 Books</td>
                  </tr>
                  <tr className="border-b-2 border-[#53b5a1]">
                    <td className="py-[30px] ">08/04/24</td>
                    <td className="py-[30px] ">3.00 PM</td>
                    <td className="py-[30px] ">Pending</td>
                    <td className="py-[30px] ">15 Bags</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <ComplaintsList />
      </div>
    </>
  );
};

export default constructorAccount;
