import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Clubs from './pages/Clubs';
import LogIn from './pages/LogIn';
import UserList from './pages/Profile';
import Register from './pages/Register';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login (you can implement this based on your authentication logic)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout (you can implement this based on your authentication logic)
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <>
      <NavigationBar isLoggedIn={false} />

      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<UserList />} />
        <Route path='/register' element={<Register />} />
      </Routes>

    </>
  );
};

export default App;