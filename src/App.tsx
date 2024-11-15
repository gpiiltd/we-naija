import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import SignUp from "./Pages/Createaccount";
import Login from "./Pages/Login";
import VADashboard from "./Pages/VADashboard/VADashboard";
import Reports from "./Pages/VADashboard/Reports/Reports";
import CommunityTasks from "./Pages/VADashboard/Reports/CommunityTasks";
import NCDPrevention from "./Pages/VADashboard/Reports/NCDPrevention";
import MentalHeaalth from "./Pages/VADashboard/Reports/MentalHeaalth";
import ReportForm from "./Pages/VADashboard/Reports/ReportForm";
import ForgotPassword from "./Pages/ForgotPassword";
import OTP from "./Pages/OTP";
import CreateNewPassword from "./Pages/CreateNewPassword";
import PendingKyc from "./Pages/Home/PendingKyc";
import HospitalDetail from "./Pages/Home/HospitalDetail";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/reset-password" element={<CreateNewPassword />} />



      <Route path="/verified-agent-dashboard" element={<VADashboard />}>
        <Route index element={<Navigate to="home" />} />
        <Route path="home" Component={PendingKyc} />
        <Route path="/verified-agent-dashboard/home/hospital-details" Component={HospitalDetail} />

        <Route path="reports" Component={Reports} />
        
        <Route path="/verified-agent-dashboard/reports/community-tasks" Component={CommunityTasks} />
        <Route path="/verified-agent-dashboard/reports/community-tasks/NCD-prevention" Component={NCDPrevention} />
        <Route path="/verified-agent-dashboard/reports/community-tasks/NCD-prevention/mental-health-promotion" Component={MentalHeaalth}
         />
          <Route path="/verified-agent-dashboard/reports/community-tasks/NCD-prevention/report-form" Component={ReportForm}
         />
        <Route path="leaderboard" element={<div>Leaderboard</div>} />
        <Route path="join-community" element={<div>Community</div>} />
        <Route path="settings" element={<div>Settings</div>} />
        <Route path="notifications" element={<div>Notificationss</div>} />
        <Route path="profile" element={<div>Profile</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;

