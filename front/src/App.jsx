import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppNavbar } from "../AppNavbar"; 
import { Users } from "./pages/User";
import { Reviews } from "./pages/Reviews";
import { Payments } from "./pages/Payments";

export default function App() {
  return (
    <Router>
      <AppNavbar />

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<h2>Welcome to MyApp</h2>} />
          <Route path="/users" element={<Users />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </div>
    </Router>
  );
}
