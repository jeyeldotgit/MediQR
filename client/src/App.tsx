import { Routes, Route } from "react-router-dom";

// Component Imports
import Layout from "./components/Layout";

// Pages Import
import LandingPage from "./pages/LandingPage";

// Patient Pages
import PatientLogin from "./pages/patient/PatientLogin";
import PatientRegister from "./pages/patient/PatientRegister";
import PatientProfile from "./pages/patient/PatientProfile";
import PatientRecords from "./pages/patient/PatientRecords";
import PatientQRCode from "./pages/patient/PatientQRCode";

// Staff Pages
import StaffLogin from "./pages/staff/StaffLogin";
import StaffScanner from "./pages/staff/StaffScanner";
import StaffPatientProfile from "./pages/staff/StaffPatientProfile";
import StaffAddRecord from "./pages/staff/StaffAddRecord";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* Patient Routes */}
      <Route path="/patient" element={<Layout />}>
        <Route path="login" element={<PatientLogin />} />
        <Route path="register" element={<PatientRegister />} />
        <Route path="profile" element={<PatientProfile />} />
        <Route path="records" element={<PatientRecords />} />
        <Route path="qr-code" element={<PatientQRCode />} />
      </Route>

      {/* Staff Routes */}
      <Route path="/staff" element={<Layout />}>
        <Route path="login" element={<StaffLogin />} />
        <Route path="scanner" element={<StaffScanner />} />
        <Route path="patient/:id" element={<StaffPatientProfile />} />
        <Route path="add-record" element={<StaffAddRecord />} />
      </Route>
    </Routes>
  );
};

export default App;
