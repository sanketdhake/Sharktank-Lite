import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { EntrepreneurProfileUpdateAPI } from "../../../services/User/entrepreneur/entrepreneurServices";
import { useEffect } from "react";
import { useNavigate, useNavigation } from "react-router-dom";

const validationSchema = Yup.object({
  age: Yup.number().required("Required").min(0, "Age cannot be negative"),
  mobile_no: Yup.string()
    .required("Required")
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  email_id: Yup.string().email("Invalid email format").required("Required"),
  educational_qualification: Yup.string().required("Required"),
  institution: Yup.string().required("Required"),
  employed: Yup.boolean().required("Required"),
  business_designation: Yup.string()
    .oneOf(["founder", "co-founder"], "Invalid designation")
    .required("Required"),
  writing_language_proficiency: Yup.string().required("Required"),
  spoken_language_proficiency: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  pincode: Yup.string()
    .required("Required")
    .matches(/^\d{6}$/, "Pincode must be exactly 6 digits"),
});

export default function EntrepreneurProfileUpdate() {
  const navigate = useNavigate();
  const { mutateAsync, isPending, isError, isSuccess } = useMutation({
    mutationFn: EntrepreneurProfileUpdateAPI,
    mutationKey: ["entrepreneur-profile-update"],
  });

  const formik = useFormik({
    initialValues: {
      age: "",
      mobile_no: "",
      email_id: "",
      educational_qualification: "",
      institution: "",
      employed: false,
      business_designation: "",
      writing_language_proficiency: "",
      spoken_language_proficiency: "",
      state: "",
      city: "",
      address: "",
      pincode: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        //console.log("Form values:", values);
        await mutateAsync(values);
        //console.log("Profile updated successfully");
      } catch (e) {
        console.error(e);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  }, [isPending, isError, isSuccess]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl w-full mt-4">
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
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
              Email ID
            </label>
            <input
              id="email_id"
              name="email_id"
              type="text"
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
              <option value={true}>Yes</option>
              <option value={false}>No</option>
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
              <option value="founder">Founder</option>
              <option value="co-founder">Co-Founder</option>
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
            <input
              id="address"
              name="address"
              type="text"
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

          <button
            type="submit"
            disabled={isPending}
            className="w-1/2 px-4 py-2 bg-blue-600 text-white font-bold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isPending ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {isError && (
          <div className="mt-4 text-red-500">
            An error occurred. Please try again.
          </div>
        )}

        {isSuccess && (
          <div className="mt-4 text-green-500">
            Profile updated successfully!
          </div>
        )}
      </div>
    </div>
  );
}
