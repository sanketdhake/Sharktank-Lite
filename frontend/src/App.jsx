import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import PublicNavbar from "./components/Navbar/Publicnavbar";
import LoginPage from "./components/Users/LoginPage";
import RegistrationPage from "./components/Users/RegistrationPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <PublicNavbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
