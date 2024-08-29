import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  ListUnverifiedEntrepreneurAPI,
  ListVerifiedEntrepreneurAPI,
} from "../../../services/User/entrepreneur/entrepreneurServices";
import { Link } from "react-router-dom";
import { verifyEntrepreneurAPI } from "../../../services/User/admin/adminServices";

export default function AdminEntrepreneur() {
  const [selectedTab, setSelectedTab] = useState("verified");
  const [selectedEntrepreneur, setSelectedEntrepreneur] = useState(null);
  const [selectedSection, setSelectedSection] = useState(
    "Personal Information"
  );

  const {
    data: verifiedData,
    isSuccess: isVerifiedSuccess,
    refetch: verifiedRefetch,
  } = useQuery({
    queryFn: ListVerifiedEntrepreneurAPI,
    queryKey: ["verified-entrepreneurs"],
  });

  const {
    data: unverifiedData,
    isSuccess: isUnverifiedSuccess,
    refetch: unverifiedRefetch,
  } = useQuery({
    queryFn: ListUnverifiedEntrepreneurAPI,
    queryKey: ["unverified-entrepreneurs"],
  });

  const { mutateAsync: verifyEntrepreneur } = useMutation({
    mutationFn: () => verifyEntrepreneurAPI(selectedEntrepreneur._id),
    mutationKey: "verify-entrepreneur",
  });

  const entrepreneurs =
    selectedTab === "verified" ? verifiedData : unverifiedData;

  const handleVerify = async (selectedEntrepreneur) => {
    const data = await verifyEntrepreneur(selectedEntrepreneur._id);
    unverifiedRefetch();
    verifiedRefetch();
    setSelectedEntrepreneur(null);
    console.log(data);
  };

  return (
    <div className="p-4">
      {/* Navbar */}
      <div className="flex justify-center shadow-md bg-white rounded-lg p-3 mb-6">
        <button
          className={`mr-4 pb-2 ${
            selectedTab === "verified"
              ? "border-b-2 border-blue-500"
              : "hover:text-blue-600"
          }`}
          onClick={() => {
            setSelectedTab("verified");
            setSelectedEntrepreneur(null);
            setSelectedSection("Personal Information");
          }}
        >
          Verified Entrepreneurs
        </button>
        <button
          className={`pb-2 ${
            selectedTab === "unverified"
              ? "border-b-2 border-blue-500"
              : "hover:text-blue-600"
          }`}
          onClick={() => {
            setSelectedTab("unverified");
            setSelectedEntrepreneur(null);
            setSelectedSection("Personal Information");
          }}
        >
          Unverified Entrepreneurs
        </button>
      </div>

      <div className="flex justify-center transition-all duration-500 ease-in-out">
        {/* Entrepreneur List */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            selectedEntrepreneur ? "w-1/3" : "w-full max-w-3xl"
          }`}
        >
          {selectedTab === "verified" &&
            (!verifiedData || verifiedData.length === 0) && (
              <p className="text-center text-gray-500">
                There are no verified Entrepreneurs in the system.
              </p>
            )}
          {selectedTab === "unverified" &&
            (!unverifiedData || unverifiedData.length === 0) && (
              <p className="text-center text-gray-500">
                There are no unverified Entrepreneurs in the system.
              </p>
            )}
          {entrepreneurs?.map((entrepreneur, index) => (
            <div
              key={index}
              className={`p-4 mb-4 border rounded-lg shadow-sm bg-white transition-all duration-500 ease-in-out relative ${
                selectedEntrepreneur &&
                selectedEntrepreneur.name !== entrepreneur.name
                  ? "opacity-30"
                  : "opacity-100"
              } ${
                selectedEntrepreneur &&
                selectedEntrepreneur.name === entrepreneur.name
                  ? "transform scale-105"
                  : ""
              }`}
            >
              <div className="mb-2">
                <p className="font-semibold">{entrepreneur.name}</p>
                <p>DOB: {entrepreneur.dob}</p>
                <p>Age: {entrepreneur.age}</p>
              </div>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded absolute right-4 bottom-4"
                onClick={() => {
                  setSelectedEntrepreneur(entrepreneur);
                  setSelectedSection("Personal Information");
                }}
              >
                Next &gt;
              </button>
            </div>
          ))}
        </div>

        {/* Entrepreneur Details */}
        {selectedEntrepreneur && (
          <div className="w-2/3 p-8 bg-white shadow-md rounded-md transition-all duration-500 ease-in-out ml-8">
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
              {/* Verify Entrepreneur or Update Profile Button */}
              <div className="ml-auto">
                {selectedTab === "unverified" ? (
                  <button
                    className="py-2 px-6 bg-green-600 text-white rounded-md hover:bg-green-700"
                    onClick={() => handleVerify(selectedEntrepreneur._id)}
                  >
                    Verify Entrepreneur
                  </button>
                ) : null}
              </div>
            </div>

            {/* Section Content */}
            <div className="mt-4 h-40 overflow-y-auto">
              {selectedSection === "Personal Information" && (
                <div className="h-full">
                  <p>
                    <strong>Name:</strong> {selectedEntrepreneur.name}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong>{" "}
                    {new Date(selectedEntrepreneur.dob).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Age:</strong> {selectedEntrepreneur.age}
                  </p>
                  <p>
                    <strong>Gender:</strong> {selectedEntrepreneur.gender}
                  </p>
                </div>
              )}

              {selectedSection === "Education" && (
                <div className="h-full">
                  <p>
                    <strong>Educational Qualification:</strong>{" "}
                    {selectedEntrepreneur.educational_qualification}
                  </p>
                  <p>
                    <strong>Institution:</strong>{" "}
                    {selectedEntrepreneur.institution}
                  </p>
                  <p>
                    <strong>Employed:</strong>{" "}
                    {selectedEntrepreneur.employed ? "Yes" : "No"}
                  </p>
                </div>
              )}

              {selectedSection === "Contact Info" && (
                <div className="h-full">
                  <p>
                    <strong>Mobile No:</strong> {selectedEntrepreneur.mobile_no}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedEntrepreneur.email_id}
                  </p>
                  <p>
                    <strong>Writing Language Proficiency:</strong>{" "}
                    {selectedEntrepreneur.writing_language_proficiency}
                  </p>
                  <p>
                    <strong>Spoken Language Proficiency:</strong>{" "}
                    {selectedEntrepreneur.spoken_language_proficiency}
                  </p>
                </div>
              )}

              {selectedSection === "Address" && (
                <div className="h-full">
                  <p>
                    <strong>State:</strong> {selectedEntrepreneur.state}
                  </p>
                  <p>
                    <strong>City:</strong> {selectedEntrepreneur.city}
                  </p>
                  <p>
                    <strong>Pincode:</strong> {selectedEntrepreneur.pincode}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedEntrepreneur.address}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
