import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { currentUser, updateUserDetails, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (currentUser) {
      setProfileData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || ''
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      await updateUserDetails(profileData);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setMessage('Error updating profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      address: currentUser?.address || ''
    });
    setIsEditing(false);
    setMessage('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
      <h2>My Profile</h2>
      
      {message && (
        <div style={{ 
          color: message.includes('Error') ? 'red' : 'green',
          backgroundColor: message.includes('Error') ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}
      
      {/* Profile Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: 'rgba(97, 218, 251, 0.1)',
        borderRadius: '10px'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#61dafb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#282c34',
          marginRight: '20px'
        }}>
          {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div>
          <h3 style={{ margin: '0 0 5px 0' }}>{currentUser?.name}</h3>
          <p style={{ margin: 0, color: '#ccc' }}>{currentUser?.email}</p>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
            Member since {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            disabled={!isEditing || loading}
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              backgroundColor: isEditing ? 'white' : '#f0f0f0',
              color: isEditing ? 'black' : '#666',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            disabled={!isEditing || loading}
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              backgroundColor: isEditing ? 'white' : '#f0f0f0',
              color: isEditing ? 'black' : '#666',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={profileData.phone}
            onChange={handleChange}
            placeholder="Add your phone number"
            disabled={!isEditing || loading}
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              backgroundColor: isEditing ? 'white' : '#f0f0f0',
              color: isEditing ? 'black' : '#666',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Shipping Address
          </label>
          <textarea
            name="address"
            value={profileData.address}
            onChange={handleChange}
            placeholder="Enter your shipping address"
            disabled={!isEditing || loading}
            rows="3"
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              backgroundColor: isEditing ? 'white' : '#f0f0f0',
              color: isEditing ? 'black' : '#666',
              border: '1px solid #ccc',
              borderRadius: '5px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              disabled={loading}
              style={{
                padding: '10px 20px',
                backgroundColor: '#61dafb',
                color: 'black',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '10px 20px',
                  backgroundColor: loading ? '#ccc' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '16px'
                }}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                style={{
                  padding: '10px 20px',
                  backgroundColor: loading ? '#ccc' : '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '16px'
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>

      {/* Order History Section */}
      <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #444' }}>
        <h3>Recent Orders</h3>
        <div style={{ 
          padding: '20px', 
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          <p>No orders yet</p>
          <button
            onClick={() => window.location.href = '/products'}
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: '#61dafb',
              border: '1px solid #61dafb',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Start Shopping
          </button>
        </div>
      </div>

      {/* Account Actions */}
      <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #444' }}>
        <h3>Account Actions</h3>
        <button
          onClick={logout}
          style={{
            padding: '10px 20px',
            backgroundColor: 'transparent',
            color: '#ff6b6b',
            border: '1px solid #ff6b6b',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;