import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Main} from './pages/main';
import {Login} from './pages/login';
import {Register} from './pages/register';
import {About} from './pages/about';
import {Dish} from './pages/restro'
import {Navbar} from './components/navbar'
import {auth,db} from './config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth'

function App() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/about" element={<About/>} />
          {user ? (
                <Route path="/add-dish" element={<Dish/>} />
            ) :  <Route path="/" element={<Main/>} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
