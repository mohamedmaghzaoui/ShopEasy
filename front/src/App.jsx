import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppNavbar } from "../AppNavbar";

// Importer tes composants de pages
import { Users } from "./pages/User";

export default function App() {
  return (
    <Router>
      <AppNavbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<h2>Welcome to MyApp</h2>} />
        </Routes>
      </div>
    </Router>
  );
}
