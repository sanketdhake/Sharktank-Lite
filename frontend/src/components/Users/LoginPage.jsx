import React, { useState } from "react";
import { useEffect } from "react";
import { FaUser, FaUserTie } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setUserAction, loginAction } from "../../Redux/Slice/authSlice";
import { entrepreneurLoginAPI } from "../../services/User/entrepreneur/entrepreneurServices";
import { sharkLoginAPI } from "../../services/User/shark/sharkServices";
import { adminLoginAPI } from "../../services/User/admin/adminServices";

const validationSchema = Yup.object({
  email_id: Yup.string().email("Invalid email_id address").required("Required"),
  password: Yup.string().required("Required"),
});

export default function LoginPage() {
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

  var userType = useSelector((state) => state.auth.userType);
  var navigation_link = "/";
  // Function to select the appropriate API based on userType
  const getLoginAPI = (userType) => {
    switch (userType) {
      case "Entrepreneur":
        navigation_link = "/entrepreneur/profile";
        return entrepreneurLoginAPI;
      case "Admin":
        navigation_link = "/admin/dashboard";
        return adminLoginAPI;
      case "Shark":
        navigation_link = "/shark/profile";
        return sharkLoginAPI;
      default:
        throw new Error("Invalid user type");
    }
  };
  const loginAPI = getLoginAPI(userType);

  //mutation
  const { mutateAsync, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  });

  const formik = useFormik({
    initialValues: {
      email_id: "",
      password: "",
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
          localStorage.setItem("userId", JSON.stringify(data.token));
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
        navigate(navigation_link);
      }
    }, 500);
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

        {/* Login Form */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email_id"
                className="block text-sm font-medium text-gray-700"
              >
                email_id
              </label>
              <input
                id="email_id"
                name="email_id"
                type="email_id"
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

            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Submit
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
