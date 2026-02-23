// Products.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    ProductName: "",
    Price: NaN,
    Stock: NaN,
    Description: "",
    CategoryId: NaN
  });
  const [editingId, setEditingId] = useState(null);
  const productApi = "http://127.0.0.1:8000/products/";
  const fetchUrl = "http://127.0.0.1:8000/products/with-categories";


  const fetchProducts = async () => {
    try {
      const res = await axios.get(fetchUrl);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${productApi}${editingId}`, form);
      } else {
        await axios.post(productApi, form);
      }
      setForm({ ProductName: "", Price: 0, Stock: 0, Description: "", CategoryId: "" });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  
  const handleEdit = (product) => {
    setForm({
      ProductName: product.ProductName,
      Price: product.Price,
      Stock: product.Stock,
      Description: product.Description,
      CategoryId: product.CategoryId || ""
    });
    setEditingId(product.ProductId);
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${productApi}${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{editingId ? "Edit Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-4">
            <input required type="text" className="form-control" placeholder="Name" name="ProductName" value={form.ProductName} onChange={handleChange}  />
          </div>
          <div className="col-md-2">
            <input required type="number" className="form-control" placeholder="Price" name="Price" value={form.Price} onChange={handleChange}  />
          </div>
          <div className="col-md-2">
            <input type="number" className="form-control" placeholder="Stock" name="Stock" value={form.Stock} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Description" name="Description" value={form.Description} onChange={handleChange} />
          </div>
        </div>
        <div className="row g-2 mt-2">
          <div className="col-md-2">
            <input required type="number" className="form-control" placeholder="CategoryId" name="CategoryId" value={form.CategoryId} onChange={handleChange} />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary">{editingId ? "Update" : "Add"}</button>
          </div>
          {editingId && (
            <div className="col-md-2">
              <button type="button" className="btn btn-secondary" onClick={() => { setForm({ ProductName: "", Price: 0, Stock: 0, Description: "", CategoryId: "" }); setEditingId(null); }}>Cancel</button>
            </div>
          )}
        </div>
      </form>

      <h3>Products Acec categories</h3>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Description</th>
            <th>CategoryName</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.ProductId}>
              <td>{prod.ProductId}</td>
              <td>{prod.ProductName}</td>
              <td>{prod.Price}</td>
              <td>{prod.Stock}</td>
              <td>{prod.Description}</td>
              <td>{prod.CategoryName}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(prod)}>Edit</button>
                <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(prod.ProductId)}>Delete</button>
                <button className="btn btn-sm btn-primary" >Acheter</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};