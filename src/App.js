import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import MyListings from './components/MyListings.js';
import CropInfo from './components/CropInfo.js';
import AboutUs from './components/AboutUs.js';
import AddCrop from './components/AddCrop.js';
import Signup from './components/Signup.js'; 




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/crop-info" element={<CropInfo />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/add" element={<AddCrop />} />
      </Routes>
    </Router>
  );
}

export default App;