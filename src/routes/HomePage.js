import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const { addToCart, cartState } = useCart();
  const [searchResults, setSearchResults] = useState([]); // Начальное значение - пустой массив
  const [pizzas, setPizzas] = useState([]);
  const [error, setError] = useState(null);
  const [pizzaClickCounts, setPizzaClickCounts] = useState({});


  useEffect(() => {
    axios
      .get('http://165.232.113.240/api/pizzas')
      .then((response) => {
        setPizzas(response.data);
      })
      .catch((error) => {
        setError('Error fetching data. Please log in to your account.');
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleAddToCart = (pizza) => {
    const pizzaId = pizza.id;
    addToCart(pizza);
    handlePizzaClick(pizzaId);
  };
  
   // Обработчик клика на пиццу
   const handlePizzaClick = (pizzaId) => {
    // Получаем текущее количество кликов на данной пицце
    const currentClickCount = pizzaClickCounts[pizzaId] || 0;
    // Увеличиваем количество кликов на 1 и обновляем объект
    setPizzaClickCounts({
      ...pizzaClickCounts,
      [pizzaId]: currentClickCount + 1,
    });
  };
  const handleSearch = (searchTerm) => {
    const searchTermLower = searchTerm.toLowerCase();

    // Фильтрация пицц по имени, описанию и цене
    const filteredPizzaList = pizzas.filter((pizza) => {
      const nameMatch = pizza.name.toLowerCase().includes(searchTermLower);
      const descriptionMatch = pizza.description.toLowerCase().includes(searchTermLower);
      const priceMatch = pizza.price.toString().includes(searchTermLower);
      
      return nameMatch || descriptionMatch || priceMatch;
    });

    setSearchResults(filteredPizzaList); // Устанавливаем результаты поиска в состояние
  };

  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  useEffect(() => {
    saveCartToLocalStorage(cartState);
  }, [cartState]);

  return (
    <div>
      <div className="jumbotron">
        <h1>Welcome to the Pizza delicious</h1>
        <p>This is a simple app for ordering pizza</p>
        <SearchBar onSearch={handleSearch} />
      </div>

      <Container>
        {error && <p className="text-danger">{error}</p>}
        <Row className="pizza-grid">
          {(searchResults.length > 0 ? searchResults : pizzas).map((pizza) => (
            // Если есть результаты поиска, отображаем отфильтрованные пиццы, иначе все пиццы
            <Col md={4} key={pizza.id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={pizza.image}
                  alt={pizza.name}
                  style={{ width: '225px', height: '200px' }}
                />

                <Card.Body>
                  <Card.Title className="">{pizza.name}</Card.Title>
                  <Card.Text className="">{pizza.description}</Card.Text>
                  <Card.Text className="price">{pizza.price}</Card.Text>
                  <Button variant="primary" onClick={() => handleAddToCart(pizza)}>
                   Order Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
