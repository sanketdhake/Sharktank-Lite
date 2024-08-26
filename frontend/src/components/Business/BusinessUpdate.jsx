import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { BusinessUpdateAPI } from "../../services/Business/businessServices";
import { useNavigate } from "react-router-dom";

// Define validation schema
const validationSchema = Yup.object({
  business_stage: Yup.string()
    .oneOf(["concept", "pre-revenue", "revenue"], "Invalid stage")
    .required("Required"),
  business_category: Yup.string()
    .oneOf(
      ["manufactured goods", "components and raw material", "digital service"],
      "Invalid category"
    )
    .required("Required"),
  registration_status: Yup.string()
    .oneOf(
      [
        "unregistered",
        "unincorporated",
        "sole partnership",
        "limited liability partnership",
        "registered partnership",
        "private limited company",
        "one person company",
        "other",
      ],
      "Invalid status"
    )
    .required("Required"),
  cin: Yup.string().required("Required"),
  number_of_founders: Yup.number()
    .required("Required")
    .min(1, "At least one founder is required"),
  current_status: Yup.string()
    .oneOf(["profitable", "breakeven", "loss"], "Invalid status")
    .required("Required"),
  business_years: Yup.number()
    .required("Required")
    .min(0, "Years cannot be negative"),
  business_months: Yup.number()
    .required("Required")
    .min(0, "Months cannot be negative"),
  website_link: Yup.string().url("Invalid URL"),
  file: Yup.mixed()
    .required("A file is required")
    .test(
      "fileSize",
      "File size is too large, max size is 2MB",
      (value) => !value || (value && value.size <= 2 * 1024 * 1024) // 2MB limit
    )
    .test(
      "fileFormat",
      "Unsupported format, only images are allowed",
      (value) => !value || (value && value.type.startsWith("image/"))
    ),
  month1: Yup.date().required("Month 1 date is required"),
  month1_revenue: Yup.number().required("Month 1 revenue is required"),
  month2: Yup.date().required("Month 2 date is required"),
  month2_revenue: Yup.number().required("Month 2 revenue is required"),
  month3: Yup.date().required("Month 3 date is required"),
  month3_revenue: Yup.number().required("Month 3 revenue is required"),
  file2: Yup.mixed()
    .test(
      "file2Size",
      "File size is too large, max size is 2MB",
      (value) => !value || (value && value.size <= 2 * 1024 * 1024) // 2MB limit
    )
    .test(
      "file2Format",
      "Unsupported format, only documents are allowed",
      (value) => !value || (value && value.type.startsWith("application/"))
    ),
  Registration_reason: Yup.string()
    .oneOf(
      [
        "To raise funds",
        "for guidance",
        "create social awareness",
        "marketing",
      ],
      "Invalid reason"
    )
    .required("Required"),
  bankruptcy: Yup.boolean().required("Required"),
  pending_legal_proceedings: Yup.boolean().required("Required"),
});

// Formik setup
const useBusinessUpdateFormik = (onSubmit) => {
  return useFormik({
    initialValues: {
      business_stage: "",
      business_category: "",
      registration_status: "",
      cin: "",
      number_of_founders: "",
      current_status: "",
      business_years: "",
      business_months: "",
      website_link: "",
      file: null,
      month1: "",
      month1_revenue: "",
      month2: "",
      month2_revenue: "",
      month3: "",
      month3_revenue: "",
      file2: null,
      Registration_reason: "",
      bankruptcy: false,
      pending_legal_proceedings: false,
    },
    validationSchema,
    onSubmit,
  });
};

