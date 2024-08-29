import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  ListVerifiedBusinessAPI,
  ListUnverifiedBusinessAPI,
} from "../../../services/business/BusinessServices";
import { BusinessEquityAPI } from "../../../services/business/BusinessServices";
import { verifyBusinessAPI } from "../../../services/User/admin/adminServices";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AdminBusiness() {
  const [selectedTab, setSelectedTab] = useState("verified");
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");

  const {
    data: verifiedData,
    isSuccess: isVerifiedSuccess,
    refetch: verifiedRefetch,
  } = useQuery({
    queryFn: ListVerifiedBusinessAPI,
    queryKey: ["verified-business"],
  });

  const {
    data: unverifiedData,
    isSuccess: isUnverifiedSuccess,
    refetch: unverifiedRefetch,
  } = useQuery({
    queryFn: ListUnverifiedBusinessAPI,
    queryKey: ["unverified-business"],
  });

  const {
    data: equityData,
    isSuccess: equityIsSuccess,
    refetch,
  } = useQuery({
    queryFn: () => BusinessEquityAPI(selectedBusiness._id),
    queryKey: ["business_equity"],
    enabled: !!selectedBusiness,
  });

  const { mutateAsync: verifyBusiness } = useMutation({
    mutationFn: () => verifyBusinessAPI(selectedBusiness._id),
    mutationKey: "verify-business",
  });

  const Businesses = selectedTab === "verified" ? verifiedData : unverifiedData;

  const handleVerify = async () => {
    await verifyBusiness();
    unverifiedRefetch();
    verifiedRefetch();
    setSelectedBusiness(null);
  };

  const renderBasicInfo = (business) => (
    <div>
      <img
        src={business.product_image}
        alt="Product"
        className="mt-4 rounded-lg size-2/4"
      />
      {business.website_link && (
        <p className="mt-2">
          <strong>Website:</strong>
          <a
            href={business.website_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline ml-2"
          >
            {business.website_link}
          </a>
        </p>
      )}
      <h2 className="text-2xl font-bold mb-4">{business.company_name}</h2>
      <p>
        <strong>Brand Name:</strong> {business.brand_name}
      </p>
      <p>
        <strong>Business Idea:</strong> {business.business_idea}
      </p>
      <p>
        <strong>Business Description:</strong> {business.business_description}
      </p>
      <p>
        <strong>Business Duration:</strong>{" "}
        {business.business_years * 12 + business.business_months} months
      </p>
    </div>
  );

  const renderBusinessStatus = (business) => {
    const pieData = {
      labels: equityData?.Investors_names || [],
      datasets: [
        {
          data: equityData?.Investments_equity || [],
          backgroundColor: [
            "#FF6384", // Red
            "#36A2EB", // Blue
            "#FFCE56", // Yellow
            "#4BC0C0", // Teal
            "#9966FF", // Purple
            "#FF9F40", // Orange
            "#5AD45A", // Green
            "#FFCD56", // Mustard
            "#36A2EB", // Blue
            "#FF6384", // Red
          ],
        },
      ],
    };

    const pieOptions = {
      plugins: {
        legend: {
          display: true,
          position: "right",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            boxWidth: 20,
            padding: 20,
          },
        },
      },
    };

    return (
      <div>
        <div className="flex items-start">
          <div style={{ width: "300px", height: "300px" }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
        <p>
          <strong>Registration Status:</strong> {business.registration_status}
        </p>
        <p>
          <strong>CIN:</strong> {business.cin}
        </p>
        <p>
          <strong>Registration Reason:</strong> {business.Registration_reason}
        </p>
        <p>
          <strong>Number of Founders:</strong> {business.number_of_founders}
        </p>
      </div>
    );
  };

  const renderFinanceStatus = (business) => {
    const data = {
      labels: ["Month 1", "Month 2", "Month 3"],
      datasets: [
        {
          label: "Revenue",
          data: [
            business.month1_revenue,
            business.month2_revenue,
            business.month3_revenue,
          ],
          borderColor: "rgba(75,192,192,1)",
          fill: false,
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          position: "bottom",
          align: "end",
        },
      },
    };

    return (
      <div>
        <p className="font-bold">Last 3 months revenue</p>
        <div style={{ position: "relative", height: "250px", width: "500px" }}>
          <Line data={data} options={options} />
        </div>
        <p className="mt-4">
          <strong>Bankruptcy:</strong> {business.bankruptcy ? "Yes" : "No"}
        </p>
        <p>
          <strong>Pending Legal Proceedings:</strong>{" "}
          {business.pending_legal_proceedings ? "Yes" : "No"}
        </p>
      </div>
    );
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
            setSelectedBusiness(null);
            setActiveTab("basic");
          }}
        >
          Verified Business
        </button>
        <button
          className={`pb-2 ${
            selectedTab === "unverified"
              ? "border-b-2 border-blue-500"
              : "hover:text-blue-600"
          }`}
          onClick={() => {
            setSelectedTab("unverified");
            setSelectedBusiness(null);
            setActiveTab("basic");
          }}
        >
          Unverified Business
        </button>
      </div>

      <div className="flex justify-center transition-all duration-500 ease-in-out">
        {/* Business List */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            selectedBusiness ? "w-1/3" : "w-full max-w-3xl"
          }`}
        >
          {selectedTab === "verified" &&
            (!verifiedData || verifiedData.length === 0) && (
              <p className="text-center text-gray-500">
                There are no verified Business in the system.
              </p>
            )}
          {selectedTab === "unverified" &&
            (!unverifiedData || unverifiedData.length === 0) && (
              <p className="text-center text-gray-500">
                There are no unverified Business in the system.
              </p>
            )}
          {Businesses?.map((business, index) => (
            <div
              key={index}
              className={`p-4 mb-4 border rounded-lg shadow-sm bg-white transition-all duration-500 ease-in-out relative ${
                selectedBusiness && selectedBusiness.name !== business.name
                  ? "opacity-30"
                  : "opacity-100"
              } ${
                selectedBusiness && selectedBusiness.name === business.name
                  ? "transform scale-105"
                  : ""
              }`}
            >
              <div className="mb-2">
                <h2 className="text-xl font-bold mb-2">
                  {business.brand_name}
                </h2>
                <p className="text-gray-700 mb-2">{business.business_idea}</p>
              </div>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded absolute right-4 bottom-4"
                onClick={() => {
                  setSelectedBusiness(business);
                  setActiveTab("basic");
                }}
              >
                Next &gt;
              </button>
            </div>
          ))}
        </div>

        {/* Business Details */}
        {selectedBusiness && (
          <div className="flex flex-col w-2/3 pl-8 shadow-md rounded-md transition-all duration-500 ease-in-out ml-8">
            <div className="flex justify-center mb-4">
              <button
                className={`mr-4 pb-2 ${
                  activeTab === "basic"
                    ? "border-b-2 border-blue-500"
                    : "hover:text-blue-600"
                }`}
                onClick={() => setActiveTab("basic")}
              >
                Basic Information
              </button>
              <button
                className={`mr-4 pb-2 ${
                  activeTab === "status"
                    ? "border-b-2 border-blue-500"
                    : "hover:text-blue-600"
                }`}
                onClick={() => setActiveTab("status")}
              >
                Business Status
              </button>
              <button
                className={`pb-2 ${
                  activeTab === "finance"
                    ? "border-b-2 border-blue-500"
                    : "hover:text-blue-600"
                }`}
                onClick={() => setActiveTab("finance")}
              >
                Finance Status
              </button>

              {/* Verify Button */}
              <div className="ml-auto">
                {selectedTab === "unverified" && (
                  <button
                    onClick={handleVerify}
                    className="py-2 px-6 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Verify Business
                  </button>
                )}
              </div>
            </div>

            <div>
              {activeTab === "basic" && renderBasicInfo(selectedBusiness)}
              {activeTab === "status" && renderBusinessStatus(selectedBusiness)}
              {activeTab === "finance" && renderFinanceStatus(selectedBusiness)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
