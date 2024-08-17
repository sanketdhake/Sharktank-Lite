import React from "react";
import { GiSharkFin } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";

export default function PublicNavbar() {
  return (
    <>
      <nav className="bg-white bg-opacity-70 p-4 border border-gray-300 mt-2 mx-8">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left side: Shark Fin logo */}
          <div className="flex items-center text-blue-600">
            <GiSharkFin className="text-3xl" />
            <span className="ml-2 text-xl font-bold">SharkTank Lite</span>
          </div>

          {/* Right side: Register and Login buttons */}
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center transform transition-transform duration-200 hover:scale-105 hover:bg-blue-900">
              <FaRegUser className="mr-2" />
              Register
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center transform transition-transform duration-200 hover:scale-105 hover:bg-blue-900">
              <IoMdLogIn className="mr-2" />
              Login
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
