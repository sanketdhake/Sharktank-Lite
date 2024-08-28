import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AddInvestmentAPI } from "../../../services/investments/InvestmentServices";

// Validation Schema
const validationSchema = Yup.object({
  amount: Yup.number().required("Amount is required"),
  equity: Yup.number().required("Equity is required"),
  royalty: Yup.number().required("Royalty is required"),
  royalty_duration: Yup.number().required("Royalty Duration is required"),
});

export default function AddInvestment() {
  const navigate = useNavigate();
  const { mutateAsync, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: AddInvestmentAPI,
    mutationKey: ["add-investment"],
  });

  const formik = useFormik({
    initialValues: {
      amount: "",
      equity: "",
      royalty: "",
      royalty_duration: "",
      company_evaluation: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("Form values:", values);
        const data = await mutateAsync(values);
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    },
  });

  useEffect(() => {
    const { amount, equity } = formik.values;

    if (amount && equity) {
      const companyEvaluation = (amount * 100) / equity;
      formik.setFieldValue("company_evaluation", companyEvaluation.toFixed(2));
    }
  }, [formik.values.amount, formik.values.equity]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/shark/business");
      }, 1500);
    }
  }, [isPending, isError, isSuccess, error, navigate]);

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl w-full mt-4">
          <h2 className="text-2xl font-bold mb-4">Add Investment</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                {...formik.getFieldProps("amount")}
                className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {formik.touched.amount && formik.errors.amount && (
                <span className="text-xs text-red-500">
                  {formik.errors.amount}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="equity"
                className="block text-sm font-medium text-gray-700"
              >
                Equity
              </label>
              <input
                id="equity"
                name="equity"
                type="number"
                {...formik.getFieldProps("equity")}
                className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {formik.touched.equity && formik.errors.equity && (
                <span className="text-xs text-red-500">
                  {formik.errors.equity}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="royalty"
                className="block text-sm font-medium text-gray-700"
              >
                Royalty
              </label>
              <input
                id="royalty"
                name="royalty"
                type="number"
                {...formik.getFieldProps("royalty")}
                className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {formik.touched.royalty && formik.errors.royalty && (
                <span className="text-xs text-red-500">
                  {formik.errors.royalty}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="royalty_duration"
                className="block text-sm font-medium text-gray-700"
              >
                Royalty Duration (in months)
              </label>
              <input
                id="royalty_duration"
                name="royalty_duration"
                type="number"
                {...formik.getFieldProps("royalty_duration")}
                className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {formik.touched.royalty_duration &&
                formik.errors.royalty_duration && (
                  <span className="text-xs text-red-500">
                    {formik.errors.royalty_duration}
                  </span>
                )}
            </div>

            {/* Company Evaluation Field */}
            <div>
              <label
                htmlFor="company_evaluation"
                className="block text-sm font-medium text-gray-700"
              >
                Company Evaluation
              </label>
              <input
                id="company_evaluation"
                name="company_evaluation"
                type="number"
                value={formik.values.company_evaluation}
                disabled
                {...formik.getFieldProps("company_evaluation")}
                className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={`${
                isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded-full`}
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </form>
          {isError && (
            <div className="text-red-500 mt-4">
              An error occurred. Please try again later.
            </div>
          )}
          {isSuccess && (
            <div className="text-green-500 mt-4">
              Investment is added! Redirecting to dashboard...
            </div>
          )}
        </div>
      </div>
    </>
  );
}
