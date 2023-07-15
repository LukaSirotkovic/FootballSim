import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error retrieving users:', error);
      });
  }, []);

  
  return (
    <div>
      <h1>User List</h1>
      {users.map((user) => (
        <div key={user._id}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default UserList;