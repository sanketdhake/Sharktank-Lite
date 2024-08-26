import axios from "axios";
import { getUser } from "../../../utils/getUser";

export const adminLoginAPI = async ({ email_id, password }) => {
  //console.log(`data received in admin login API - ${email_id} - ${password}`);
  const response = await axios.post(
    "http://localhost:3000/api/v1/admin/login",
    {
      email_id,
      password,
    }
  );
  //return the promice
  return response.data;
};

export const adminRegistrationAPI = async ({ name, email_id, password }) => {
  //console.log(`data received in admin login API - ${email_id} - ${password}`);
  const response = await axios.post(
    "http://localhost:3000/api/v1/admin/register",
    { name, email_id, password }
  );
  //return the promice
  return response.data;
};

export const EntrepreneurSupportAPI = async ({ message }) => {
  const token = getUser();
  const response = await axios.post(
    "http://localhost:3000/api/v1/admin/entrepreneur_support",
    { message },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  //return the promice
  return response.data;
};

export const SharkSupportAPI = async ({ message }) => {
  const token = getUser();
  const response = await axios.post(
    "http://localhost:3000/api/v1/admin/shark_support",
    { message },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  //return the promice
  return response.data;
};
