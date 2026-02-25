import axios from "axios";
import { useEffect, useState } from "react";

export const Analyse=()=>{

const UsersWithoutOrdersUrl = "http://127.0.0.1:8000/users/without-orders";
const categoryQueryUrl = "http://127.0.0.1:8000/categories/with-more-than-three-products";
const categoryTotalAmountUrl = "http://127.0.0.1:8000/categories/total-amount";
const [UsersWithoutOrders, setUsersWithoutOrders] = useState([]);
  const [categoriesQuery, setCategoriesQuery] = useState([]);

const fetchUsersWithoutOrders = async () => {
    try {
      const res = await axios.get(UsersWithoutOrdersUrl);
      setUsersWithoutOrders(res.data);
    } catch (err) {
      console.log(err)
    }
  };
    const fetchCategoriesQuery = async () => {
    try {
      const res = await axios.get(categoryQueryUrl);
      setCategoriesQuery(res.data);
    } catch (err) {
      console.log(err)
    }
  };

    const fetchCategoriesTotalAmount = async () => {
    try {
      const res = await axios.get(categoryTotalAmountUrl);
      setCategoriesQuery(res.data);
    } catch (err) {
      console.log(err)
    }
  };

    useEffect(() => {
      fetchUsersWithoutOrders();
      fetchCategoriesQuery();
      fetchCategoriesTotalAmount()
    }, []);
  
    return <div>
        <h1>Analyse</h1>


               <h3>Utilisateurs sans commandes</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Address</th>
            <th>telephone</th>
           
          </tr>
        </thead>
        <tbody>
          {UsersWithoutOrders.map(user => (
            <tr key={user.UserId}>
              <td>{user.UserId}</td>
              <td>{user.FirstName}</td>
              <td>{user.LastName}</td>
              <td>{user.Email}</td>
              <td>{user.Address}</td>
              <td>{user.Phone}</td>
          
            </tr>
          ))}
        </tbody>
      </table>



            <h3>Categories avec plus de 3 produits</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
              <th>ID Catégorie</th>
            <th>Nom de la Catégorie</th>
            <th>Total des Produits</th>
            
          </tr>
        </thead>
        <tbody>
          {categoriesQuery.map(cat => (
            <tr key={cat.CategoryId}>
              <td>{cat.CategoryId}</td>
              <td>{cat.CategoryName}</td>
              <td>{cat.totalProducts}</td>
       
            </tr>
          ))}
        </tbody>
      </table>


            <h3>Chiffre d'affaire par categories</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
              <th>ID Catégorie</th>
            <th>Nom de la Catégorie</th>
            <th>Montant Total</th>
            
          </tr>
        </thead>
        <tbody>
          {categoriesQuery.map(cat => (
            <tr key={cat.CategoryId}>
              <td>{cat.CategoryId}</td>
              <td>{cat.CategoryName}</td>
              <td>{cat.totalAmount ? cat.totalAmount:"0" }</td>
       
            </tr>
          ))}
        </tbody>
      </table>
    </div>
}