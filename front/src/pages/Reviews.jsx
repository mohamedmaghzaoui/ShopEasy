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

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const res = await axios.get("http://127.0.0.1:8000/reviews");
    setReviews(res.data);
  };

  const saveReview = async () => {
    if (editId) {
      await axios.put(`http://127.0.0.1:8000/reviews/${editId}`, review);
      setEditId(null);
    } else {
      await axios.post("http://127.0.0.1:8000/reviews", review);
    }
    setReview({ UserId: "", ProductId: "", Rating: "", Comment: "", Created_At: "" });
    fetchReviews();
  };

  const deleteReview = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/reviews/${id}`);
    fetchReviews();
  };

  const editReview = (r) => {
    setEditId(r.Id);
    setReview(r);
  };

  return (
    <div>
      <h2>Reviews</h2>

      <input placeholder="UserId" value={review.UserId} onChange={(e) => setReview({ ...review, UserId: e.target.value })} />
      <input placeholder="ProductId" value={review.ProductId} onChange={(e) => setReview({ ...review, ProductId: e.target.value })} />
      <input placeholder="Rating" value={review.Rating} onChange={(e) => setReview({ ...review, Rating: e.target.value })} />
      <input placeholder="Comment" value={review.Comment} onChange={(e) => setReview({ ...review, Comment: e.target.value })} />
      <input placeholder="Date" value={review.Created_At} onChange={(e) => setReview({ ...review, Created_At: e.target.value })} />

      <button onClick={saveReview}>{editId ? "Update" : "Add"}</button>

      <ul>
        {reviews.map((r) => (
          <li key={r.Id}>
            {r.Rating}⭐ - {r.Comment}
            <button onClick={() => editReview(r)}>Edit</button>
            <button onClick={() => deleteReview(r.Id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
