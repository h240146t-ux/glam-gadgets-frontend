import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navigation() {
  const { currentUser, logout } = useAuth();
  const { getCartItemsCount } = useCart();

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{ marginBottom: '30px' }}>
      <h1>Glam Gadgets</h1>
      
      {/* Welcome message for logged in users */}
      {currentUser && (
        <div style={{ 
          marginBottom: '15px', 
          padding: '10px', 
          backgroundColor: 'rgba(97, 218, 251, 0.2)',
          borderRadius: '5px'
        }}>
          Welcome back, <strong>{currentUser.name}</strong>! 👋
        </div>
      )}

      {/* Navigation Links */}
      <nav>
        <Link to="/" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>
          Home
        </Link>
        <Link to="/products" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>
          Products
        </Link>
        <Link to="/about" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>
          About
        </Link>
        <Link to="/cart" style={{ color: 'white', margin: '0 15px', textDecoration: 'none', position: 'relative' }}>
          Cart
          {getCartItemsCount() > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: '#ff6b6b',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '12px',
              minWidth: '18px',
              textAlign: 'center'
            }}>
              {getCartItemsCount()}
            </span>
          )}
        </Link>
        
        {/* Conditional navigation based on auth status */}
        {currentUser ? (
          <>
            <Link to="/profile" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>
              Profile
            </Link>
            <button 
              onClick={handleLogout}
              style={{
                color: 'white',
                margin: '0 15px',
                textDecoration: 'none',
                background: 'none',
                border: '1px solid white',
                padding: '5px 15px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>
              Login
            </Link>
            <Link to="/register" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>
              Register
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navigation;