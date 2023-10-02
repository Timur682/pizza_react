import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { createRoot } from 'react-dom/client';

import './bootstrap.scss';
import App from './App';
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import DarkModeContextWrapper from "./contexts/DarkModeContext";
import { CartContextProvider } from './contexts/CartContext'; 

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <AuthContextProvider>
                    <DarkModeContextWrapper>
                        <BrowserRouter>
                        <CartContextProvider>
                            <App />
                          </CartContextProvider>

                        </BrowserRouter>
                    </DarkModeContextWrapper>
                </AuthContextProvider>
            </QueryClientProvider>
    </React.StrictMode>,
);

reportWebVitals();
