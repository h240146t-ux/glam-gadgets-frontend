import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors when user starts typing
    if (error) clearError();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    clearError();

    try {
      await login(formData.email, formData.password);
      // Login successful - redirect happens in AuthContext
      console.log('Login successful!');
    } catch (error) {
      // Error is handled in AuthContext
      console.error('Login error:', error);
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '40px auto', 
      padding: '30px',
      border: '1px solid #444',
      borderRadius: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Login</h2>
      
      {error && (
        <div style={{ 
          color: 'red', 
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="login-email" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Email:
          </label>
          <input
            type="email"
            id="login-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            style={{
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #61dafb',
              borderRadius: '5px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white'
            }}
            placeholder="Enter your email"
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="login-password" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Password:
          </label>
          <input
            type="password"
            id="login-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            style={{
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #61dafb',
              borderRadius: '5px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white'
            }}
            placeholder="Enter your password"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            padding: '12px',
            fontSize: '16px',
            backgroundColor: isLoading ? '#666' : '#61dafb',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            marginTop: '10px'
          }}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Don't have an account? <a href="/register" style={{ color: '#61dafb' }}>Register here</a>
      </p>
    </div>
  );
};

export default Login;