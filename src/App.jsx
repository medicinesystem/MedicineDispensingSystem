import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Slider from './components/Slider';
import AboutUs from './components/AboutUs';
import OurMission from './components/OurMission';
import Footer from './components/Footer';
import Term from './components/Term';
import './App.css';

const MainPage = () => (
  <>
    <Slider />
    <AboutUs />
    <OurMission />
  </>
);

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/term" element={<Term />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
