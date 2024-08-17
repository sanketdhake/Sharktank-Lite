import {
  FaMoneyBillWave,
  FaFilter,
  FaList,
  FaSignInAlt,
  FaChartPie,
} from "react-icons/fa";
import { IoIosStats } from "react-icons/io";

export default function HomePage() {
  return (
    <>
      <div className="bg-gradient-to-r from-green-400 to-blue-500 p-8 rounded-lg shadow-lg mt-4 mx-8 -mt-2 text-center">
        <h1 className="text-white text-4xl font-bold mb-6">
          Upgrade Your Business to the Next Level
        </h1>
        <p className="text-white text-xl mb-8">
          Upgrade your business with modern solutions designed for you
        </p>

        <div className="flex justify-center gap-24">
          <div className="bg-transparent p-6 flex flex-col items-center">
            <FaMoneyBillWave className="text-white text-4xl" />
            <span className="text-white text-xl mt-4">Efficient Tracking</span>
          </div>

          <div className="bg-transparent p-6 flex flex-col items-center">
            <FaFilter className="text-white text-4xl" />
            <span className="text-white text-xl mt-4">
              Investments Filtering
            </span>
          </div>

          <div className="bg-transparent p-6 flex flex-col items-center">
            <IoIosStats className="text-white text-4xl" />
            <span className="text-white text-xl mt-4">Insightful Reports</span>
          </div>
        </div>
        <button className="bg-white text-green-500 py-2 px-6 rounded-lg text-lg font-semibold">
          Get Started
        </button>
      </div>

      <div className="bg-white p-16 mx-8 mt-4 rounded-lg text-center">
        <h1 className="text-gray-800 text-3xl font-bold mb-8">How It Works</h1>
        <div className="flex justify-center gap-12">
          <div className="bg-transparent p-12 flex flex-col items-center flex-1">
            <div className="p-4 rounded-full bg-blue-500 text-white mb-4">
              <FaSignInAlt className="text-xl" />
            </div>
            <h3 className="text-gray-800 text-2xl font-semibold mt-4">
              Sign Up
            </h3>
            <p className="text-gray-700 mt-2">
              Register as an Entrepreneur and register your Business
            </p>
          </div>
          <div className="bg-transparent p-12 flex flex-col items-center flex-1">
            <div className="p-4 rounded-full bg-green-500 text-white mb-4">
              <FaList className="text-xl" />
            </div>
            <h3 className="text-gray-800 text-2xl font-semibold mt-4">
              Accept the Investments
            </h3>
            <p className="text-gray-700 mt-2">
              Get the Investment offers on your Business
            </p>
          </div>
          <div className="bg-transparent p-12 flex flex-col items-center flex-1">
            <div className="p-4 rounded-full bg-yellow-500 text-white mb-4">
              <FaChartPie className="text-xl" />
            </div>
            <h3 className="text-gray-800 text-2xl font-semibold mt-4">
              View Reports
            </h3>
            <p className="text-gray-700 mt-2">
              See insightful reports & graphs of your Business
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-8 mx-8 mt-4 rounded-lg">
        <h1 className="text-gray-800 text-3xl font-bold text-center mb-6">
          What Our Users Say
        </h1>
        <div className="flex justify-between mx-72">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1 mr-12">
            <p className="text-gray-700">
              This App is a game-changer for anyone interested in
              Entrepreneurship and Investments. The user interface is intuitive
              and the insights provided are incredibly valuable.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex-1 ml-12">
            <p className="text-gray-700">
              This Application has exceeded my expectations! The design is sleek
              and professional and the functionality is top-notch.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-500 p-8 mx-8 mt-4 rounded-lg text-center">
        <h1 className="text-white text-3xl font-bold mb-4">
          Ready to Take Control of Your Business?
        </h1>
        <h2 className="text-white text-xl mb-6">
          Join us now and start managing your Business like a pro!
        </h2>
        <button className="bg-white text-blue-500 py-2 px-6 rounded-lg text-lg font-semibold">
          Sign Up For Free
        </button>
      </div>
    </>
  );
}
