import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import SignUp from "./Pages/Createaccount";
import Login from "./Pages/Login";
import VADashboard from "./Pages/VADashboard/VADashboard";
import Reports from "./Pages/VADashboard/Reports";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verified-agent-dashboard" element={<VADashboard />}>
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<div>Home</div>} />
        <Route path="reports" Component={Reports} />
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

