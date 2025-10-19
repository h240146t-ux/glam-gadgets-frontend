import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
      // Redirect or show success message
      alert('Registration successful!');
    } catch (error) {
      // Error is handled in AuthContext
      console.error('Registration error:', error);
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
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Create Account</h2>
      
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
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="register-name" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Full Name:
          </label>
          <input
            type="text"
            id="register-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            style={{
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #61dafb',
              borderRadius: '5px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white'
            }}
            placeholder="Enter your full name"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="register-email" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Email Address:
          </label>
          <input
            type="email"
            id="register-email"
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
            placeholder="Enter your email address"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="register-password" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Password:
          </label>
          <input
            type="password"
            id="register-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            style={{
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #61dafb',
              borderRadius: '5px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white'
            }}
            placeholder="Create a password"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="register-confirm-password" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Confirm Password:
          </label>
          <input
            type="password"
            id="register-confirm-password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
            style={{
              padding: '12px',
              fontSize: '16px',
              border: '1px solid #61dafb',
              borderRadius: '5px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white'
            }}
            placeholder="Confirm your password"
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
          {isLoading ? 'Creating Account...' : 'Register'}
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Already have an account? <a href="/login" style={{ color: '#61dafb' }}>Login here</a>
      </p>
    </div>
  );
};

export default Register;