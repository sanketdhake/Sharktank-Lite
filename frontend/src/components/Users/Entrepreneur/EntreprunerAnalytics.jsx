import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  EntrepreneurBusinessAPI,
  BusinessEquityAPI,
} from "../../../services/business/BusinessServices";
import { FaArrowRight } from "react-icons/fa";
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

export default function EntrepreneurAnalytics() {
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const { data, isSuccess } = useQuery({
    queryFn: EntrepreneurBusinessAPI,
    queryKey: ["entrepreneur-business"],
  });

  const {
    data: equityData,
    isLoading: equityIsLoading,
    isSuccess: equityIsSuccess,
    refetch,
  } = useQuery({
    queryFn: () => BusinessEquityAPI(selectedBusinessId),
    queryKey: ["business_equity"],
    enabled: !!selectedBusinessId,
  });

  // Effect to handle changes to selectedBusinessId
  useEffect(() => {
    if (selectedBusinessId) {
      console.log("Business ID updated:", selectedBusinessId);
      refetch(); // Refetch equity data for the selected business
    }
  }, [selectedBusinessId, refetch]);

  const handleNextClick = (business) => {
    const business_id = business._id;
    setSelectedBusinessId(business_id);
    setSelectedBusiness(business);
    console.log(equityData);

    localStorage.setItem("business_id", business._id);
  };

  const renderRevenueGraph = () => {
    if (!selectedBusiness) return null;

    const labels = [
      selectedBusiness.month1,
      selectedBusiness.month2,
      selectedBusiness.month3,
    ];

    const data = {
      labels,
      datasets: [
        {
          label: "Revenue",
          data: [
            selectedBusiness.month1_revenue,
            selectedBusiness.month2_revenue,
            selectedBusiness.month3_revenue,
          ],
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    };

    return (
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Revenue Over 3 Months</h2>
        <div style={{ width: "500px", height: "250px" }}>
          <Line data={data} />
        </div>
      </div>
    );
  };

  const renderEquityPieChart = () => {
    if (equityIsLoading || !equityIsSuccess || !equityData) return null;

    // Ensure that the data arrays are correctly populated
    const investorNames = equityData.Investors_names || [];
    const investmentsEquity = equityData.Investments_equity || [];

    // Handle the case where there's no data to display
    if (investorNames.length === 0 || investmentsEquity.length === 0) {
      return <p>No equity data available for this business.</p>;
    }

    const pieData = {
      labels: investorNames,
      datasets: [
        {
          data: investmentsEquity,
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
      <div className="mt-4">
        <h2 className="text-xl font-bold">Equity Distribution</h2>
        <div style={{ width: "400px", height: "300px" }}>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    );
  };

  if (isSuccess && data) {
    return (
      <div className="flex justify-center mt-5">
        <div
          className={`transition-all duration-300 ${
            selectedBusiness ? "w-1/3" : "w-1/2"
          } mt-5`}
        >
          {data.map((business, index) => (
            <div
              key={index}
              className={`mb-5 my-5 p-4 border rounded-lg shadow-md bg-white text-center relative ${
                selectedBusiness && selectedBusiness._id !== business._id
                  ? "blur-sm"
                  : ""
              }`}
            >
              <h2 className="text-xl font-bold mb-2">{business.brand_name}</h2>
              <p className="text-gray-700 mb-2">{business.business_idea}</p>
              <button
                onClick={() => handleNextClick(business)}
                className="absolute right-4 bottom-4 flex items-center bg-blue-500 text-white py-1 px-2 rounded text-sm"
              >
                Next <FaArrowRight className="ml-2" />
              </button>
            </div>
          ))}
        </div>

        {selectedBusiness !== null && (
          <div className="w-2/3 p-4 border rounded-lg shadow-md bg-white ml-4">
            <h1 className="text-xl font-bold">Business Analytics</h1>
            {renderRevenueGraph()}
            {renderEquityPieChart()}
          </div>
        )}
      </div>
    );
  }

  return null;
}
