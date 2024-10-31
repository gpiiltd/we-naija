import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Createaccount";
import Login from "./Pages/Login";
import Kyc from "./Pages/Kyc";
import KycPhonenumber from "./Components/KYCpages/KycPhonenumber";
import EnterOtp from "./Components/KYCpages/EnterOtp";
import PersonalInfo from "./Components/KYCpages/PersonalInfo";
import IdVerification from "./Components/KYCpages/IdVerification";
function App() {
    return (
      <Router>
        <Routes>
        <Route path="/" Component={SignUp} />
        <Route path="/login" Component={Login} />
        <Route path="/kyc/*" Component={Kyc} />
        <Route path="/kyc/validate-phone" Component={KycPhonenumber } />
        <Route path="/kyc/enter-otp" Component={EnterOtp } />
        <Route path="/kyc/personal-information" Component={PersonalInfo } />
        <Route path="/kyc/id-verification" Component={IdVerification } />
        </Routes>
         
      </Router>
  );
}

export default App;
