import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import AdminRegisterForm from "./components/Admin/AdminRegisterForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLogin from "./components/Admin/AdminLoginform";
import UserLogin from "./components/User/UserLoginForm";
import AdminDashboard from "./components/Admin/AdminDash";
import OwnerDashboard from "./components/User/Owner/OwnerDashboard";
import ClinicDashboard from "./components/User/Clinic/ClinicDash";
import PendingClinics from "./components/Admin/PendingClinic";
import RegistrationSelection from "./pages/RegistrationSelection";
import OwnerRegisterForm from "./components/User/Owner/OwnerRegisterForm";
import ClinicRegisterForm from "./components/User/Clinic/ClinicRegiterForm";

function App() {
  return (
    <Router>
      <div className="fixed w-full">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminregisterform" element={<AdminRegisterForm />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/ownerdashboard" element={<OwnerDashboard />} />
        <Route path="/clinicdashboard" element={<ClinicDashboard />} />
        <Route path="/pendingclinics" element={<PendingClinics />} />
        <Route
          path="/registationselection"
          element={<RegistrationSelection />}
        />
        <Route path="/ownerregister" element={<OwnerRegisterForm />} />
        <Route path="/clinicregister" element={<ClinicRegisterForm />} />
      </Routes>

      <div className="fixed left-0 bottom-0 w-full ">
        <Footer />
      </div>
    </Router>
  );
}

export default App;
