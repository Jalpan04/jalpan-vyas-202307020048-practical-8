import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/products';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="loading">Initializing boutique...</div>;

  return (
    <div className="container py-8">
      <h1 className="boutique-title">Selected Pieces</h1>
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="luxury-card">
            <Link to={`/product/${product.id}`} className="luxury-img-container">
              <img src={product.image} alt={product.title} />
            </Link>
            <div className="luxury-content">
              <span className="luxury-cat">{product.category}</span>
              <Link to={`/product/${product.id}`}>
                <h3 className="luxury-title">{product.title}</h3>
              </Link>
              <div className="luxury-footer">
                <span className="luxury-price">₹{product.price}</span>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => addToCart(product)}
                >
                  Acquire
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
