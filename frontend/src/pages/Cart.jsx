import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container py-8 text-center">
        <h1 className="boutique-title">Shopping Bag is Empty</h1>
        <Link to="/" className="btn btn-primary mt-4">Discover Pieces</Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="boutique-title">Your Bag</h1>
      <div className="cart-layout">
        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item.id} className="luxury-cart-item">
              <img src={item.image} alt={item.title} className="cart-img" />
              <div className="cart-info">
                <Link to={`/product/${item.id}`}>
                  <h3 className="cart-title">{item.title}</h3>
                </Link>
                <p className="cart-price">₹{item.price}</p>
              </div>
              <div className="cart-controls">
                <div className="luxury-qty">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button className="luxury-rmv" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="luxury-summary">
          <h3>Summary</h3>
          <div className="l-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="l-row">
            <span>Privilege Shipping</span>
            <span>Complimentary</span>
          </div>
          <div className="l-total">
            <span>Total</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn btn-primary w-full mt-4">
            Begin Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
