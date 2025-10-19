import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import products from '../data/products';

function Home() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const featuredProducts = products.slice(0, 3); // Show first 3 products as featured

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
      <h2>Home Page</h2>
      <p>Welcome to Glam Gadgets - Your premium tech destination!</p>

      {/* Featured Products */}
      <div style={{ marginTop: '40px' }}>
        <h3>Featured Products</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '25px',
          marginTop: '20px'
        }}>
          {featuredProducts.map(product => (
            <div 
              key={product.id}
              style={{
                border: '1px solid #444',
                borderRadius: '10px',
                padding: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                textAlign: 'center',
                transition: 'transform 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Image Section */}
              <div style={{ 
                height: '180px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '15px',
                overflow: 'hidden',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    // Fallback if image fails to load
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
                      font-size: 16px;
                      font-weight: bold;
                    `;
                    placeholder.textContent = product.name;
                    e.target.parentNode.appendChild(placeholder);
                  }}
                />
              </div>
              
              <h4 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{product.name}</h4>
              <p style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                color: '#61dafb',
                margin: '0 0 15px 0'
              }}>
                ${product.price}
              </p>
              
              <p style={{ 
                fontSize: '14px', 
                color: '#ccc',
                margin: '0 0 15px 0',
                minHeight: '40px'
              }}>
                {product.description}
              </p>
              
              <button
                onClick={() => handleAddToCart(product)}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#61dafb',
                  color: 'black',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginBottom: '10px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#4fa8c5';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#61dafb';
                }}
              >
                Add to Cart
              </button>
              <button
                onClick={() => navigate('/products')}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'transparent',
                  color: '#61dafb',
                  border: '1px solid #61dafb',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(97, 218, 251, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '40px',
        padding: '40px',
        backgroundColor: 'rgba(97, 218, 251, 0.1)',
        borderRadius: '10px'
      }}>
        <h3>Ready to Explore More?</h3>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>
          Discover our full range of premium gadgets and accessories.
        </p>
        <button
          onClick={() => navigate('/products')}
          style={{
            padding: '15px 30px',
            backgroundColor: '#61dafb',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            fontSize: '18px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#4fa8c5';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#61dafb';
          }}
        >
          View All Products
        </button>
      </div>
    </div>
  );
}

export default Home;