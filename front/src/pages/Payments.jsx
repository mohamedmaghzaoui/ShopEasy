import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const res = await axios.get("http://127.0.0.1:8000/payments");
    setPayments(res.data);
  };

  const savePayment = async () => {
    if (editId) {
      await axios.put(`http://127.0.0.1:8000/payments/${editId}`, payment);
      setEditId(null);
    } else {
      await axios.post("http://127.0.0.1:8000/payments", payment);
    }
    setPayment({ OrderId: "", PaymentMethod: "", Amount: "", PaymentDate: "", Status: "" });
    fetchPayments();
  };

  const deletePayment = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/payments/${id}`);
    fetchPayments();
  };

  const editPayment = (p) => {
    setEditId(p.PaymentId);
    setPayment(p);
  };

  return (
    <div>
      <h2>Payments</h2>

      <input placeholder="OrderId" value={payment.OrderId} onChange={(e) => setPayment({ ...payment, OrderId: e.target.value })} />
      <input placeholder="Method" value={payment.PaymentMethod} onChange={(e) => setPayment({ ...payment, PaymentMethod: e.target.value })} />
      <input placeholder="Amount" value={payment.Amount} onChange={(e) => setPayment({ ...payment, Amount: e.target.value })} />
      <input placeholder="Date" value={payment.PaymentDate} onChange={(e) => setPayment({ ...payment, PaymentDate: e.target.value })} />
      <input placeholder="Status" value={payment.Status} onChange={(e) => setPayment({ ...payment, Status: e.target.value })} />

      <button onClick={savePayment}>{editId ? "Update" : "Add"}</button>

      <ul>
        {payments.map((p) => (
          <li key={p.PaymentId}>
            {p.PaymentMethod} - {p.Amount}€
            <button onClick={() => editPayment(p)}>Edit</button>
            <button onClick={() => deletePayment(p.PaymentId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
