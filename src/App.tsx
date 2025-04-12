import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import SignUp from "./Pages/Createaccount";
import Login from "./Pages/Login";
import Kyc from "./Pages/Kyc";
import KycPhonenumber from "./Components/KYCpages/KycPhonenumber";
import EnterOtp from "./Components/KYCpages/EnterOtp";
import PersonalInfo from "./Components/KYCpages/PersonalInfo";
import IdVerification from "./Components/KYCpages/IdVerification";
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
import Leaderboard from "./Pages/Leaderboard/Leaderboard";
import Hospitals from "./Pages/VADashboard/Reports/HIS/Hospitals";
import SurveyList from "./Pages/VADashboard/Reports/HIS/SurveyList/SurveyList";
import GiveReport from "./Pages/VADashboard/Reports/HIS/GiveReport/GiveReport";
import BasicInfo from "./Pages/Settings/BasicInfo";
import SettingsHeader from "./Pages/Settings/SettingsHeader";
import ContactInfo from "./Pages/Settings/ContactInfo";
import PasswordReset from "./Pages/Settings/PasswordReset";
import KycVerification from "./Pages/Settings/KycVerification";
import JoinCommunity from "./Pages/Settings/JoinCommunity";
import HelpandSupport from "./Pages/Settings/HelpandSupport";
import SettingsMobile from "./Pages/Settings/SettingsMobile";
import FAQ from "./Pages/Settings/FAQ";
import ContactUs from "./Pages/Settings/ContactUs";
import Notification from "./Pages/Notification";
import { Provider } from "react-redux";
import store from "../src/redux/Store/store";
import "react-toastify/dist/ReactToastify.css"; // Ensure this CSS is imported
import { ToastContainer } from "react-toastify";
import ForgotPasswordOtp from "./Pages/ForgotPasswordOtp";
import EmailSent from "./Pages/EmailSent";
import EmailVerification from "./Pages/EmailVerification";
function App() {
  return (
    <>
      {" "}
      <ToastContainer />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/email-sent" element={<EmailSent />} />
            <Route path="/email-verification/:uid/:email_token" element={<EmailVerification />} />
            <Route path="/reset-password" element={<CreateNewPassword />} />
            <Route path="/forgot-password-otp" element={<ForgotPasswordOtp />} />
            <Route path="/kyc/*" Component={Kyc} />
            <Route path="/kyc/validate-phone" Component={KycPhonenumber} />
            <Route path="/kyc/enter-otp" Component={EnterOtp} />
            <Route path="/kyc/personal-information" Component={PersonalInfo} />
            <Route path="/kyc/id-verification" Component={IdVerification} />
            <Route path="/verified-agent-dashboard" element={<VADashboard />}>
              <Route index element={<Navigate to="home" />} />
              <Route path="home" Component={PendingKyc} />
              <Route
                path="/verified-agent-dashboard/home/hospital-details/:id"
                Component={HospitalDetail}
              />
              <Route path="reports" Component={Reports} />
              <Route
                path="/verified-agent-dashboard/reports/community-tasks"
                Component={CommunityTasks}
              />
              <Route
                path="/verified-agent-dashboard/reports/NCD-prevention"
                Component={NCDPrevention}
              />
              <Route
                path="/verified-agent-dashboard/reports/community-tasks/NCD-prevention/mental-health-promotion"
                Component={MentalHeaalth}
              />
              <Route
                path="/verified-agent-dashboard/reports/community-tasks/NCD-prevention/report-form"
                Component={ReportForm}
              />
              <Route
                path="/verified-agent-dashboard/reports/hospitals"
                Component={Hospitals}
              />
              <Route
                path="/verified-agent-dashboard/reports/hospitals/survey-list/:id"
                Component={SurveyList}
              />
              <Route
                path="/verified-agent-dashboard/reports/hospitals/give-report/:id"
                Component={GiveReport}
              />
              <Route path="leaderboard" Component={Leaderboard} />
              <Route path="join-community" element={<div>Community</div>} />
              <Route path="settings" element={<SettingsHeader />}>
                <Route index element={<Navigate to="basic-information" />} />
                <Route path="basic-information" element={<BasicInfo />} />
                <Route path="contact-information" element={<ContactInfo />} />
                <Route path="password-reset" element={<PasswordReset />} />
                <Route path="kyc-verification" element={<KycVerification />} />
                <Route path="join-community" element={<JoinCommunity />} />
                <Route path="help-and-support" element={<HelpandSupport />} />
                <Route path="setting-mobile" element={<SettingsMobile />} />
                <Route path="help-and-support/faq" element={<FAQ />} />
                <Route
                  path="help-and-support/contact-us"
                  element={<ContactUs />}
                />
              </Route>
              <Route path="notifications" element={<Notification />} />
              <Route path="profile" element={<div>Profile</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
