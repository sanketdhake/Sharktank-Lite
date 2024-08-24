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
import SharkProfile from "./components/Users/Shark/SharkProfile";
import EntrepreneurBusiness from "./components/Users/Entrepreneur/EntreprenuerBusiness";

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
          <Route path="/shark/profile" element={<SharkProfile />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="entrepreneur/list_business"
            element={<EntrepreneurBusiness />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
