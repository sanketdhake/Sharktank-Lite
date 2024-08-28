import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { sharkProfileUpdateAPI } from "../../../services/User/shark/sharkServices";
import { useEffect } from "react";
import { useNavigate, useNavigation } from "react-router-dom";

const validationSchema = Yup.object({
  age: Yup.number(),
  gender: Yup.string(),
  mobile_no: Yup.string(),
  email_id: Yup.string().email("Invalid email address").required("Required"),
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

export default function SharkProfileUpdate() {
  const navigate = useNavigate();
  const { mutateAsync, isPending, isError, isSuccess } = useMutation({
    mutationFn: sharkProfileUpdateAPI,
    mutationKey: ["shark-profile-update"],
  });

  const formik = useFormik({
    initialValues: {
      age: "",
      gender: "",
      mobile_no: "",
      email_id: "",
      educational_qualification: "",
      institution: "",
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
    onSubmit: async (values) => {
      //making http request
      console.log("reachable");

      await mutateAsync(values)
        .then((data) => {
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });
  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        navigate("/login");
      }
    }, 1500);
  }, [isPending, isError, isSuccess]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
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
            <span className="text-xs text-red-500">{formik.errors.age}</span>
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
            <span className="text-xs text-red-500">{formik.errors.gender}</span>
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
            <span className="text-xs text-red-500">{formik.errors.file}</span>
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
            <option value="Health and Wellness">Health and Wellness</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Education">Education</option>
            <option value="Financial Services">Financial Services</option>
          </select>
          {formik.touched.domain && formik.errors.domain && (
            <span className="text-xs text-red-500">{formik.errors.domain}</span>
          )}
        </div>

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
            <span className="text-xs text-red-500">{formik.errors.state}</span>
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
            <span className="text-xs text-red-500">{formik.errors.city}</span>
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

        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update
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
  );
}
