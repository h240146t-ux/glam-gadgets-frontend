import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import localProducts from '../data/products';

function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      // For now, always use local data to avoid placeholder URLs
      setProducts(localProducts);
      
    } catch (error) {
      console.error('Error loading products:', error);
      // Fallback to local data
      setProducts(localProducts);
      setError('Using demo product data');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Filter products by category AND search term
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Our Products</h2>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h2>Our Products</h2>
      
      {error && (
        <div style={{ 
          color: 'orange', 
          backgroundColor: 'rgba(255, 165, 0, 0.1)',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      
      {/* Search Bar and Category Filter */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Search Bar */}
        <div style={{ position: 'relative' }}>
          <label htmlFor="product-search" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '16px' }}>
            Search Products:
          </label>
          <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
            <input
              id="product-search"
              type="text"
              placeholder="Search by product name or description..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                width: '100%',
                padding: '12px 45px 12px 15px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '2px solid #61dafb',
                backgroundColor: '#1a1a1a',
                color: 'white',
                outline: 'none'
              }}
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#61dafb',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '0',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category-filter" style={{ marginRight: '10px', fontWeight: 'bold', fontSize: '16px' }}>
            Filter by Category:
          </label>
          <select 
            id="category-filter"
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ 
              padding: '10px 15px', 
              fontSize: '16px',
              borderRadius: '8px',
              border: '2px solid #61dafb',
              backgroundColor: '#1a1a1a',
              color: 'white',
              cursor: 'pointer',
              minWidth: '200px'
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Results Info */}
      {(searchTerm || selectedCategory !== 'all') && (
        <div style={{ 
          marginBottom: '20px',
          padding: '10px 15px',
          backgroundColor: 'rgba(97, 218, 251, 0.1)',
          borderRadius: '8px',
          border: '1px solid #61dafb'
        }}>
          <p style={{ margin: 0, color: '#61dafb', fontSize: '14px' }}>
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {searchTerm && ` matching "${searchTerm}"`}
            {searchTerm && selectedCategory !== 'all' && ' and '}
            {selectedCategory !== 'all' && ` in ${selectedCategory} category`}
          </p>
        </div>
      )}

      {/* Products Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '25px',
        padding: '10px 0'
      }}>
        {filteredProducts.map(product => (
          <div 
            key={product.id}
            style={{
              border: '1px solid #444',
              borderRadius: '12px',
              padding: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              height: 'fit-content'
            }}
          >
            {/* Product Image */}
            <div style={{ 
              height: '220px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '20px',
              backgroundColor: '#2a2a2a',
              borderRadius: '10px',
              overflow: 'hidden'
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
                  console.log('Image failed to load:', product.image);
                  e.target.style.display = 'none';
                }}
              />
            </div>

            {/* Product Info */}
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: '600' }}>
              {product.name}
            </h3>
            
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#61dafb', margin: '0 0 15px 0' }}>
              ${product.price}
            </p>
            
            <p style={{ margin: '0 0 20px 0', color: '#ccc', fontSize: '15px', lineHeight: '1.4', minHeight: '60px' }}>
              {product.description}
            </p>

            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(product)}
              disabled={!product.inStock}
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: product.inStock ? '#61dafb' : '#666',
                color: product.inStock ? 'black' : '#999',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: product.inStock ? 'pointer' : 'not-allowed',
                fontWeight: 'bold',
                marginTop: 'auto'
              }}
            >
              {product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && !loading && (
        <div style={{ textAlign: 'center', fontSize: '18px', padding: '60px 20px', color: '#888' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
          <p>
            {searchTerm || selectedCategory !== 'all' 
              ? 'No products found matching your criteria.' 
              : 'No products available.'}
          </p>
          {(searchTerm || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              style={{
                marginTop: '15px',
                padding: '10px 20px',
                backgroundColor: '#61dafb',
                color: 'black',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Products;