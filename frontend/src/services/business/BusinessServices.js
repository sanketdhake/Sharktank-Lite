import axios from "axios";
import { getUser } from "../../utils/getUser";

export const EntrepreneurBusinessAPI = async () => {
  const token = getUser();
  //console.log(`user token - ${token}`);

  const response = await axios.get(
    "http://localhost:3000/api/v1/entrepreneur/list_business",
    {
      headers: {
        Authorization: token,
      },
    }
  );
  //return the promice
  return response.data;
};

export const BusinessEquityAPI = async (id) => {
  const token = getUser();
  const response = await axios.get(
    `http://localhost:3000/api/v1/business/get_equity/${id}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  //return the promice

  return response.data;
};
