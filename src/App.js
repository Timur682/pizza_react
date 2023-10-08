import React, { useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './routes/Login';
import HomePage from './routes/HomePage';
import AboutPage from './routes/AboutPage';
import Footer from './components/header/Footer';
import Header from './components/header/Header';
import NotFound from './routes/NotFound';
import Register from './routes/Register';
import Card from './components/card/Card';
import AuthContext from './contexts/AuthContext';
import { CartContextProvider } from "./contexts/CartContext";
import Cart from "./components/Cart"; 
import Unauthorized from './routes/Unauthorized';
import AdminPage from './admin/AdminPage';

const App = () => {
    const { isLoggedIn } = useContext(AuthContext); 

    return (
        <>
            <CartContextProvider> 
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    {!isLoggedIn && <Route path="/login" element={<Login />} />}
                    {!isLoggedIn && <Route path="/register" element={<Register />} />}
                    <Route path="*" element={<NotFound />} />
                    <Route path="/card" element={<Card />} />
                    <Route path="/cart" element={<Cart />} /> 
                    <Route path="/unauthorized" element={<Unauthorized />} />
                    <Route path="/manage-pizzas" element={<AdminPage />} />

                </Routes>
                <Footer />
            </CartContextProvider>
        </>
    );
};

export default App;
