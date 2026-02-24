import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppNavbar } from "../AppNavbar";


import { Users } from "./pages/User";
import { Categories } from "./pages/Categories";
import { Products } from "./pages/Products";
import { Orders } from "./pages/Orders";
import { Reviews } from "./pages/Reviews";
import { Payments } from "./pages/Payments";
import { Buisness } from "./pages/Buisness";

export default function App() {
  return (
    <Router>
      <AppNavbar />

      <div className="container mt-3">
        <Routes>
          {/* Pages principales */}
          <Route path="/" element={<h2>Home page</h2>} />
          <Route path="/users" element={<Users />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/payments" element={<Payments />} />

          {/* Page Analyse / Dashboard */}
          <Route path="/buisness" element={<Buisness />} />
        </Routes>
      </div>
    </Router>
  );
}