// Products.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Products = () => {
  const [products, setProducts] = useState([]);


  const [form, setForm] = useState({
    ProductName: "",
    Price: 0,
    Stock: 0,
    Description: "",
    CategoryId: ""
  });
  const [editingId, setEditingId] = useState(null);


  const [buyingProduct, setBuyingProduct] = useState(null);
  const [buyForm, setBuyForm] = useState({
    UserId: "",       
    Quantity: 1,
    PaymentMethod: "Carte Bancaire"
  });

  const productApi = "http://127.0.0.1:8000/products/";
  const fetchUrl = "http://127.0.0.1:8000/products/with-categories";
  const orderApi = "http://127.0.0.1:8000/orders/pay";

  const fetchProducts = async () => {
    try {
      const res = await axios.get(fetchUrl);
      setProducts(res.data);
    } catch (err) {
      alert("error")
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
    } catch (err){ alert("error") 

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
    } catch (err) { console.error(err); }
  };


  const handleBuyClick = (product) => {
    setBuyingProduct(product);
    setBuyForm({ UserId: "", Quantity: 1, PaymentMethod: "Carte Bancaire" });
  };

  const handleBuyChange = (e) => setBuyForm({ ...buyForm, [e.target.name]: e.target.value });

  const handleBuySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(orderApi, {
        UserId: Number(buyForm.UserId),
        ProductId: buyingProduct.ProductId,
        Quantity: Number(buyForm.Quantity),         
        PaymentMethod: buyForm.PaymentMethod
      });

      alert("Commande réussie ! ");
      setBuyingProduct(null);
      setBuyForm({ UserId: "", Quantity: 1, PaymentMethod: "Carte Bancaire" });
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || "Erreur lors de l'achat");
    }
  };

  return (
    <div className="container mt-4">


      <h2>{editingId ? "Modifier un Produit " : "Ajouter un produit"}</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-4"><input required type="text" className="form-control" placeholder="Nom du Produit" name="ProductName" value={form.ProductName} onChange={handleChange} /></div>
          <div className="col-md-2"><input required type="number" className="form-control" placeholder="Prix (€)" name="Price" value={form.Price} onChange={handleChange} /></div>
          <div className="col-md-2"><input type="number" className="form-control" placeholder="Stock" name="Stock" value={form.Stock} onChange={handleChange} /></div>
          <div className="col-md-4"><input type="text" className="form-control" placeholder="Description du Produit" name="Description" value={form.Description} onChange={handleChange} /></div>
        </div>
        <div className="row g-2 mt-2">
          <div className="col-md-2"><input required type="number" className="form-control" placeholder="ID Catégorie" name="CategoryId" value={form.CategoryId} onChange={handleChange} /></div>
          <div className="col-md-2"><button type="submit" className="btn btn-primary">{editingId ? "Modifier" : "Ajouter"}</button></div>
          {editingId && <div className="col-md-2"><button type="button" className="btn btn-secondary" onClick={() => { setForm({ ProductName: "", Price: 0, Stock: 0, Description: "", CategoryId: "" }); setEditingId(null); }}>Annuler</button></div>}
        </div>
      </form>


      {buyingProduct && (
        <div className="mb-4 p-3 border">
          <h4>Acheter : {buyingProduct.ProductName}</h4>
          <form onSubmit={handleBuySubmit}>
            <div className="row g-2">
              <div className="col-md-3"><input type="number" className="form-control" placeholder="Votre ID" name="UserId" value={buyForm.UserId} onChange={handleBuyChange} required /></div>
              <div className="col-md-2"><input type="number" min="1" max={buyingProduct.Stock} className="form-control" placeholder="Quantité" name="Quantity" value={buyForm.Quantity} onChange={handleBuyChange} required /></div>
              <div className="col-md-3">
                <select className="form-control" name="Methode de paiment" value={buyForm.PaymentMethod} onChange={handleBuyChange}>
                  <option>Carte Bancaire</option>
                  <option>PayPal</option>
                  <option>Visa</option>
                </select>
              </div>
              <div className="col-md-2"><button type="submit" className="btn btn-success">Confirmer Achat</button></div>
              <div className="col-md-2"><button type="button" className="btn btn-secondary" onClick={() => setBuyingProduct(null)}>Annuler</button></div>
            </div>
          </form>
        </div>
      )}


      <h3>Products avec categories</h3>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th><th>Nom</th><th>Prix</th><th>Stock</th><th>Description</th><th>Nom de la catégorie</th><th>Actions</th>
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
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(prod)}>Modifier</button>
                <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(prod.ProductId)}>Supprimer</button>
                <button className="btn btn-sm btn-primary" onClick={() => handleBuyClick(prod)}>Acheter</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};