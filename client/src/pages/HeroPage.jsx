import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import roadimg from "../Assests/images/test_img.jpg";

export default function HeroPage() {
  const navigate = useNavigate();

  const handleRegisterComplaint = () => {
    navigate("/api/complaint");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/${roadimg}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  return (
    <>
      <NavBar />
      <div
        id="hero-page"
        className=" w-[100%] h-[100vh] flex justify-center items-center"
      >
        <div className="text-white font-serif ">
          <p className="my-2">Transparancy is the need of todays india</p>
          <h1 className="text-6xl my-2">
            Digitalise the Construction <br /> Process
          </h1>
          <button
            className="text-lg py-3 px-12 my-4 border-2 rounded-lg bg-[#006168]"
            onClick={handleRegisterComplaint}
          >
            Register Complaint
          </button>
        </div>
      </div>
    </>
  );
}
