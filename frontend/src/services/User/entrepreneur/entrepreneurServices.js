import axios from "axios";
import { getUser } from "../../../utils/getUser";

export const entrepreneurLoginAPI = async ({ email_id, password }) => {
  console.log(
    `data received in entrepreneur login API - ${email_id} - ${password}`
  );
  const response = await axios.post(
    "http://localhost:3000/api/v1/entrepreneur/login",
    {
      email_id,
      password,
    }
  );
  //return the promice
  return response.data;
};

export const entrepreneurRegisterAPI = async ({
  name,
  dob,
  age,
  gender,
  mobile_no,
  email_id,
  password,
  educational_qualification,
  institution,
  employed,
  business_designation,
  writing_language_proficiency,
  spoken_language_proficiency,
  state,
  city,
  address,
  pincode,
}) => {
  if (employed == "No") {
    employed = false;
  } else {
    employed = true;
  }
  const response = await axios.post(
    "http://localhost:3000/api/v1/entrepreneur/register",
    {
      name,
      dob,
      age,
      gender,
      mobile_no,
      email_id,
      password,
      educational_qualification,
      institution,
      employed,
      business_designation,
      writing_language_proficiency,
      spoken_language_proficiency,
      state,
      city,
      address,
      pincode,
    }
  );
  //return the promice
  return response.data;
};

export const EntrepreneurProfileAPI = async () => {
  const token = getUser();

  const response = await axios.get(
    "http://localhost:3000/api/v1/entrepreneur/profile",
    {
      headers: {
        Authorization: token,
      },
    }
  );
  //return the promice
  return response.data;
};

export const EntrepreneurProfileUpdateAPI = async ({
  age,
  mobile_no,
  email_id,
  educational_qualification,
  institution,
  employed,
  business_designation,
  writing_language_proficiency,
  spoken_language_proficiency,
  state,
  city,
  address,
  pincode,
}) => {
  const token = getUser();
  const response = await axios.post(
    "http://localhost:3000/api/v1/entrepreneur/update",
    {
      age,
      mobile_no,
      email_id,
      educational_qualification,
      institution,
      employed,
      business_designation,
      writing_language_proficiency,
      spoken_language_proficiency,
      state,
      city,
      address,
      pincode,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  //return the promice
  return response.data;
};

export const ListVerifiedEntrepreneurAPI = async () => {
  const token = getUser();
  const response = await axios.get(
    "http://localhost:3000/api/v1/entrepreneur/list_verified",

    {
      headers: {
        Authorization: token,
      },
    }
  );
  //return the promice
  return response.data;
};

export const ListUnverifiedEntrepreneurAPI = async () => {
  const token = getUser();
  const response = await axios.get(
    "http://localhost:3000/api/v1/entrepreneur/list_unverified",

    {
      headers: {
        Authorization: token,
      },
    }
  );
  //return the promice
  return response.data;
};
