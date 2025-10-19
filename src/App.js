import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import './App.css';
import Home from './components/Home';
import Products from './components/Products';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Cart from './components/Cart';  // Fixed: 'Cart' not 'Cant'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <header className="App-header">
              <Navigation />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />  {/* Fixed: 'Cart' not 'Cant' */}
                
                {/* Protected Routes */}
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Fallback route for undefined paths */}
                <Route path="*" element={<Home />} />
              </Routes>
            </header>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;