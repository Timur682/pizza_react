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
import Cart from "./components/Cart"; // Правильный путь к компоненту Cart

const App = () => {
    const { isLoggedIn } = useContext(AuthContext); // Получаем значение isLoggedIn из контекста

    return (
        <>
            <CartContextProvider> {/* Оберните ваше приложение в CartContextProvider */}
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    {!isLoggedIn && <Route path="/login" element={<Login />} />}
                    {!isLoggedIn && <Route path="/register" element={<Register />} />}
                    <Route path="*" element={<NotFound />} />
                    <Route path="/card" element={<Card />} />
                    <Route path="/cart" element={<Cart />} /> {/* Используйте Cart компонент */}
                    {/* Добавьте другие маршруты для других страниц */}
                </Routes>
                <Footer />
            </CartContextProvider>
        </>
    );
};

export default App;
