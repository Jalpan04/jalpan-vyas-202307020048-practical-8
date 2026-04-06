import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../api/products';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading">Unveiling Details...</div>;
  if (!product) return <div className="container py-8">Selected piece not found.</div>;

  return (
    <div className="container py-8 fade-in">
      <Link to="/" className="luxury-back">← Return to Collections</Link>
      <div className="luxury-detail-grid">
        <div className="luxury-detail-img">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="luxury-detail-info">
          <span className="l-category">{product.category}</span>
          <h1 className="l-title">{product.title}</h1>
          <div className="l-price">₹{product.price}</div>
          <div className="l-divider"></div>
          <p className="l-description">{product.description}</p>
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => addToCart(product)}
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
