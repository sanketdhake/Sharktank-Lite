import React, { useState } from "react";
import { GiSharkFin } from "react-icons/gi";
import { FaRegUser, FaBusinessTime, FaChartLine } from "react-icons/fa";
import { MdAssessment, MdSupportAgent } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../Redux/Slice/authSlice";

export default function SharkNavbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname || "/profile");

  const linkClasses = (path) =>
    `px-4 py-2 flex items-center transform transition-transform duration-200 
     ${
       selected === path
         ? "text-blue-900 underline"
         : "text-blue-600 hover:underline"
     } 
     hover:scale-105`;

  //Logout functionality
  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("userId");
  };

  return (
    <>
      <nav className="bg-white bg-opacity-70 p-4 border border-gray-300 mt-2 mx-8">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left side: Shark Fin logo */}
          <Link to="/" onClick={handleLogout}>
            <div className="flex items-center text-blue-600">
              <GiSharkFin className="text-3xl" />
              <span className="ml-2 text-xl font-bold">SharkTank Lite</span>
            </div>
          </Link>

          {/* Right side: Navigation Links */}
          <div className="flex items-center space-x-2">
            {" "}
            {/* Reduced space between links */}
            <Link
              to="/shark/profile"
              className={linkClasses("/profile")}
              onClick={() => setSelected("/profile")}
            >
              <FaRegUser className="mr-2" />
              Profile
            </Link>
            <Link
              to="/shark/business"
              className={linkClasses("/business")}
              onClick={() => setSelected("/business")}
            >
              <FaBusinessTime className="mr-2" />
              Business
            </Link>
            <Link
              to="/shark/investments"
              className={linkClasses("/investments")}
              onClick={() => setSelected("/investments")}
            >
              <MdAssessment className="mr-2" />
              Investments
            </Link>
            <Link
              to="/shark/analytics"
              className={linkClasses("/reports")}
              onClick={() => setSelected("/reports")}
            >
              <FaChartLine className="mr-2" />
              Report & Analytics
            </Link>
            <Link
              to="/shark/support"
              className={linkClasses("/help")}
              onClick={() => setSelected("/help")}
            >
              <MdSupportAgent className="mr-2" />
              Help & Support
            </Link>
            <div className="ml-4">
              {" "}
              {/* Added margin-left for spacing */}
              <Link to="/login">
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white ml-14 px-4 py-2 rounded flex items-center transform transition-transform duration-200 hover:scale-105 hover:bg-blue-900"
                >
                  <IoMdLogOut className="mr-2" />
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
