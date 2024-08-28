import axios from "axios";
import { getUser } from "../../utils/getUser";

export const AddInvestmentAPI = async ({
  amount,
  equity,
  royalty,
  royalty_duration,
  company_evaluation,
}) => {
  const id = localStorage.getItem("business_id");
  const token = getUser();
  const response = await axios.post(
    `http://localhost:3000/api/v1/investments/add_investment/${id}`,
    { amount, equity, royalty, royalty_duration, company_evaluation },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  //return the promice

  return response.data;
};

export const ListNewInvestmentsAPI = async (id) => {
  const response = await axios.get(
    `http://localhost:3000/api/v1/investments/list_newInvestment/${id}`
  );
  //return the promice
  //console.log(`API response - ${response.data}`);

  return response.data;
};
export const ListAcceptedInvestmentsAPI = async (id) => {
  const response = await axios.get(
    `http://localhost:3000/api/v1/investments/list_acceptedInvestment/${id}`
  );
  //return the promice
  return response.data;
};

export const ListRejectedInvestmentsAPI = async (id) => {
  const response = await axios.get(
    `http://localhost:3000/api/v1/investments/list_rejectedInvestment/${id}`
  );
  //return the promice
  return response.data;
};

export const ListCompletedInvestmentsAPI = async (id) => {
  const response = await axios.get(
    `http://localhost:3000/api/v1/investments/list_completedInvestment/${id}`
  );
  //return the promice
  return response.data;
};
export const AcceptInvestmentsAPI = async (id) => {
  const token = getUser();
  const response = await axios.post(
    `http://localhost:3000/api/v1/investments/accept_investment/${id}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  //return the promice
  return response.data;
};
export const CompleteInvestmentsAPI = async (id) => {
  const token = getUser();

  const response = await axios.post(
    `http://localhost:3000/api/v1/investments/complete_investment/${id}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  // Return the promise

  return response.data;
};

export const RejectInvestmentsAPI = async (id) => {
  const token = getUser();

  const response = await axios.post(
    `http://localhost:3000/api/v1/investments/reject_investment/${id}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  //return the promice
  return response.data;
};

export const SharksInvestmentAPI = async (id) => {
  const token = getUser();
  const response = await axios.get(
    `http://localhost:3000/api/v1/investments/list_sharksInvestment/${id}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  //return the promice
  return response.data;
};
