// Categories.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  
  const [form, setForm] = useState({ CategoryName: "" });
  const [editingId, setEditingId] = useState(null);

  const categoryUrl = "http://127.0.0.1:8000/categories";



  const fetchCategories = async () => {
    try {
      const res = await axios.get(categoryUrl);
      setCategories(res.data);
    } catch (err) {
    console.log(err)
    }
  };


  useEffect(() => {
    fetchCategories();
  
  }, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${categoryUrl}/${editingId}`, form);
      } else {
        await axios.post(categoryUrl, form);
      }
      setForm({ CategoryName: "" });
      setEditingId(null);
      fetchCategories();
      
    } catch (err) {
     console.log(err)
    }
  };

 
  const handleEdit = (category) => {
    setForm({ CategoryName: category.CategoryName });
    setEditingId(category.CategoryId);
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`${categoryUrl}/${id}`);
      fetchCategories();
    } catch (err) {
      alert("error")
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">{editingId ? "Modifier la Catégorie" : "Ajouter une Catégorie"}</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2 align-items-center">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Nom de la Catégorie"
              name="CategoryName"
              value={form.CategoryName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <button type="submit" className="btn btn-primary me-2">
              {editingId ? "Modifier" : "Ajouter"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setForm({ CategoryName: "" });
                  setEditingId(null);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      <h3>Liste des Catégories</h3>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
              <th>ID Catégorie</th>
            <th>Nom de la Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.CategoryId}>
              <td>{cat.CategoryId}</td>
              <td>{cat.CategoryName}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(cat)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(cat.CategoryId)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



 
    </div>
  );
};