import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar glass">
      <div className="container nav-content">
        <Link to="/" className="luxury-logo">
          GLAM<span>STORE</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-item">Collections</Link>
          {user ? (
            <>
              <span className="nav-item user-greet">Hi, {user.name.split(' ')[0]}</span>
              <button onClick={logout} className="btn-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item">Login</Link>
              <Link to="/register" className="nav-item">Join</Link>
            </>
          )}
          <Link to="/cart" className="nav-item luxury-cart">
            Bag
            {cartCount > 0 && <span className="luxury-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
