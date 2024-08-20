import React, { useState } from "react";
import { useEffect } from "react";
import { FaUser, FaUserTie } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setUserAction, loginAction } from "../../Redux/Slice/authSlice";

//to be removed
import { entrepreneurRegisterAPI } from "../../services/User/entrepreneur/entrepreneurServices";
import { sharkRegistrationAPI } from "../../services/User/shark/sharkServices";
import { adminRegistrationAPI } from "../../services/User/admin/adminServices";

const validationSchema1 = Yup.object({
  name: Yup.string().required("Required"),
  dob: Yup.date(),
  age: Yup.number(),
  gender: Yup.string(),
  mobile_no: Yup.string(),
  email_id: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  educational_qualification: Yup.string(),
  institution: Yup.string(),
  employed: Yup.string(),
  business_designation: Yup.string(),
  writing_language_proficiency: Yup.string(),
  spoken_language_proficiency: Yup.string(),
  state: Yup.string(),
  city: Yup.string(),
  address: Yup.string(),
  pincode: Yup.string(),
});

const validationSchema2 = Yup.object({
  name: Yup.string().required("Required"),
  dob: Yup.date(),
  age: Yup.number(),
  gender: Yup.string(),
  mobile_no: Yup.string(),
  email_id: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  educational_qualification: Yup.string(),
  institution: Yup.string(),
  networth: Yup.number(),
  investment_capacity: Yup.number(),
  file: Yup.mixed()
    .required("A file is required")
    .test(
      "fileSize",
      "File size is too large, max size is 2MB",
      (value) => !value || (value && value.size <= 2 * 1024 * 1024) // 2MB limit
    )
    .test(
      "fileFormat",
      "Unsupported format, only .zip files are allowed",
      (value) => !value || (value && value.name.toLowerCase().endsWith(".zip"))
    ),
  domain: Yup.string(),
  state: Yup.string(),
  city: Yup.string(),
  address: Yup.string(),
  pincode: Yup.string(),
});
const validationSchema3 = Yup.object({
  name: Yup.string().required("Required"),
  email_id: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function RegistrationPage() {
  //configuration of dispatch to set the state
  const dispatch = useDispatch();

  //navigation instance
  const navigate = useNavigate();

  // State to keep track of the selected div
  const [selected, setSelected] = useState("Entrepreneur");

  // Handle div click
  const handleDivClick = (title) => {
    setSelected(title);
    dispatch(setUserAction(title));
  };

  const userType = useSelector((state) => state.auth.userType);
  // Function to select the appropriate API based on userType
  const getRegistrationAPI = (userType) => {
    switch (userType) {
      case "Entrepreneur":
        return entrepreneurRegisterAPI;
      case "Admin":
        return adminRegistrationAPI;
      case "Shark":
        return sharkRegistrationAPI;
      default:
        throw new Error("Invalid user type");
    }
  };

  const getValidationSchema = (userType) => {
    switch (userType) {
      case "Entrepreneur":
        return validationSchema1;
      case "Admin":
        return validationSchema3;
      case "Shark":
        return validationSchema2;
      default:
        throw new Error("Invalid user type");
    }
  };
  const validationSchema = getValidationSchema(userType);
  const registrationAPI = getRegistrationAPI(userType);

  //mutation
  const { mutateAsync, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: registrationAPI,
    mutationKey: ["register"],
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      dob: "",
      age: "",
      gender: "",
      mobile_no: "",
      email_id: "",
      password: "",
      confirm_password: "",
      educational_qualification: "",
      institution: "",
      employed: "",
      business_designation: "",
      networth: "",
      investment_capacity: "",
      file: null,
      domain: "",
      state: "",
      city: "",
      address: "",
      pincode: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //making http request
      console.log("reachable");

      mutateAsync(values)
        .then((data) => {
          // dispatch the action
          console.log(data);
          dispatch(loginAction(data));
          //saving user in localstorage
          localStorage.setItem("user", JSON.stringify(data));
          console.log("Data being stored:", data);
          localStorage.setItem("Role", JSON.stringify(userType));
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });

  //Navigating to profile page after registration
  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        navigate("/");
      }
    }, 1500);
  }, [isPending, isError, isSuccess, error]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl w-full mt-4">
        {/* Sub divs with logos and titles */}
        <div className="flex justify-between mb-12">
          <div
            onClick={() => handleDivClick("Entrepreneur")}
            className={`flex flex-col items-center w-1/4 border border-gray-200 border-[1px] rounded-md p-4 transition-transform transform ${
              selected === "Entrepreneur"
                ? "scale-105 bg-gray-400"
                : "hover:scale-105 hover:bg-gray-200"
            }`}
          >
            <FaUser className="text-4xl text-blue-600" />
            <h2 className="mt-2 text-xl">Entrepreneur</h2>
          </div>
          <div
            onClick={() => handleDivClick("Shark")}
            className={`flex flex-col items-center w-1/4 border border-gray-200 border-[1px] rounded-md p-4 transition-transform transform ${
              selected === "Shark"
                ? "scale-105 bg-gray-400"
                : "hover:scale-105 hover:bg-gray-200"
            }`}
          >
            <FaUserTie className="text-4xl text-blue-600" />
            <h2 className="mt-2 text-xl">Shark</h2>
          </div>
          <div
            onClick={() => handleDivClick("Admin")}
            className={`flex flex-col items-center w-1/4 border border-gray-200 border-[1px] rounded-md p-4 transition-transform transform ${
              selected === "Admin"
                ? "scale-105 bg-gray-400"
                : "hover:scale-105 hover:bg-gray-200"
            }`}
          >
            <MdAdminPanelSettings className="text-4xl text-blue-600" />
            <h2 className="mt-2 text-xl">Admin</h2>
          </div>
        </div>

        {/* Registration Form */}

        <div>
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Common Fields */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                {...formik.getFieldProps("name")}
                className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {formik.touched.name && formik.errors.name && (
                <span className="text-xs text-red-500">
                  {formik.errors.name}
                </span>
              )}
            </div>

            {selected !== "Admin" && (
              <>
                <div>
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    {...formik.getFieldProps("dob")}
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formik.touched.dob && formik.errors.dob && (
                    <span className="text-xs text-red-500">
                      {formik.errors.dob}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Age
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    {...formik.getFieldProps("age")}
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formik.touched.age && formik.errors.age && (
                    <span className="text-xs text-red-500">
                      {formik.errors.age}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    {...formik.getFieldProps("gender")}
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender && (
                    <span className="text-xs text-red-500">
                      {formik.errors.gender}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="mobile_no"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mobile Number
                  </label>
                  <input
                    id="mobile_no"
                    name="mobile_no"
                    type="text"
                    {...formik.getFieldProps("mobile_no")}
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formik.touched.mobile_no && formik.errors.mobile_no && (
                    <span className="text-xs text-red-500">
                      {formik.errors.mobile_no}
                    </span>
                  )}
                </div>
              </>
            )}

            <div>
              <label
                htmlFor="email_id"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email_id"
                name="email_id"
                type="email"
                {...formik.getFieldProps("email_id")}
                className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {formik.touched.email_id && formik.errors.email_id && (
                <span className="text-xs text-red-500">
                  {formik.errors.email_id}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                {...formik.getFieldProps("password")}
                className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {formik.touched.password && formik.errors.password && (
                <span className="text-xs text-red-500">
                  {formik.errors.password}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                {...formik.getFieldProps("confirm_password")}
                className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {formik.touched.confirm_password &&
                formik.errors.confirm_password && (
                  <span className="text-xs text-red-500">
                    {formik.errors.confirm_password}
                  </span>
                )}
            </div>
            {selected !== "Admin" && (
              <>
                <div>
                  <label
                    htmlFor="educational_qualification"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Educational Qualification
                  </label>
                  <input
                    id="educational_qualification"
                    name="educational_qualification"
                    type="text"
                    {...formik.getFieldProps("educational_qualification")}
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formik.touched.educational_qualification &&
                    formik.errors.educational_qualification && (
                      <span className="text-xs text-red-500">
                        {formik.errors.educational_qualification}
                      </span>
                    )}
                </div>

                <div>
                  <label
                    htmlFor="institution"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Institution
                  </label>
                  <input
                    id="institution"
                    name="institution"
                    type="text"
                    {...formik.getFieldProps("institution")}
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formik.touched.institution && formik.errors.institution && (
                    <span className="text-xs text-red-500">
                      {formik.errors.institution}
                    </span>
                  )}
                </div>
              </>
            )}

            {selected === "Entrepreneur" && (
              <>
                <div>
                  <label
                    htmlFor="employed"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Employed
                  </label>
                  <select
                    id="employed"
                    name="employed"
                    {...formik.getFieldProps("employed")}
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select Employment Status</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {formik.touched.employed && formik.errors.employed && (
                    <span className="text-xs text-red-500">
                      {formik.errors.employed}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="business_designation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Business Designation
                  </label>
                  <select
                    id="business_designation"
                    name="business_designation"
                    {...formik.getFieldProps("business_designation")}
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select Designation</option>
                    <option value="Founder">Founder</option>
                    <option value="Co-Founder">Co-Founder</option>
                  </select>
                  {formik.touched.business_designation &&
                    formik.errors.business_designation && (
                      <span className="text-xs text-red-500">
                        {formik.errors.business_designation}
                      </span>
                    )}
                </div>
                <div>
                  <label
                    htmlFor="writing_language_proficiency"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Writing Language Proficiency
                  </label>
                  <input
                    id="writing_language_proficiency"
                    name="writing_language_proficiency"
                    type="text"
                    {...formik.getFieldProps("writing_language_proficiency")}
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formik.touched.writing_language_proficiency &&
                    formik.errors.writing_language_proficiency && (
                      <span className="text-xs text-red-500">
                        {formik.errors.writing_language_proficiency}
                      </span>
                    )}
                </div>

                <div>
                  <label
                    htmlFor="spoken_language_proficiency"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Spoken Language Proficiency
                  </label>
                  <input
                    id="spoken_language_proficiency"
                    name="spoken_language_proficiency"
                    type="text"
                    {...formik.getFieldProps("spoken_language_proficiency")}
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formik.touched.spoken_language_proficiency &&
                    formik.errors.spoken_language_proficiency && (
                      <span className="text-xs text-red-500">
                        {formik.errors.spoken_language_proficiency}
                      </span>
                    )}
                </div>
              </>
            )}

            {selected === "Shark" && (
              <>
                <div>
                  <label
                    htmlFor="networth"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Net Worth
                  </label>
                  <input
                    id="networth"
                    name="networth"
                    type="number"
                    {...formik.getFieldProps("networth")}
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formik.touched.networth && formik.errors.networth && (
                    <span className="text-xs text-red-500">
                      {formik.errors.networth}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="investment_capacity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Investment Capacity
                  </label>
                  <input
                    id="investment_capacity"
                    name="investment_capacity"
                    type="number"
                    {...formik.getFieldProps("investment_capacity")}
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formik.touched.investment_capacity &&
                    formik.errors.investment_capacity && (
                      <span className="text-xs text-red-500">
                        {formik.errors.investment_capacity}
                      </span>
                    )}
                </div>

                <div>
                  <label
                    htmlFor="file"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Business Documents
                  </label>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={(event) =>
                      formik.setFieldValue("file", event.currentTarget.files[0])
                    }
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formik.touched.file && formik.errors.file && (
                    <span className="text-xs text-red-500">
                      {formik.errors.file}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="domain"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Domain
                  </label>
                  <select
                    id="domain"
                    name="domain"
                    {...formik.getFieldProps("domain")}
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select Domain</option>
                    <option value="Technology">Technology</option>
                    <option value="Consumer Goods">Consumer Goods</option>
                    <option value="Health and Wellness">
                      Health and Wellness
                    </option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Education">Education</option>
                    <option value="Financial Services">
                      Financial Services
                    </option>
                  </select>
                  {formik.touched.domain && formik.errors.domain && (
                    <span className="text-xs text-red-500">
                      {formik.errors.domain}
                    </span>
                  )}
                </div>
              </>
            )}

            {selected != "Admin" && (
              <>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    {...formik.getFieldProps("state")}
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formik.touched.state && formik.errors.state && (
                    <span className="text-xs text-red-500">
                      {formik.errors.state}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    {...formik.getFieldProps("city")}
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formik.touched.city && formik.errors.city && (
                    <span className="text-xs text-red-500">
                      {formik.errors.city}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    {...formik.getFieldProps("address")}
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formik.touched.address && formik.errors.address && (
                    <span className="text-xs text-red-500">
                      {formik.errors.address}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Pincode
                  </label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    {...formik.getFieldProps("pincode")}
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {formik.touched.pincode && formik.errors.pincode && (
                    <span className="text-xs text-red-500">
                      {formik.errors.pincode}
                    </span>
                  )}
                </div>
              </>
            )}

            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Register
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 "
                onClick={formik.resetForm}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
