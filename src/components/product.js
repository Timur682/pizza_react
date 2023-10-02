import React from 'react';
import { useCart } from '../contexts/CartContext'; // Импортируйте useCart для доступа к контексту корзины

const Product = ({ product }) => {
  const { addToCart } = useCart(); // Используйте хук useCart для доступа к функции addToCart

  const handleAddToCart = () => {
    addToCart(product); // Вызовите функцию addToCart для добавления продукта в корзину
  };

  return (
    <div className="product">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
