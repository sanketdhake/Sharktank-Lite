import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { EntrepreneurBusinessAPI } from "../../../services/business/BusinessServices";
import {
  AcceptInvestmentsAPI,
  CompleteInvestmentsAPI,
  RejectInvestmentsAPI,
  ListAcceptedInvestmentsAPI,
  ListNewInvestmentsAPI,
} from "../../../services/investments/InvestmentServices";
import { FaArrowRight } from "react-icons/fa";

export default function EntrepreneurInvestments() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [businessId, setBusinessId] = useState(null);
  const [activeTab, setActiveTab] = useState("newOffers");

  const queryClient = useQueryClient();

  // Fetch list of businesses
  const { data: businesses, isSuccess } = useQuery({
    queryFn: EntrepreneurBusinessAPI,
    queryKey: ["entrepreneur-business"],
  });

  // Fetch investments data
  const {
    data: listAcceptedInvestments_data,
    refetch: listAcceptedInvestments_refetch,
  } = useQuery({
    queryFn: () => ListAcceptedInvestmentsAPI(businessId),
    queryKey: ["list-accepted-investments", businessId],
    enabled: !!businessId,
  });

  const { data: listNewInvestments_data, refetch: listNewInvestments_refetch } =
    useQuery({
      queryFn: () => ListNewInvestmentsAPI(businessId),
      queryKey: ["list-new-investments", businessId],
      enabled: !!businessId,
    });

  // Mutation for accepting an investment
  const acceptInvestmentMutation = useMutation({
    mutationFn: (investmentId) => AcceptInvestmentsAPI(investmentId),
    onSuccess: () => {
      listAcceptedInvestments_refetch();
      listNewInvestments_refetch();
    },
  });

  // Mutation for rejecting an investment
  const rejectInvestmentMutation = useMutation({
    mutationFn: (investmentId) => RejectInvestmentsAPI(investmentId),
    onSuccess: () => {
      listAcceptedInvestments_refetch();
      listNewInvestments_refetch();
    },
  });

  // Mutation for completing an investment
  const completeInvestmentMutation = useMutation({
    mutationFn: (investmentId) => CompleteInvestmentsAPI(investmentId),
    onSuccess: () => {
      //queryClient.invalidateQueries(["list-accepted-investments", businessId]);
    },
  });

  const handleNextClick = (business) => {
    setBusinessId(business._id);
    setSelectedBusiness(business);
  };

  const renderNewOffers = () => (
    <div>
      <h3 className="text-xl font-bold mb-4">New Offers</h3>
      {listNewInvestments_data && listNewInvestments_data.length > 0 ? (
        <ul>
          {listNewInvestments_data.map((investment, index) => (
            <li key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
              <p>Shark: {investment.shark_name}</p>
              <p>Amount: ${investment.amount}</p>
              <p>Equity: {investment.equity}%</p>
              <p>
                Royalty: {investment.royalty}% for {investment.royalty_duration}{" "}
                months
              </p>
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() =>
                    acceptInvestmentMutation.mutate(investment._id)
                  }
                  className="bg-green-500 text-white py-1 px-3 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    rejectInvestmentMutation.mutate(investment._id)
                  }
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No new offers available.</p>
      )}
    </div>
  );

  const renderAcceptedInvestments = () => (
    <div>
      <h3 className="text-xl font-bold mb-4">Accepted Investments</h3>
      {listAcceptedInvestments_data &&
      listAcceptedInvestments_data.length > 0 ? (
        <ul>
          {listAcceptedInvestments_data.map((investment, index) => (
            <li key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
              <p>Shark: {investment.shark_name}</p>
              <p>Amount: ${investment.amount}</p>
              <p>Equity: {investment.equity}%</p>
              <p>
                Royalty: {investment.royalty}% for {investment.royalty_duration}{" "}
                months
              </p>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() =>
                    completeInvestmentMutation.mutate(investment._id)
                  }
                  className="bg-blue-500 text-white py-1 px-3 rounded"
                >
                  Mark Complete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No accepted investments available.</p>
      )}
    </div>
  );

  if (isSuccess && businesses) {
    return (
      <div className="flex justify-center mt-5">
        <div
          className={`transition-all duration-300 ${
            businessId ? "w-1/3" : "w-1/2"
          } mt-5`}
        >
          {businesses.map((business, index) => (
            <div
              key={index}
              className={`mb-5 my-5 p-4 border rounded-lg shadow-md bg-white text-center relative ${
                businessId && businessId !== business._id ? "blur-sm" : ""
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

        {businessId && (
          <div className="w-2/3 p-4 border rounded-lg shadow-md bg-white ml-4">
            <nav className="flex mb-4">
              <button
                onClick={() => setActiveTab("newOffers")}
                className={`mr-4 py-2 px-4 ${
                  activeTab === "newOffers" ? "border-b-2 border-blue-500" : ""
                }`}
              >
                New Offers
              </button>
              <button
                onClick={() => setActiveTab("acceptedInvestments")}
                className={`py-2 px-4 ${
                  activeTab === "acceptedInvestments"
                    ? "border-b-2 border-blue-500"
                    : ""
                }`}
              >
                Accepted Investments
              </button>
            </nav>

            <div>
              {activeTab === "newOffers" && renderNewOffers()}
              {activeTab === "acceptedInvestments" &&
                renderAcceptedInvestments()}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}
