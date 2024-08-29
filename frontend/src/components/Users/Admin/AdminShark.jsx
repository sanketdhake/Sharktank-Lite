import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { verifySharkAPI } from "../../../services/User/admin/adminServices";
import {
  ListVerifiedSharkAPI,
  ListUnverifiedSharkAPI,
} from "../../../services/User/shark/sharkServices";

export default function AdminShark() {
  const [selectedTab, setSelectedTab] = useState("verified");
  const [selectedShark, setSelectedShark] = useState(null);
  const [selectedSection, setSelectedSection] = useState(
    "Personal Information"
  );

  const {
    data: verifiedData,
    isSuccess: isVerifiedSuccess,
    refetch: verifiedRefetch,
  } = useQuery({
    queryFn: ListVerifiedSharkAPI,
    queryKey: ["verified-shark"],
  });

  const {
    data: unverifiedData,
    isSuccess: isUnverifiedSuccess,
    refetch: unverifiedRefetch,
  } = useQuery({
    queryFn: ListUnverifiedSharkAPI,
    queryKey: ["unverified-shark"],
  });

  const { mutateAsync: verifyShark } = useMutation({
    mutationFn: () => verifySharkAPI(selectedShark._id),
    mutationKey: "verify-shark",
  });

  const sharks = selectedTab === "verified" ? verifiedData : unverifiedData;

  const handleVerify = async () => {
    await verifyShark(selectedShark._id);
    unverifiedRefetch();
    verifiedRefetch();
    setSelectedShark(null);

    //console.log("Shark verified");
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
            setSelectedShark(null);
            setSelectedSection("Personal Information");
          }}
        >
          Verified Sharks
        </button>
        <button
          className={`pb-2 ${
            selectedTab === "unverified"
              ? "border-b-2 border-blue-500"
              : "hover:text-blue-600"
          }`}
          onClick={() => {
            setSelectedTab("unverified");
            setSelectedShark(null);
            setSelectedSection("Personal Information");
          }}
        >
          Unverified Sharks
        </button>
      </div>

      <div className="flex justify-center transition-all duration-500 ease-in-out">
        {/* Shark List */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            selectedShark ? "w-1/3" : "w-full max-w-3xl"
          }`}
        >
          {sharks?.length > 0 ? (
            sharks.map((shark, index) => (
              <div
                key={index}
                className={`p-4 mb-4 border rounded-lg shadow-sm bg-white transition-all duration-500 ease-in-out relative ${
                  selectedShark && selectedShark.name !== shark.name
                    ? "opacity-30"
                    : "opacity-100"
                } ${
                  selectedShark && selectedShark.name === shark.name
                    ? "transform scale-105"
                    : ""
                }`}
              >
                <div className="mb-2">
                  <p className="font-semibold">{shark.name}</p>
                  <p>DOB: {shark.dob}</p>
                  <p>Age: {shark.age}</p>
                </div>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded absolute right-4 bottom-4"
                  onClick={() => {
                    setSelectedShark(shark);
                    setSelectedSection("Personal Information");
                  }}
                >
                  Next &gt;
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-8">
              {selectedTab === "verified"
                ? "There are no verified Sharks in the system"
                : "There are no unverified Sharks in the system"}
            </p>
          )}
        </div>

        {/* Shark Details */}
        {selectedShark && (
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
                onClick={() => setSelectedSection("Business Info")}
                className={`flex-1 py-2 px-4 text-left ${
                  selectedSection === "Business Info"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "hover:text-blue-600"
                }`}
              >
                Business Info
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

              {/* Conditional Button */}
              <div className="ml-auto">
                {selectedTab === "unverified" && (
                  <button
                    onClick={handleVerify}
                    className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Verify Shark
                  </button>
                )}
                {selectedTab === "verified" && (
                  <Link to="/shark/profileUpdate">
                    <button className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Update Profile
                    </button>
                  </Link>
                )}
              </div>
            </div>

            {/* Section Content */}
            <div className="mt-4 h-40 overflow-y-auto">
              {selectedSection === "Personal Information" && (
                <div className="h-full">
                  <p>
                    <strong>Name:</strong> {selectedShark.name}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong>{" "}
                    {new Date(selectedShark.dob).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Age:</strong> {selectedShark.age}
                  </p>
                  <p>
                    <strong>Gender:</strong> {selectedShark.gender}
                  </p>
                </div>
              )}

              {selectedSection === "Education" && (
                <div className="h-full">
                  <p>
                    <strong>Educational Qualification:</strong>{" "}
                    {selectedShark.educational_qualification}
                  </p>
                  <p>
                    <strong>Institution:</strong> {selectedShark.institution}
                  </p>
                </div>
              )}

              {selectedSection === "Contact Info" && (
                <div className="h-full">
                  <p>
                    <strong>Mobile No:</strong> {selectedShark.mobile_no}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedShark.email_id}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedShark.address}
                  </p>
                </div>
              )}

              {selectedSection === "Business Info" && (
                <div className="h-full">
                  <p>
                    <strong>Networth:</strong> {selectedShark.networth}
                  </p>
                  <p>
                    <strong>Investment Capacity:</strong>{" "}
                    {selectedShark.investment_capacity}
                  </p>
                  <p>
                    <strong>Domain:</strong> {selectedShark.domain}
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
