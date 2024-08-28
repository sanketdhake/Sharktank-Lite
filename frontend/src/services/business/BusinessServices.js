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

export const BusinessRegisterAPI = async ({
  business_stage,
  business_category,
  brand_name,
  company_name,
  registration_status,
  cin,
  number_of_founders,
  current_status,
  business_idea,
  business_description,
  business_years,
  business_months,
  website_link,
  file,
  month1,
  month1_revenue,
  month2,
  month2_revenue,
  month3,
  file2,
  month3_revenue,
  Registration_reason,
  bankruptcy,
  pending_legal_proceedings,
}) => {
  const token = getUser();
  const formData = new FormData();

  formData.append("business_stage", business_stage);
  formData.append("business_category", business_category);
  formData.append("brand_name", brand_name);
  formData.append("company_name", company_name);
  formData.append("registration_status", registration_status);
  formData.append("cin", cin);
  formData.append("number_of_founders", number_of_founders);
  formData.append("current_status", current_status);
  formData.append("business_idea", business_idea);
  formData.append("business_description", business_description);
  formData.append("business_years", business_years);
  formData.append("business_months", business_months);
  formData.append("website_link", website_link);
  formData.append("file", file);
  formData.append("month1", month1);
  formData.append("month1_revenue", month1_revenue);
  formData.append("month2", month2);
  formData.append("month2_revenue", month2_revenue);
  formData.append("month3", month3);
  formData.append("file2", file2);
  formData.append("month3_revenue", month3_revenue);
  formData.append("Registration_reason", Registration_reason);
  formData.append("bankruptcy", bankruptcy);
  formData.append("pending_legal_proceedings", pending_legal_proceedings);

  // Now you can use the formData object in your API call

  const response = await axios.post(
    "http://localhost:3000/api/v1/business/register",
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

export const BusinessUpdateAPI = async ({
  business_stage,
  business_category,
  registration_status,
  cin,
  number_of_founders,
  current_status,
  business_years,
  business_months,
  website_link,
  file,
  month1,
  month1_revenue,
  month2,
  month2_revenue,
  month3,
  month3_revenue,
  file2,
  Registration_reason,
  bankruptcy,
  pending_legal_proceedings,
}) => {
  const token = getUser();
  const id = localStorage.getItem("business_id");
  const formData = new FormData();

  formData.append("business_stage", business_stage);
  formData.append("business_category", business_category);
  formData.append("registration_status", registration_status);
  formData.append("cin", cin);
  formData.append("number_of_founders", number_of_founders);
  formData.append("current_status", current_status);
  formData.append("business_years", business_years);
  formData.append("business_months", business_months);
  formData.append("website_link", website_link);
  formData.append("file", file);
  formData.append("month1", month1);
  formData.append("month1_revenue", month1_revenue);
  formData.append("month2", month2);
  formData.append("month2_revenue", month2_revenue);
  formData.append("month3", month3);
  formData.append("month3_revenue", month3_revenue);
  formData.append("file2", file2);
  formData.append("Registration_reason", Registration_reason);
  formData.append("bankruptcy", bankruptcy);
  formData.append("pending_legal_proceedings", pending_legal_proceedings);
  //console.log(formData);

  const response = await axios.post(
    `http://localhost:3000/api/v1/business/update/${id}`,
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

export const VerifiedBusinessAPI = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/v1/business/list_verified"
  );
  //return the promice
  return response.data;
};
