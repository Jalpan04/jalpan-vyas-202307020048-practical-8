import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Checkout.css'; // Using the same form styles

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="container py-8">
      <h1 className="boutique-title">New Membership</h1>
      <div className="checkout-view" style={{ justifyContent: 'center' }}>
        <form className="luxury-form" onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h3>Join Our Exclusive Boutique</h3>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <div className="f-field">
            <label>Full Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="f-field">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="f-row">
            <div className="f-field">
              <label>Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="f-field">
              <label>Confirm</label>
              <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4">
            Register Account
          </button>
          <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            Already a member? <Link to="/login">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
