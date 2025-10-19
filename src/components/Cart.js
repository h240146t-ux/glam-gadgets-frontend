import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!currentUser) {
      alert('Please login to checkout');
      navigate('/login');
      return;
    }
    
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    alert('Checkout functionality would be implemented here!');
    // In a real app, you would redirect to checkout page
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Your Shopping Cart</h2>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>Your cart is empty</p>
        <button
          onClick={() => navigate('/products')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#61dafb',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Your Shopping Cart</h2>
        <button
          onClick={clearCart}
          style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: '#ff6b6b',
            border: '1px solid #ff6b6b',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Clear Cart
        </button>
      </div>

      {/* Cart Items */}
      <div style={{ marginBottom: '30px' }}>
        {cartItems.map(item => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #444',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '15px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              gap: '20px'
            }}
          >
            {/* Product Image */}
            <div style={{ 
              width: '80px', 
              height: '80px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              overflow: 'hidden',
              flexShrink: 0
            }}>
              <img 
                src={item.image} 
                alt={item.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const placeholder = document.createElement('div');
                  placeholder.style.cssText = `
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    font-size: 12px;
                    text-align: center;
                  `;
                  placeholder.textContent = '📱';
                  e.target.parentNode.appendChild(placeholder);
                }}
              />
            </div>

            {/* Product Details */}
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{item.name}</h4>
              <p style={{ margin: '0 0 15px 0', color: '#61dafb', fontWeight: 'bold', fontSize: '16px' }}>
                ${item.price}
              </p>
              
              {/* Quantity Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Quantity:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}
                  >
                    -
                  </button>
                  <span style={{ 
                    padding: '0 15px', 
                    fontWeight: 'bold',
                    fontSize: '16px',
                    minWidth: '40px',
                    textAlign: 'center'
                  }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Item Total and Remove */}
            <div style={{ textAlign: 'right', minWidth: '120px' }}>
              <p style={{ 
                fontWeight: 'bold', 
                margin: '0 0 15px 0',
                fontSize: '16px',
                color: '#61dafb'
              }}>
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: '#ff6b6b',
                  border: '1px solid #ff6b6b',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div style={{
        border: '1px solid #61dafb',
        borderRadius: '8px',
        padding: '25px',
        backgroundColor: 'rgba(97, 218, 251, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '16px' }}>
          <span>Subtotal:</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '16px' }}>
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #61dafb', margin: '15px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', fontSize: '18px', fontWeight: 'bold' }}>
          <span>Total:</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
        
        <button
          onClick={handleCheckout}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#61dafb',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#4fa8c5';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#61dafb';
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;