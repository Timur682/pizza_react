import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
    items: [],

};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        case 'REMOVE_FROM_CART':
            // Фильтруем элементы корзины, исключая тот, который нужно удалить
            const updatedItems = state.items.filter(
                (item) => item.id !== action.payload
            );
            console.log('UPDATE', updatedItems);
            return {
                ...state,
                items: updatedItems,
            };
        default:
            return state;
    }
};

const CartContextProvider = ({ children }) => {
    const [cartState, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
    };

    const removeFromCart = (itemId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    };

    return (
        <CartContext.Provider value={{ cartState, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartContextProvider');
    }
    return context;
};

export { CartContextProvider, useCart };
