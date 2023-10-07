import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';
import SearchBar from '../components/SearchBar';
import { SimpleDropdown } from 'react-js-dropdavn';
import 'react-js-dropdavn/dist/index.css';
import './styles.scss'; 

const HomePage = () => {
  const { addToCart, cartState } = useCart();
  const [pizzas, setPizzas] = useState([]);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState('');
  const [displayedPizzas, setDisplayedPizzas] = useState([]);

  const data = [
    {label: 'A-Z', value: 'nameAsc'},
    {label: 'Z-A', value: 'nameDesc'},
    {label: 'Lowest to Highest', value: 'priceAsc'},
    {label: 'Highest to Lowest', value: 'priceDesc'},
  ];  

  const sortPizzas = (pizzas) => {
    const sortedPizzas = [...pizzas];
    switch (sortType) {
      case 'priceDesc':
        return sortedPizzas.sort((a, b) => b.price - a.price);
      case 'priceAsc':
        return sortedPizzas.sort((a, b) => a.price - b.price);
      case 'nameDesc':
        return sortedPizzas.sort((a, b) => b.name.localeCompare(a.name));
      case 'nameAsc':
        return sortedPizzas.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sortedPizzas;
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost/api/pizzas')
      .then((response) => {
        setPizzas(response.data);
      })
      .catch((error) => {
        setError('Error fetching data. Please log in to your account.');
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    setDisplayedPizzas(sortPizzas(pizzas));
  }, [sortType, pizzas, sortPizzas]);

  const handleAddToCart = (pizza) => {
    addToCart(pizza);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      // Если строка поиска пуста, показываем все пиццы
      setDisplayedPizzas(pizzas);
      return;
    }
  
    const searchTermLower = searchTerm.toLowerCase();
  
    const filteredPizzaList = pizzas.filter((pizza) => {
      const nameMatch = pizza.name.toLowerCase().includes(searchTermLower);
      const descriptionMatch = pizza.description.toLowerCase().includes(searchTermLower);
      const priceMatch = pizza.price.toString().includes(searchTermLower);
  
      return nameMatch || descriptionMatch || priceMatch;
    });
  
    setDisplayedPizzas(filteredPizzaList);
  };
  

  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  useEffect(() => {
    saveCartToLocalStorage(cartState);
  }, [cartState]);

  const handleSort = (value) => {
    setSortType(value);
  };

  return (
    <div>
      <div className="jumbotron">
        <h1>Welcome to the Pizza delicious</h1>
        <p>This is a simple app for ordering pizza</p>
        <SearchBar onSearch={handleSearch} />
        <div className='dropdown'>
          <SimpleDropdown
            options={data}
            clearable
            configs={{ position: { y: 'top', x: 'center' } }}
            onChange={(selectedItem) => handleSort(selectedItem.value)}
          />
        </div>
      </div>

      <Container>
        {error && <p className="text-danger">{error}</p>}
        <Row className="pizza-grid">
          {displayedPizzas.map((pizza) => (
            <Col md={4} key={pizza.id}>
              <Card>
                <Card.Img
                   className='image'
                  variant="top"
                  src={pizza.image}
                  alt={pizza.name}
                />

                <Card.Body>
                  <Card.Title>{pizza.name}</Card.Title>
                  <Card.Text>{pizza.description}</Card.Text>
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
