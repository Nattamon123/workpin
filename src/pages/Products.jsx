import React, { useState, useEffect } from 'react';
import '../App.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(data => {
        const productsWithPrices = data.slice(0, 12).map(photo => ({
          ...photo,
          price: (Math.random() * (100 - 10) + 10).toFixed(2) 
        }));
        setProducts(productsWithPrices);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...existingCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Product added to cart!');
  };

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="products-container">
      <h2>Our Products</h2>
      {loading ? (
        <div className="loading">Loading products...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="image-container" onClick={() => setSelectedImage(product.thumbnailUrl)}>
                <img src={product.thumbnailUrl} alt={product.title} />
                <div className="image-overlay">Click to view image</div>
              </div>
              <h3>{product.title.substring(0, 20)}...</h3>
              <p>${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
      
      {selectedImage && (
        <div className="modal-backdrop" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <img src={selectedImage} alt="Full size" />
            <button className="close-button" onClick={() => setSelectedImage(null)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;