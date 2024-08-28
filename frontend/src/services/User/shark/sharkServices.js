import axios from "axios";
import { getUser } from "../../../utils/getUser";

export const sharkLoginAPI = async ({ email_id, password }) => {
  console.log(`data received in shark login API - ${email_id} - ${password}`);
  const response = await axios.post(
    "http://localhost:3000/api/v1/shark/login",
    {
      email_id,
      password,
    }
  );
  //return the promice
  return response.data;
};

export const sharkRegistrationAPI = async ({
  name,
  dob,
  age,
  gender,
  mobile_no,
  email_id,
  password,
  educational_qualification,
  institution,
  networth,
  investment_capacity,
  file,
  domain,
  state,
  city,
  address,
  pincode,
}) => {
  //console.log(`data is received in Shark Registration API ${file.name}`);
  const formData = new FormData();

  formData.append("name", name);
  formData.append("dob", dob);
  formData.append("age", age);
  formData.append("gender", gender);
  formData.append("mobile_no", mobile_no);
  formData.append("email_id", email_id);
  formData.append("password", password);
  formData.append("educational_qualification", educational_qualification);
  formData.append("institution", institution);
  formData.append("networth", networth);
  formData.append("investment_capacity", investment_capacity);
  formData.append("file", file);
  formData.append("domain", domain);
  formData.append("state", state);
  formData.append("city", city);
  formData.append("address", address);
  formData.append("pincode", pincode);

  const response = await axios.post(
    "http://localhost:3000/api/v1/shark/register",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
      },
    }
  );

  return response.data;
};

export const SharkProfileAPI = async () => {
  const token = getUser();
  const response = await axios.get(
    "http://localhost:3000/api/v1/shark/profile",
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

export const sharkProfileUpdateAPI = async ({
  age,
  gender,
  mobile_no,
  email_id,
  educational_qualification,
  institution,
  networth,
  investment_capacity,
  file,
  domain,
  state,
  city,
  address,
  pincode,
}) => {
  const token = getUser();
  //console.log(`data is received in Shark Registration API ${file.name}`);
  const formData = new FormData();

  formData.append("age", age);
  formData.append("gender", gender);
  formData.append("mobile_no", mobile_no);
  formData.append("email_id", email_id);

  formData.append("educational_qualification", educational_qualification);
  formData.append("institution", institution);
  formData.append("networth", networth);
  formData.append("investment_capacity", investment_capacity);
  formData.append("file", file);
  formData.append("domain", domain);
  formData.append("state", state);
  formData.append("city", city);
  formData.append("address", address);
  formData.append("pincode", pincode);

  const response = await axios.post(
    "http://localhost:3000/api/v1/shark/update",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    }
  );

  return response.data;
};
