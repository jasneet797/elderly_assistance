import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Appointments from './pages/Appointments';
import Medication from './pages/Medication'; 
import HealthTracker from './pages/HealthTracker';
import SOS from './pages/SOS';
import AboutUs from './pages/AboutUs';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/medication-reminders" element={<Medication />} /> 
        <Route path="/health-tracker" element={<HealthTracker />} />
        <Route path="/sos" element={<SOS />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
};

export default App;
