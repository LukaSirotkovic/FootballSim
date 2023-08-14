import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Clubs from './pages/Clubs';
import LogIn from './pages/LogIn';
import UserList from './pages/Profile';
import Register from './pages/Register';
import { createContext, useContext } from 'react';

function App() {



  return (
    <>
      <NavigationBar />

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