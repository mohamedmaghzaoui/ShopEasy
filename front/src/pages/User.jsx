import { useEffect, useState } from "react";
import axios from "axios";


export const Users = () => {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({ FirstName: "", LastName: "", Email: "", Address: "", Phone: "" });
  const [editingId, setEditingId] = useState(null);

  const UsersUrl = "http://127.0.0.1:8000/users";
  const UsersWithoutOrdersUrl = "http://127.0.0.1:8000/users/without-orders";

  
  const fetchUsers = async () => {
    try {
      const res = await axios.get(UsersUrl);
      setUsers(res.data);
    } catch (err) {
      console.log(err)
    }
  };


  useEffect(() => {
    fetchUsers();

  }, []);

  


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${UsersUrl}/${editingId}`, form);
      } else {
        await axios.post(UsersUrl, form);
      }
      setForm({ FirstName: "", LastName: "", Email: "", Address: "", Phone: "" });
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setForm({
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      Address: user.Address,
      Phone: user.Phone,
    });
    setEditingId(user.UserId);
  };

 
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${UsersUrl}/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{editingId ? "Edit r" : "Ajouter un utilisateur"}</h2>

     
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-2">
            <input  type="text" className="form-control" placeholder="First Name" name="FirstName" value={form.FirstName} onChange={handleChange} required />
          </div>
          <div className="col-md-2">
            <input   type="text" className="form-control" placeholder="Last Name" name="LastName" value={form.LastName} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <input  type="email" className="form-control" placeholder="Email" name="Email" value={form.Email} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <input  type="text" className="form-control" placeholder="Address" name="Address" value={form.Address} onChange={handleChange} />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control" placeholder="Phone" name="Phone" value={form.Phone} onChange={handleChange} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-2">{editingId ? "Update" : "Add"}</button>
        {editingId && <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={() => { setForm({ FirstName: "", LastName: "", Email: "", Address: "", Phone: "" }); setEditingId(null); }}>Cancel</button>}
      </form>

    
      <h3>Utilisateurs</h3>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Address</th>
            <th>telephone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.UserId}>
              <td>{user.UserId}</td>
              <td>{user.FirstName}</td>
              <td>{user.LastName}</td>
              <td>{user.Email}</td>
              <td>{user.Address}</td>
              <td>{user.Phone}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(user)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.UserId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};