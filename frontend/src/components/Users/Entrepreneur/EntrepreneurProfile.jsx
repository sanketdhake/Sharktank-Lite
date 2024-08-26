import bg_image from "../../../Resources/entrepreneur-fotor-3.jpg";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EntrepreneurProfileAPI } from "../../../services/User/entrepreneur/entrepreneurServices";
import { Link } from "react-router-dom";

export default function EntrepreneurProfile() {
  //fetching entrepreneur profile
  const { data, refetch, isError, isPending, isSuccess } = useQuery({
    queryFn: EntrepreneurProfileAPI,
    queryKey: ["entrepreneur-profile"],
  });

  const [selectedSection, setSelectedSection] = useState(
    "Personal Information"
  );

  if (isSuccess && data) {
    return (
      <>
        {/* Background Image Div */}
        <div className="my-8 h-80 flex items-center justify-center">
          <img
            src={bg_image}
            alt="Entrepreneur Background"
            className="object-contain"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        </div>
        {/* Main Div */}
        <div className="mx-4 flex">
          {/* Left Div (30% width) */}
          <div className="w-1/3 flex flex-col items-center justify-center p-4 bg-white shadow-lg rounded-md">
            <div className="text-9xl mb-4">
              <FaUserCircle />
            </div>
            <p className="text-lg font-semibold mb-2">Entrepreneur</p>
            <p className="text-xl font-semibold">{data.name}</p>
          </div>

          {/* Right Div (70% width) */}
          <div className="w-2/3 p-8 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

            {/* Navbar for Sections */}
            <div className="flex items-center mb-4 border-b">
              <button
                onClick={() => setSelectedSection("Personal Information")}
                className={`flex-1 py-2 px-4 text-left ${
                  selectedSection === "Personal Information"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "hover:text-blue-600"
                }`}
              >
                Personal Information
              </button>
              <button
                onClick={() => setSelectedSection("Education")}
                className={`flex-1 py-2 px-4 text-left ${
                  selectedSection === "Education"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "hover:text-blue-600"
                }`}
              >
                Education
              </button>
              <button
                onClick={() => setSelectedSection("Contact Info")}
                className={`flex-1 py-2 px-4 text-left ${
                  selectedSection === "Contact Info"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "hover:text-blue-600"
                }`}
              >
                Contact Info
              </button>
              <button
                onClick={() => setSelectedSection("Address")}
                className={`flex-1 py-2 px-4 text-left ${
                  selectedSection === "Address"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "hover:text-blue-600"
                }`}
              >
                Address
              </button>
              {/* Update Profile Button */}
              <div className="ml-auto">
                <Link to="/entrepreneur/profileUpdate">
                  <button className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Update Profile
                  </button>
                </Link>
              </div>
            </div>

            {/* Section Content */}
            <div className="mt-4 h-40 overflow-y-auto">
              {selectedSection === "Personal Information" && (
                <div className="h-full">
                  <p>
                    <strong>Name:</strong> {data.name}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong>{" "}
                    {new Date(data.dob).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Age:</strong> {data.age}
                  </p>
                  <p>
                    <strong>Gender:</strong> {data.gender}
                  </p>
                </div>
              )}

              {selectedSection === "Education" && (
                <div className="h-full">
                  <p>
                    <strong>Educational Qualification:</strong>{" "}
                    {data.educational_qualification}
                  </p>
                  <p>
                    <strong>Institution:</strong> {data.institution}
                  </p>
                  <p>
                    <strong>Employed:</strong> {data.employed ? "Yes" : "No"}
                  </p>
                </div>
              )}

              {selectedSection === "Contact Info" && (
                <div className="h-full">
                  <p>
                    <strong>Mobile No:</strong> {data.mobile_no}
                  </p>
                  <p>
                    <strong>Email:</strong> {data.email_id}
                  </p>
                  <p>
                    <strong>Writing Language Proficiency:</strong>{" "}
                    {data.writing_language_proficiency}
                  </p>
                  <p>
                    <strong>Spoken Language Proficiency:</strong>{" "}
                    {data.spoken_language_proficiency}
                  </p>
                </div>
              )}

              {selectedSection === "Address" && (
                <div className="h-full">
                  <p>
                    <strong>State:</strong> {data.state}
                  </p>
                  <p>
                    <strong>City:</strong> {data.city}
                  </p>
                  <p>
                    <strong>Pincode:</strong> {data.pincode}
                  </p>
                  <p>
                    <strong>Address:</strong> {data.address}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
