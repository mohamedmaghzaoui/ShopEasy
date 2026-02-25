import React, { useEffect, useState } from "react";
import axios from "axios";

export const Buisness = () => {
  const [topCustomers, setTopCustomers] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/users/analyse/top-clients")
      .then(res => setTopCustomers(res.data))
      .catch(err => console.error("Erreur top clients:", err));

      axios.get("http://127.0.0.1:8000/products/top-three-products")
      .then(res => setTopProducts(res.data))
      .catch(err => console.error("Erreur top products:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 > Top 5 Clients les Plus Rentables</h2>

      <table className="table table-bordered mt-4">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Total Dépensé (€)</th>
            <th>Nombre de Commandes</th>
          </tr>
        </thead>
        <tbody>
          {topCustomers.map(c => (
            <tr key={c.UserId}>
              <td>{c.UserId}</td>
              <td>{c.LastName}</td>
              <td>{c.FirstName}</td>
              <td>{c.TotalSpent}</td>
              <td>{c.NumberOfOrders}</td>
            </tr>
          ))}
        </tbody>
      </table>


            <h2 > Top 3 Produits plus vendus</h2>

      <table className="table table-bordered mt-4">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Total Vendu</th>
          </tr>
        </thead>
        <tbody>
          {topProducts.map(p => (
            <tr key={p.ProductId}>
              <td>{p.ProductId}</td>
              <td>{p.ProductName}</td>
              <td>{p.TotalVendu}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};