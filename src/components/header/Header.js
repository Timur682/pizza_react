import React, { useContext, useState, useEffect } from 'react';
import { FcHome } from 'react-icons/fc';
import AuthContext from '../../contexts/AuthContext';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import './Header.css';
import SearchBar from '../SearchBar';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const nav = useNavigate();
  const [isNavExpanded, setNavExpanded] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  const darkModeContext = useContext(DarkModeContext);
  const { cartItems } = useCart();

  useEffect(() => {
    if (cartItems) {
      // Проверяем, что cartItems существуют перед использованием свойства length
      setCartItemCount(cartItems.length);
    }
  }, [cartItems]);

  const handleLogout = () => {
    logout();
    authService.logout();
    nav('/');
  };

  const closeNav = () => setNavExpanded(false);

  return (
    <>
      <Navbar
        expanded={isNavExpanded}
        onToggle={setNavExpanded}
        bg="light"
        expand="lg"
        className="navbar-custom"
      >
        <Container fluid>
          <NavLink to="/" className="navbar-brand">
            <span>Pizza delicious</span>
            <FcHome />
          </NavLink>

          <Navbar.Collapse>
            <Nav className="ms-auto" onClick={closeNav}>
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              {!isLoggedIn && (
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              )}
              {!isLoggedIn && (
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              )}
              {isLoggedIn && (
                <NavLink className="nav-link" to="/cart">
                  <button className="nav-link" id="cart" to="/cart">
                    <img className="cart__image" src="./image/cart.png" alt="Cart" />
                    <div className="cart__num" id="cart_num">
                      {cartItemCount}
                    </div>
                  </button>
                </NavLink>
              )}
              {isLoggedIn && (
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
