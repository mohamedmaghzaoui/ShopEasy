import React, { useEffect, useState } from "react";
import axios from "axios";



export const Users=()=>{
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/users");
        setUsers(response.data); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); 
  }, []); 

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.UserId}>{user.FirstName} {user.LastName} - {user.Email}</li>
        ))}
      </ul>
    </div>
  );
}
