import React, { useState } from "react";
import { GiSharkFin } from "react-icons/gi";
import {
  FaRegUser,
  FaBusinessTime,
  FaChartLine,
  FaUserTie,
} from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdAssessment } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../Redux/Slice/authSlice";

export default function AdminNavbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname || "/dashboard");

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
            <Link
              to="/admin/dashboard"
              className={linkClasses("/dashboard")}
              onClick={() => setSelected("/dashboard")}
            >
              <FaChartLine className="mr-2" />
              Dashboard
            </Link>

            <Link
              to="/admin/profile"
              className={linkClasses("/investments")}
              onClick={() => setSelected("/investments")}
            >
              <MdAssessment className="mr-2" />
              Profile
            </Link>

            <Link
              to="admin/list_entrepreneurs"
              className={linkClasses("/entrepreneurs")}
              onClick={() => setSelected("/entrepreneurs")}
            >
              <FaUserTie className="mr-2" />
              Entrepreneurs
            </Link>
            <Link
              to="/admin/list_sharks"
              className={linkClasses("/sharks")}
              onClick={() => setSelected("/sharks")}
            >
              <GiSharkFin className="mr-2" />
              Sharks
            </Link>
            <Link
              to="/admin/list_business"
              className={linkClasses("/businesses")}
              onClick={() => setSelected("/businesses")}
            >
              <FaBusinessTime className="mr-2" />
              Businesses
            </Link>

            <div className="ml-4">
              <Link to="/login">
                <button
                  onClick={handleLogout}
                  type="button"
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
