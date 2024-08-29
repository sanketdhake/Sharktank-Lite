import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SharksInvestmentAPI } from "../../../services/investments/InvestmentServices";
import { ListVerifiedBusinessAPI } from "../../../services/business/BusinessServices";

export default function SharkInvestment() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);

  const { data, isError, isLoading } = useQuery({
    queryFn: ListVerifiedBusinessAPI,
    queryKey: ["verified-business-list"],
  });

  const {
    data: investmentsData,
    isSuccess: investmentsIsSuccess,
    refetch,
  } = useQuery({
    queryFn: () => SharksInvestmentAPI(selectedBusinessId),
    queryKey: ["sharks-investments", selectedBusinessId],
    enabled: !!selectedBusinessId,
  });

  const handleNextClick = (business) => {
    setSelectedBusinessId(business._id);
    setSelectedBusiness(business);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  return (
    <div className="flex justify-center">
      <div
        className={`transition-all duration-300 ${
          selectedBusiness ? "w-1/3" : "w-1/2"
        }`}
      >
        {data?.map((business) => (
          <div
            key={business.id}
            className="flex p-4 m-2 border rounded-lg shadow-lg"
          >
            <img
              src={business.product_image}
              alt={business.brand_name}
              className="w-1/4 h-auto object-cover rounded-lg"
            />
            <div className="flex flex-col justify-between ml-4 w-3/4">
              <div>
                <h3 className="text-xl font-bold">{business.brand_name}</h3>
                <p className="text-gray-600">{business.company_name}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold">
                  {business.business_idea}
                </h4>
                <p className="text-gray-700">{business.business_description}</p>
              </div>
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded flex items-center self-end"
                onClick={() => handleNextClick(business)}
              >
                Next <span className="ml-1">&gt;</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedBusiness && investmentsIsSuccess && (
        <div className="w-2/3 p-4 m-2 border rounded-lg shadow-lg ml-4">
          {investmentsData?.map((investment) => {
            let statusMessage = "";

            if (investment.rejected) {
              statusMessage = "Investment offer is rejected by entrepreneur.";
            } else if (investment.accepted && !investment.completed) {
              statusMessage =
                "Investment is accepted by entrepreneur. You should have received an email with the Entrepreneur's contact details. Please proceed to connect with the Entrepreneur and complete the deal.";
            } else if (investment.accepted && investment.completed) {
              statusMessage =
                "Investment is marked as Completed. Thanks for your contribution.";
            } else {
              statusMessage =
                "Entrepreneur hasn't yet responded to this Investment offer. Kindly wait for the Entrepreneur's response.";
            }

            return (
              <div
                key={investment._id}
                className="flex flex-col p-4 m-2 border rounded-lg shadow-lg"
              >
                <div className="flex justify-between">
                  <div>
                    <p>
                      <strong>Amount:</strong> ${investment.amount}
                    </p>
                    <p>
                      <strong>Equity:</strong> {investment.equity}%
                    </p>
                    <p>
                      <strong>Royalty:</strong> ${investment.royalty}% for{" "}
                      {investment.royalty_duration} months
                    </p>
                    <p>
                      <strong>Company Evaluation:</strong> $
                      {investment.company_evaluation}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <p>
                    <strong>Status:</strong> {statusMessage}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
