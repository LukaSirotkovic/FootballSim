import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Clubs from './pages/Clubs';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ClubDetails from './pages/ClubDetails';
import FootballBracket from './pages/Bracket';

function App() {

  return (
    <>
      <NavigationBar />

      <Routes>
        <Route exact path="/bracket" element={<FootballBracket />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/register' element={<Register />} />
        <Route path='/clubs/:clubId' element={<ClubDetails />} />
      </Routes>

    </>
  );
};

export default App;