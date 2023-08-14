import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';


const Profile = () => {

  const { user, login, loadingUser } = useAuth();

  useEffect(() => {
    // Fetch user data using the stored token
    const token = localStorage.getItem('token');
    if (token) {
      login(token)
    }
  }, []);

  if (loadingUser) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Error loading user data.</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;