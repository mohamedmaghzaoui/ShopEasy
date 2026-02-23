import { useEffect, useState } from "react";
import axios from "axios";

export const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [payment, setPayment] = useState({
    OrderId: "",
    PaymentMethod: "",
    Amount: "",
    PaymentDate: "",
    Status: ""
  });
  const [editId, setEditId] = useState(null);

  const BASE_URL = "http://127.0.0.1:8000/payments";

  const fetchPayments = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setPayments(res.data);
    } catch (err) {
      console.error("Error fetching payments:", err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const savePayment = async () => {
    const payload = {
      ...payment,
      OrderId: parseInt(payment.OrderId),
      Amount: parseFloat(payment.Amount),
      PaymentDate: payment.PaymentDate
        ? new Date(payment.PaymentDate).toISOString()
        : new Date().toISOString()
    };

    try {
      if (editId) {
        await axios.put(`${BASE_URL}/${editId}`, payload);
      } else {
        await axios.post(BASE_URL, payload);
      }
      setEditId(null);
      setPayment({ OrderId: "", PaymentMethod: "", Amount: "", PaymentDate: "", Status: "" });
      fetchPayments();
    } catch (err) {
      console.error("Error saving payment:", err);
    }
  };

  const deletePayment = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      fetchPayments();
    } catch (err) {
      console.error("Error deleting payment:", err);
    }
  };

  const editPayment = (p) => {
    setEditId(p.PaymentId);
    const localDate = p.PaymentDate ? new Date(p.PaymentDate).toISOString().slice(0, 16) : "";
    setPayment({ ...p, PaymentDate: localDate });
  };

  return (
    <div className="container mt-4">
      <h3>Payments List</h3>

      <div className="mb-3 d-flex gap-2 flex-wrap">
        <input type="number" placeholder="OrderId" value={payment.OrderId} onChange={e => setPayment({ ...payment, OrderId: e.target.value })} />
        <input placeholder="Payment Method" value={payment.PaymentMethod} onChange={e => setPayment({ ...payment, PaymentMethod: e.target.value })} />
        <input type="number" placeholder="Amount" value={payment.Amount} onChange={e => setPayment({ ...payment, Amount: e.target.value })} />
        <input type="datetime-local" placeholder="Payment Date" value={payment.PaymentDate} onChange={e => setPayment({ ...payment, PaymentDate: e.target.value })} />
        <input placeholder="Status" value={payment.Status} onChange={e => setPayment({ ...payment, Status: e.target.value })} />
        <button onClick={savePayment} className="btn btn-primary">{editId ? "Update" : "Add"}</button>
      </div>

      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Order ID</th>
            <th>Method</th>
            <th>Amount (€)</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr><td colSpan="7" className="text-center">No payments found</td></tr>
          ) : (
            payments.map((p) => (
              <tr key={p.PaymentId}>
                <td>{p.PaymentId}</td>
                <td>{p.OrderId}</td>
                <td>{p.PaymentMethod}</td>
                <td>{p.Amount} €</td>
                <td>{new Date(p.PaymentDate).toLocaleString()}</td>
                <td>{p.Status || "Unpaid"}</td>
                <td>
                  <button onClick={() => editPayment(p)} className="btn btn-sm btn-warning me-2">Edit</button>
                  <button onClick={() => deletePayment(p.PaymentId)} className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};