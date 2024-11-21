import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Createaccount";
import Login from "./Pages/Login";
import VADashboard from "./Pages/VADashboard/VADashboard";
function App() {
    return (
      <Router>
        <Routes>
        <Route path="/" Component={SignUp} />
        <Route path="/login" Component={Login} />
        <Route path="/verified-agent-dashboard" Component={VADashboard} />

        </Routes>
         
      </Router>
  );
}

export default App;
