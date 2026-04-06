import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Checkout.css'; // Using the same form styles

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="container py-8">
      <h1 className="boutique-title">Client Login</h1>
      <div className="checkout-view" style={{ justifyContent: 'center' }}>
        <form className="luxury-form" onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h3>Access Your Account</h3>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <div className="f-field">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="f-field">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4">
            Sign In
          </button>
          <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            New to the boutique? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
