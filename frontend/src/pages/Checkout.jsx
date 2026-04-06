import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isFinalized, setIsFinalized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const processOrder = async (e) => {
    e.preventDefault();

    setIsProcessing(true);
    setError('');

    try {
      if (user) {
        // Attempt real payment if logged in
        await axios.post('http://localhost:5000/api/payment/checkout', {
          amount: cartTotal,
          paymentMethod: 'card',
          cardNumber: '4111 1111 1111 1111'
        });
      } else {
        // Mock a processing delay for non-logged in users (for demo purposes)
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setIsFinalized(true);
      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 5000);
    } catch (err) {
      // Forcing success anyway so the demo works smoothly as requested
      setIsFinalized(true);
      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 5000);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isFinalized) {
    return (
      <div className="container py-8 text-center">
        <div className="luxury-confirm fade-in">
          <svg className="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="check-circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="check-path" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
          <h1>Purchase Successful</h1>
          <p>Your luxurious selection will be dispatched shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="boutique-title">Finalize Order</h1>
      <div className="checkout-view">
        <form className="luxury-form" onSubmit={processOrder}>
          <h3>Delivery Particulars</h3>
          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
          <div className="f-field">
            <label>Name</label>
            <input type="text" required defaultValue={user?.name} />
          </div>
          <div className="f-field">
            <label>Email</label>
            <input type="email" required defaultValue={user?.email} />
          </div>
          <div className="f-field">
            <label>Residence</label>
            <input type="text" required />
          </div>
          <div className="f-row">
            <div className="f-field">
              <label>City</label>
              <input type="text" required />
            </div>
            <div className="f-field">
              <label>Postal</label>
              <input type="text" required />
            </div>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary w-full mt-4"
            disabled={isProcessing}
          >
            {isProcessing ? 'Securing Transaction...' : 'Complete Secure Purchase'}
          </button>
        </form>
        <div className="luxury-order-mini">
          <h3>Your Selection</h3>
          <div className="mini-list">
            {cartItems.map(item => (
              <div key={item.id} className="mini-item">
                <span>{item.title}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mini-total">
            <span>Estate Total</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
