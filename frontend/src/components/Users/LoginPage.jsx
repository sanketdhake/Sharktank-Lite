import React, { useState } from "react";
import { FaUser, FaUserTie } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

export default function LoginPage() {
  // State to keep track of the selected div
  const [selected, setSelected] = useState("Entrepreneur");

  // Handle div click
  const handleDivClick = (title) => {
    setSelected(title);
  };

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
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // Handle form submission
              console.log(values);
            }}
          >
            {({ resetForm }) => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
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
                    onClick={() => resetForm()}
                    className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                  >
                    Reset
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
