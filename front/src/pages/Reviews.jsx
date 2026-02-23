import React, { useEffect, useState } from "react";
import axios from "axios";

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({
    UserId: "",
    ProductId: "",
    Rating: "",
    Comment: "",
    Created_At: ""
  });
  const [editId, setEditId] = useState(null);

  const BASE_URL = "http://127.0.0.1:8000/reviews";

  // Charger toutes les reviews
  const fetchReviews = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Ajouter ou modifier une review
  const saveReview = async () => {
    try {
      const payload = {
        ...review,
        UserId: parseInt(review.UserId),
        ProductId: parseInt(review.ProductId),
        Rating: parseInt(review.Rating),
        Created_At: review.Created_At
          ? new Date(review.Created_At).toISOString()
          : new Date().toISOString()
      };

      if (editId) {
        await axios.put(`${BASE_URL}/${editId}`, payload);
        setEditId(null);
      } else {
        await axios.post(BASE_URL, payload);
      }

      setReview({ UserId: "", ProductId: "", Rating: "", Comment: "", Created_At: "" });
      fetchReviews();
    } catch (err) {
      console.error("Error saving review:", err);
    }
  };

  // Supprimer une review
  const deleteReview = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      fetchReviews();
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  // Préparer la review pour édition
  const editReview = (r) => {
    setEditId(r.ReviewId); // Correction ici
    const localDate = r.Created_At ? new Date(r.Created_At).toISOString().slice(0, 16) : "";
    setReview({ ...r, Created_At: localDate });
  };

  return (
    <div className="container mt-4">
      <h3>Reviews List</h3>

      {/* Formulaire d'ajout / édition */}
      <div className="mb-3 d-flex gap-2 flex-wrap">
        <input
          type="number"
          placeholder="UserId"
          value={review.UserId}
          onChange={(e) => setReview({ ...review, UserId: e.target.value })}
        />
        <input
          type="number"
          placeholder="ProductId"
          value={review.ProductId}
          onChange={(e) => setReview({ ...review, ProductId: e.target.value })}
        />
        <input
          type="number"
          placeholder="Rating"
          value={review.Rating}
          onChange={(e) => setReview({ ...review, Rating: e.target.value })}
        />
        <input
          placeholder="Comment"
          value={review.Comment}
          onChange={(e) => setReview({ ...review, Comment: e.target.value })}
        />
        <input
          type="datetime-local"
          placeholder="Created At"
          value={review.Created_At}
          onChange={(e) => setReview({ ...review, Created_At: e.target.value })}
        />
        <button onClick={saveReview} className="btn btn-primary">{editId ? "Update" : "Add"}</button>
      </div>

      {/* Tableau des reviews */}
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Review ID</th>
            <th>User ID</th>
            <th>Product ID</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">No reviews found</td>
            </tr>
          ) : (
            reviews.map((r) => (
              <tr key={r.ReviewId}>
                <td>{r.ReviewId}</td>
                <td>{r.UserId}</td>
                <td>{r.ProductId}</td>
                <td>{r.Rating}⭐</td>
                <td>{r.Comment}</td>
                <td>{new Date(r.Created_At).toLocaleString()}</td>
                <td>
                  <button onClick={() => editReview(r)} className="btn btn-sm btn-warning me-2">Edit</button>
                  <button onClick={() => deleteReview(r.ReviewId)} className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};