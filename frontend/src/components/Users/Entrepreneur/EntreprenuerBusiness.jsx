import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  EntrepreneurBusinessAPI,
  BusinessEquityAPI,
} from "../../../services/business/BusinessServices";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
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

export default function EntrepreneurBusiness() {
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const { data, isError, isPending, isSuccess } = useQuery({
    queryFn: EntrepreneurBusinessAPI,
    queryKey: ["entrepreneur-business"],
  });

  const {
    data: equityData,
    isSuccess: equityIsSuccess,
    refetch,
  } = useQuery({
    queryFn: () => BusinessEquityAPI(selectedBusinessId),
    queryKey: ["business_equity"],
    enabled: !!selectedBusinessId,
  });

  const [activeTab, setActiveTab] = useState("basic");

  const handleNextClick = (business) => {
    setSelectedBusinessId(business._id);
    setSelectedBusiness(business);
    localStorage.setItem("business_id", business._id);
  };

  const handleUpdateClick = (business) => {
    localStorage.setItem("business_id", business._id);
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

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data.</p>;
  }

  if (isSuccess && data) {
    return (
      <div className="flex justify-center mt-5">
        <div
          className={`transition-all duration-300 ${
            selectedBusiness ? "w-1/3" : "w-1/2"
          } mt-5`}
        >
          <ul className="list-none p-0">
            {data.map((business, index) => (
              <li
                key={index}
                className={`mb-5 my-5 p-4 border rounded-lg shadow-md bg-white text-center relative ${
                  selectedBusiness && selectedBusiness._id !== business._id
                    ? "blur-sm"
                    : ""
                }`}
              >
                <h2 className="text-xl font-bold mb-2">
                  {business.brand_name}
                </h2>
                <p className="text-gray-700 mb-2">{business.business_idea}</p>
                <Link to="/business/update">
                  <button
                    onClick={() => handleUpdateClick(business)}
                    className="absolute right-24 bottom-4 flex items-center bg-green-500 text-white py-1 px-2 rounded text-sm"
                  >
                    Update
                  </button>
                </Link>
                <button
                  onClick={() => handleNextClick(business)}
                  className="absolute right-4 bottom-4 flex items-center bg-blue-500 text-white py-1 px-2 rounded text-sm"
                >
                  Next <FaArrowRight className="ml-2" />
                </button>
              </li>
            ))}
            <li className="mb-5 my-5 p-4 border rounded-lg shadow-md bg-white text-center flex justify-between items-center relative">
              <span className="text-xl font-bold">Add new Business</span>
              <Link to="/business/register">
                <button className="absolute right-4 bottom-4 flex items-center bg-blue-500 text-white py-1 px-2 rounded text-sm">
                  Next <FaArrowRight className="ml-2" />
                </button>
              </Link>
            </li>
          </ul>
        </div>

        {selectedBusiness && (
          <div className="w-2/3 p-4 border rounded-lg shadow-md bg-white ml-4">
            <nav className="flex mb-4">
              <button
                onClick={() => setActiveTab("basic")}
                className={`mr-4 py-2 px-4 ${
                  activeTab === "basic" ? "border-b-2 border-blue-500" : ""
                }`}
              >
                Basic Information
              </button>
              <button
                onClick={() => setActiveTab("status")}
                className={`mr-4 py-2 px-4 ${
                  activeTab === "status" ? "border-b-2 border-blue-500" : ""
                }`}
              >
                Business Status
              </button>
              <button
                onClick={() => setActiveTab("finance")}
                className={`py-2 px-4 ${
                  activeTab === "finance" ? "border-b-2 border-blue-500" : ""
                }`}
              >
                Finance Status
              </button>
            </nav>

            <div>
              {activeTab === "basic" && renderBasicInfo(selectedBusiness)}
              {activeTab === "status" && renderBusinessStatus(selectedBusiness)}
              {activeTab === "finance" && renderFinanceStatus(selectedBusiness)}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
