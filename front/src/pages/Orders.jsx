import { useEffect, useState } from "react";
import axios from "axios";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  const ordersUrl = "http://127.0.0.1:8000/orders";

  const fetchOrders = async () => {
    try {
      const res = await axios.get(ordersUrl);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Liste des Commandes</h3>

      <table className="table table-bordered table-hover">
        <thead className="">
            <th>ID Commande</th>
<th>Client</th>
<th>Date</th>
<th>Montant Total (€)</th>
<th>Nombre d'Articles</th>
<th>Statut</th>
<th>Moyen de Paiement</th>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.OrderId}>
                <td>{order.OrderId}</td>
                <td>{order.FirstName}</td>
                <td>{order.OrderDate}</td>
                <td>{order.TotalAmount} €</td>
                <td>{order.TotalItems}</td>
                <td>{order.PaymentStatus || "non payé"}</td>
                <td>{order.PaymentMethod || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};