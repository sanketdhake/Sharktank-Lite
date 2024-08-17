import React, { useState } from "react";
import { FaUser, FaUserTie } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
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
  networth: Yup.number(),
  investment_capacity: Yup.number(),
  domain: Yup.string(),
  state: Yup.string(),
  city: Yup.string(),
  address: Yup.string(),
  pincode: Yup.string(),
});

export default function RegistrationPage() {
  const [selected, setSelected] = useState("Entrepreneur");

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

        {/* Registration Form */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <Formik
            initialValues={{
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
              writing_language_proficiency: "",
              spoken_language_proficiency: "",
              networth: "",
              investment_capacity: "",
              domain: "",
              state: "",
              city: "",
              address: "",
              pincode: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ resetForm }) => (
              <Form className="space-y-4">
                {/* Common Fields */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
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
                      <Field
                        id="dob"
                        name="dob"
                        type="date"
                        className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="dob"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="age"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Age
                      </label>
                      <Field
                        id="age"
                        name="age"
                        type="number"
                        className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="age"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Gender
                      </label>
                      <Field
                        as="select"
                        id="gender"
                        name="gender"
                        className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="mobile_no"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Mobile Number
                      </label>
                      <Field
                        id="mobile_no"
                        name="mobile_no"
                        type="text"
                        className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="mobile_no"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
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
                  <Field
                    id="email_id"
                    name="email_id"
                    type="email"
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="email_id"
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

                <div>
                  <label
                    htmlFor="confirm_password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <Field
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="confirm_password"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {selected === "Entrepreneur" && (
                  <>
                    <div>
                      <label
                        htmlFor="educational_qualification"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Educational Qualification
                      </label>
                      <Field
                        id="educational_qualification"
                        name="educational_qualification"
                        type="text"
                        className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="educational_qualification"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="institution"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Institution
                      </label>
                      <Field
                        id="institution"
                        name="institution"
                        type="text"
                        className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="institution"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="employed"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Employed
                      </label>
                      <Field
                        as="select"
                        id="employed"
                        name="employed"
                        className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="">Select Employment Status</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Field>
                      <ErrorMessage
                        name="employed"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="business_designation"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Business Designation
                      </label>
                      <Field
                        as="select"
                        id="business_designation"
                        name="business_designation"
                        className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="">Select Designation</option>
                        <option value="Founder">Founder</option>
                        <option value="Co-Founder">Co-Founder</option>
                      </Field>
                      <ErrorMessage
                        name="business_designation"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="writing_language_proficiency"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Writing Language Proficiency
                      </label>
                      <Field
                        id="writing_language_proficiency"
                        name="writing_language_proficiency"
                        type="text"
                        className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="writing_language_proficiency"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="spoken_language_proficiency"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Spoken Language Proficiency
                      </label>
                      <Field
                        id="spoken_language_proficiency"
                        name="spoken_language_proficiency"
                        type="text"
                        className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="spoken_language_proficiency"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>
                  </>
                )}

                {selected === "Shark" && (
                  <>
                    <div>
                      <label
                        htmlFor="educational_qualification"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Educational Qualification
                      </label>
                      <Field
                        id="educational_qualification"
                        name="educational_qualification"
                        type="text"
                        className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="educational_qualification"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="institution"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Institution
                      </label>
                      <Field
                        id="institution"
                        name="institution"
                        type="text"
                        className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="institution"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="networth"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Net Worth
                      </label>
                      <Field
                        id="networth"
                        name="networth"
                        type="number"
                        className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="networth"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="investment_capacity"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Investment Capacity
                      </label>
                      <Field
                        id="investment_capacity"
                        name="investment_capacity"
                        type="number"
                        className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="investment_capacity"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="domain"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Domain
                      </label>
                      <Field
                        as="select"
                        id="domain"
                        name="domain"
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
                      </Field>
                      <ErrorMessage
                        name="domain"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>
                  </>
                )}

                {selected !== "Admin" && (
                  <>
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State
                      </label>
                      <Field
                        id="state"
                        name="state"
                        type="text"
                        className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="state"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <Field
                        id="city"
                        name="city"
                        type="text"
                        className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <Field
                        id="address"
                        name="address"
                        type="text"
                        className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="pincode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Pincode
                      </label>
                      <Field
                        id="pincode"
                        name="pincode"
                        type="text"
                        className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <ErrorMessage
                        name="pincode"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>
                  </>
                )}

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
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
