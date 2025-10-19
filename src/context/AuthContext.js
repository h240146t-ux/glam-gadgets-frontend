import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Backend API URL - FIXED
  const API_URL = 'http://localhost:5000/api';

  // Check for stored user on app start
  useEffect(() => {
    const checkLoggedIn = async () => {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          setCurrentUser(JSON.parse(user));
        } catch (error) {
          console.error('Auto-login failed:', error);
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Register function with debug logging
  const register = async (name, email, password) => {
    setIsLoading(true);
    setError('');
    try {
      console.log('🚀 Starting registration request...');
      console.log('📝 Data:', { name, email, password: '***' });
      
      // FIXED: Use absolute URL with correct port
      const API_URL = 'http://localhost:5000/api';
      console.log('🔗 URL:', `${API_URL}/users/register`);
      
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      console.log('📨 Response status:', response.status);
      console.log('📨 Response ok:', response.ok);
      
      const data = await response.json();
      console.log('📦 Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      const user = {
        _id: data._id,
        name: data.name,
        email: data.email
      };
      
      console.log('✅ Registration successful:', user);
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.log('❌ Registration error:', error);
      console.log('❌ Error message:', error.message);
      
      let errorMessage = 'Failed to create account. Please try again.';
      
      if (error.message.includes('Network') || error.message.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to server. Please check if backend is running.';
      } else if (error.message.includes('User already exists')) {
        errorMessage = 'An account with this email already exists.';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function - FIXED URL
  const login = async (email, password) => {
    setIsLoading(true);
    setError('');
    try {
      // FIXED: Use absolute URL with correct port
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const user = {
        _id: data._id,
        name: data.name,
        email: data.email
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return user;
    } catch (error) {
      let errorMessage = 'Failed to login. Please check your credentials.';
      
      if (error.message.includes('Network') || error.message.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to server. Please check if backend is running.';
      } else if (error.message.includes('Invalid email or password')) {
        errorMessage = 'Invalid email or password. Please try again.';
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    setError('');
  };

  // Update user details
  const updateUserDetails = async (userData) => {
    try {
      const updatedUser = { ...currentUser, ...userData };
      setCurrentUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Clear error
  const clearError = () => setError('');

  const value = {
    currentUser,
    isLoading,
    error,
    register,
    login,
    logout,
    updateUserDetails,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;