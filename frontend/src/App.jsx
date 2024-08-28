import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import PublicNavbar from "./components/Navbar/Publicnavbar";
import Entrepreneur_Navbar from "./components/Navbar/Entrepreneur_navbar";
import Shark_Navbar from "./components/Navbar/Shark_Navbar";
import Admin_Navbar from "./components/Navbar/Admin_Navbar";
import LoginPage from "./components/Users/LoginPage";
import RegistrationPage from "./components/Users/RegistrationPage";
import { useSelector } from "react-redux";
import AdminDashboard from "./components/Users/Admin/AdminDashboard";
import EntrepreneurProfile from "./components/Users/Entrepreneur/EntrepreneurProfile";
import EntrepreneurBusiness from "./components/Users/Entrepreneur/EntreprenuerBusiness";
import EntrepreneurInvestments from "./components/Users/Entrepreneur/EntrepreneurInvestments";
import EntrepreneurAnalytics from "./components/Users/Entrepreneur/EntreprunerAnalytics";
import EntrepreneurSupport from "./components/Users/Entrepreneur/EntrepreneurSupport";
import BusinessRegistration from "./components/Business/BusinessRegistration";
import EntrepreneurProfileUpdate from "./components/Users/Entrepreneur/EntrepreneurProfileUpdate";
import BusinessUpdate from "./components/Business/BusinessUpdate";
import SharkProfile from "./components/Users/Shark/SharkProfile";
import SharkProfileUpdate from "./components/Users/Shark/SharkProfileUpdate";
import SharkBusiness from "./components/Users/Shark/SharkBusiness";
import AddInvestment from "./components/Users/Shark/AddInvestment";
import SharkInvestment from "./components/Users/Shark/SharkInvestments";

function App() {
  const userType = useSelector((state) => state.auth.userType);
  const userId = useSelector((state) => state.auth.userId);

  const renderNavbar = () => {
    if (userType && !userId) {
      return <PublicNavbar />;
    }

    if (userType && userId) {
      switch (userType) {
        case "Entrepreneur":
          return <Entrepreneur_Navbar />;
        case "Shark":
          return <Shark_Navbar />;
        case "Admin":
          return <Admin_Navbar />;
        default:
          return <PublicNavbar />;
      }
    }

    return null;
  };

  return (
    <>
      <BrowserRouter>
        {renderNavbar()}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/entrepreneur/profile"
            element={<EntrepreneurProfile />}
          />
          <Route
            path="/entrepreneur/profileUpdate"
            element={<EntrepreneurProfileUpdate />}
          />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="entrepreneur/list_business"
            element={<EntrepreneurBusiness />}
          />
          <Route
            path="entrepreneur/investments"
            element={<EntrepreneurInvestments />}
          />
          <Route
            path="entrepreneur/analytics"
            element={<EntrepreneurAnalytics />}
          />
          <Route
            path="entrepreneur/support"
            element={<EntrepreneurSupport />}
          />
          <Route path="business/register" element={<BusinessRegistration />} />
          <Route path="business/update" element={<BusinessUpdate />} />
          <Route path="/shark/profile" element={<SharkProfile />} />
          <Route path="/shark/profileUpdate" element={<SharkProfileUpdate />} />
          <Route path="/shark/business" element={<SharkBusiness />} />
          <Route path="/shark/addInvestment" element={<AddInvestment />} />
          <Route path="/shark/investments" element={<SharkInvestment />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
