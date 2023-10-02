import React, {useState, useEffect} from 'react';
import { useCart } from '../contexts/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartState, removeFromCart } = useCart();

  const [cartOrder, setCardOrder] = useState(cartState);

  useEffect(() => {
    // Получаем корзину из localStorage, если она там есть
    const cartFromLocalStorage = localStorage.getItem('cart');
    if (cartFromLocalStorage) {
      setCardOrder(JSON.parse(cartFromLocalStorage));
    }
  }, []);
  console.log('CARDORDER', cartOrder.items);

  console.log('AAA',cartState)
  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    console.log('ID', itemId);
    // Сохраняем обновленное состояние корзины в localStorage
  };

  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  

  const totalAmount = cartOrder.items.reduce(
    (total, item) => total + item.price,
    0
  );

  useEffect(() => {
    setCardOrder(cartState);

  }, [cartState])

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartOrder.items.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cartOrder.items.map((item) => (
              <li key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
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
        </div>
      )}
    </div>
  );
};

export default Cart;
