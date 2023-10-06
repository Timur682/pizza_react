import React, {useState, useEffect, useContext} from 'react';
import { useCart } from '../contexts/CartContext';
import './Cart.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import AuthContext from "../contexts/AuthContext";
import swal from 'sweetalert';


const Cart = () => {
  const { cartState, removeFromCart } = useCart();
  const { username } = useContext(AuthContext);

  const [cartOrder, setCardOrder] = useState(cartState);

  useEffect(() => {
    // Получаем корзину из localStorage, если она там есть
    const cartFromLocalStorage = localStorage.getItem('cart');
    if (cartFromLocalStorage) {
      setCardOrder(JSON.parse(cartFromLocalStorage));
    }
  }, []);

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    const updatedCart = { ...cartOrder, items: cartOrder.items.filter(item => item.id !== itemId) };
    setCardOrder(updatedCart);
    // Сохраняем обновленное состояние корзины в localStorage
    saveCartToLocalStorage(updatedCart);
  };
  

  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };
    
  const totalAmount = cartOrder.items.reduce((total, item) => total + item.price, 0);
 console.log('dqdwqdqw', cartState);
 const handleCheckout = async () => {
  try {
    // Получаем массив имен пицц
    const pizzaNames = cartOrder.items.map(item => ({pizzaName: item.name}));

    // Создаем объект с данными заказа
    const orderData = {
      name: JSON.stringify(pizzaNames), // Преобразуем массив имен в строку формата JSON
      customerName: username, // Замените это на актуальное имя пользователя
      totalAmount: totalAmount,
    };

    // Отправляем данные корзины на сервер
    await axios.post('http://165.232.113.240/api/orders', orderData);
    swal("Order placed successfully!", "Your order has been placed.", "success");
    // Очищаем корзину после успешной оплаты
    setCardOrder({ items: [] });
    saveCartToLocalStorage({ items: [] });
  } catch (error) {
    console.error('Error placing order:', error);
    swal("Error", "Error placing order. Please try again later.", "error");
  }
};


  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartOrder.items.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cartOrder.items.map((item) => (
                 <li key={uuidv4()} className="cart-item">   
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">${item.price}</p>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="cart-total">Total: ${totalAmount.toFixed(2)}</p>
          <button className="cart-checkout" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