// BusinessUpdate component
export default function BusinessUpdate() {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationFn: BusinessUpdateAPI,
    mutationKey: ["business-update"],
    onSuccess: () => {
      navigate("/entrepreneur/list_business");
    },
  });

  const formik = useBusinessUpdateFormik(async (values) => {
    try {
      await mutateAsync(values);
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl w-full mt-4">
        <h2 className="text-2xl font-bold mb-4">Business Update</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Business Stage */}
          <div>
            <label
              htmlFor="business_stage"
              className="block text-sm font-medium text-gray-700"
            >
              Business Stage
            </label>
            <select
              id="business_stage"
              name="business_stage"
              {...formik.getFieldProps("business_stage")}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Stage</option>
              <option value="concept">Concept</option>
              <option value="pre-revenue">Pre-Revenue</option>
              <option value="revenue">Revenue</option>
            </select>
            {formik.touched.business_stage && formik.errors.business_stage && (
              <span className="text-xs text-red-500">
                {formik.errors.business_stage}
              </span>
            )}
          </div>

          {/* Business Category */}
          <div>
            <label
              htmlFor="business_category"
              className="block text-sm font-medium text-gray-700"
            >
              Business Category
            </label>
            <select
              id="business_category"
              name="business_category"
              {...formik.getFieldProps("business_category")}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Category</option>
              <option value="manufactured goods">Manufactured Goods</option>
              <option value="components and raw material">
                Components and Raw Material
              </option>
              <option value="digital service">Digital Service</option>
            </select>
            {formik.touched.business_category &&
              formik.errors.business_category && (
                <span className="text-xs text-red-500">
                  {formik.errors.business_category}
                </span>
              )}
          </div>

          {/* Registration Status */}
          <div>
            <label
              htmlFor="registration_status"
              className="block text-sm font-medium text-gray-700"
            >
              Registration Status
            </label>
            <select
              id="registration_status"
              name="registration_status"
              {...formik.getFieldProps("registration_status")}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Status</option>
              <option value="unregistered">Unregistered</option>
              <option value="unincorporated">Unincorporated</option>
              <option value="sole partnership">Sole Partnership</option>
              <option value="limited liability partnership">
                Limited Liability Partnership
              </option>
              <option value="registered partnership">
                Registered Partnership
              </option>
              <option value="private limited company">
                Private Limited Company
              </option>
              <option value="one person company">One Person Company</option>
              <option value="other">Other</option>
            </select>
            {formik.touched.registration_status &&
              formik.errors.registration_status && (
                <span className="text-xs text-red-500">
                  {formik.errors.registration_status}
                </span>
              )}
          </div>

          {/* CIN */}
          <div>
            <label
              htmlFor="cin"
              className="block text-sm font-medium text-gray-700"
            >
              CIN
            </label>
            <input
              id="cin"
              name="cin"
              type="text"
              {...formik.getFieldProps("cin")}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {formik.touched.cin && formik.errors.cin && (
              <span className="text-xs text-red-500">{formik.errors.cin}</span>
            )}
          </div>

          {/* Number of Founders */}
          <div>
            <label
              htmlFor="number_of_founders"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Founders
            </label>
            <input
              id="number_of_founders"
              name="number_of_founders"
              type="number"
              {...formik.getFieldProps("number_of_founders")}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {formik.touched.number_of_founders &&
              formik.errors.number_of_founders && (
                <span className="text-xs text-red-500">
                  {formik.errors.number_of_founders}
                </span>
              )}
          </div>

          {/* Current Status */}
          <div>
            <label
              htmlFor="current_status"
              className="block text-sm font-medium text-gray-700"
            >
              Current Status
            </label>
            <select
              id="current_status"
              name="current_status"
              {...formik.getFieldProps("current_status")}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Status</option>
              <option value="profitable">Profitable</option>
              <option value="breakeven">Breakeven</option>
              <option value="loss">Loss</option>
            </select>
            {formik.touched.current_status && formik.errors.current_status && (
              <span className="text-xs text-red-500">
                {formik.errors.current_status}
              </span>
            )}
          </div>

          {/* Business Years */}
          <div>
            <label
              htmlFor="business_years"
              className="block text-sm font-medium text-gray-700"
            >
              Business Years
            </label>
            <input
              id="business_years"
              name="business_years"
              type="number"
              {...formik.getFieldProps("business_years")}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {formik.touched.business_years && formik.errors.business_years && (
              <span className="text-xs text-red-500">
                {formik.errors.business_years}
              </span>
            )}
          </div>

          {/* Business Months */}
          <div>
            <label
              htmlFor="business_months"
              className="block text-sm font-medium text-gray-700"
            >
              Business Months
            </label>
            <input
              id="business_months"
              name="business_months"
              type="number"
              {...formik.getFieldProps("business_months")}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {formik.touched.business_months &&
              formik.errors.business_months && (
                <span className="text-xs text-red-500">
                  {formik.errors.business_months}
                </span>
              )}
          </div>

          {/* Website Link */}
          <div>
            <label
              htmlFor="website_link"
              className="block text-sm font-medium text-gray-700"
            >
              Website Link
            </label>
            <input
              id="website_link"
              name="website_link"
              type="text"
              {...formik.getFieldProps("website_link")}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {formik.touched.website_link && formik.errors.website_link && (
              <span className="text-xs text-red-500">
                {formik.errors.website_link}
              </span>
            )}
          </div>

          {/* File */}
          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              File
            </label>
            <input
              id="file"
              name="file"
              type="file"
              onChange={(event) =>
                formik.setFieldValue("file", event.target.files[0])
              }
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {formik.touched.file && formik.errors.file && (
              <span className="text-xs text-red-500">{formik.errors.file}</span>
            )}
          </div>

          {/* Month 1 */}
          <div>
            <label
              htmlFor="month1"
              className="block text-sm font-medium text-gray-700"
            >
              Month 1
            </label>
            <input
              id="month1"
              name="month1"
              type="date"
              {...formik.getFieldProps("month1")}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {formik.touched.month1 && formik.errors.month1 && (
              <span className="text-xs text-red-500">
                {formik.errors.month1}
              </span>
            )}
          </div>

          {/* Month 1 Revenue */}
          <div>
            <label
              htmlFor="month1_revenue"
              className="block text-sm font-medium text-gray-700"
            >
              Month 1 Revenue
            </label>
            <input
              id="month1_revenue"
              name="month1_revenue"
              type="number"
              {...formik.getFieldProps("month1_revenue")}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {formik.touched.month1_revenue && formik.errors.month1_revenue && (
              <span className="text-xs text-red-500">
                {formik.errors.month1_revenue}
              </span>
            )}
          </div>

          {/* Month 2 */}
          <div>
            <label
              htmlFor="month2"
              className="block text-sm font-medium text-gray-700"
            >
              Month 2
            </label>
            <input
              id="month2"
              name="month2"
              type="date"
              {...formik.getFieldProps("month2")}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {formik.touched.month2 && formik.errors.month2 && (
              <span className="text-xs text-red-500">
                {formik.errors.month2}
              </span>
            )}
          </div>

          {/* Month 2 Revenue */}
          <div>
            <label
              htmlFor="month2_revenue"
              className="block text-sm font-medium text-gray-700"
            >
              Month 2 Revenue
            </label>
            <input
              id="month2_revenue"
              name="month2_revenue"
              type="number"
              {...formik.getFieldProps("month2_revenue")}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {formik.touched.month2_revenue && formik.errors.month2_revenue && (
              <span className="text-xs text-red-500">
                {formik.errors.month2_revenue}
              </span>
            )}
          </div>

          {/* Month 3 */}
          <div>
            <label
              htmlFor="month3"
              className="block text-sm font-medium text-gray-700"
            >
              Month 3
            </label>
            <input
              id="month3"
              name="month3"
              type="date"
              {...formik.getFieldProps("month3")}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {formik.touched.month3 && formik.errors.month3 && (
              <span className="text-xs text-red-500">
                {formik.errors.month3}
              </span>
            )}
          </div>

          {/* Month 3 Revenue */}
          <div>
            <label
              htmlFor="month3_revenue"
              className="block text-sm font-medium text-gray-700"
            >
              Month 3 Revenue
            </label>
            <input
              id="month3_revenue"
              name="month3_revenue"
              type="number"
              {...formik.getFieldProps("month3_revenue")}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {formik.touched.month3_revenue && formik.errors.month3_revenue && (
              <span className="text-xs text-red-500">
                {formik.errors.month3_revenue}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="file2"
              className="block text-sm font-medium text-gray-700"
            >
              Business Documents
            </label>
            <input
              id="file2"
              name="file2"
              type="file"
              onChange={(event) =>
                formik.setFieldValue("file2", event.target.files[0])
              }
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {formik.touched.file2 && formik.errors.file2 && (
              <span className="text-xs text-red-500">
                {formik.errors.file2}
              </span>
            )}
          </div>

          {/* Registration Reason */}
          <div>
            <label
              htmlFor="Registration_reason"
              className="block text-sm font-medium text-gray-700"
            >
              Registration Reason
            </label>
            <select
              id="Registration_reason"
              name="Registration_reason"
              {...formik.getFieldProps("Registration_reason")}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Reason</option>
              <option value="To raise funds">To raise funds</option>
              <option value="for guidance">For guidance</option>
              <option value="create social awareness">
                Create social awareness
              </option>
              <option value="marketing">Marketing</option>
            </select>
            {formik.touched.Registration_reason &&
              formik.errors.Registration_reason && (
                <span className="text-xs text-red-500">
                  {formik.errors.Registration_reason}
                </span>
              )}
          </div>

          {/* Bankruptcy */}
          <div>
            <label
              htmlFor="bankruptcy"
              className="block text-sm font-medium text-gray-700"
            >
              Bankruptcy
            </label>
            <select
              id="bankruptcy"
              name="bankruptcy"
              {...formik.getFieldProps("bankruptcy")}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Option</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            {formik.touched.bankruptcy && formik.errors.bankruptcy && (
              <span className="text-xs text-red-500">
                {formik.errors.bankruptcy}
              </span>
            )}
          </div>

          {/* Pending Legal Proceedings */}
          <div>
            <label
              htmlFor="pending_legal_proceedings"
              className="block text-sm font-medium text-gray-700"
            >
              Pending Legal Proceedings
            </label>
            <select
              id="pending_legal_proceedings"
              name="pending_legal_proceedings"
              {...formik.getFieldProps("pending_legal_proceedings")}
              className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Option</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            {formik.touched.pending_legal_proceedings &&
              formik.errors.pending_legal_proceedings && (
                <span className="text-xs text-red-500">
                  {formik.errors.pending_legal_proceedings}
                </span>
              )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {formik.isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
