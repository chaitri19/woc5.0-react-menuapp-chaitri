import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Main} from './pages/main';
import {Login} from './pages/login';
import {Register} from './pages/register';
import {About} from './pages/about';
import {Dish} from './pages/restro'
import {Navbar} from './components/navbar'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/add-dish" element={<Dish/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
