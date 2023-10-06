import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';
import SearchBar from '../components/SearchBar';
import { SimpleDropdown } from 'react-js-dropdavn';
import 'react-js-dropdavn/dist/index.css';

const HomePage = () => {
  const { addToCart, cartState } = useCart();
  const [searchResults, setSearchResults] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState('');
  const [displayedPizzas, setDisplayedPizzas] = useState([]);

  const data = [
    {label: 'Price Descending', value: 'priceDesc'},
    {label: 'Price Ascending', value: 'priceAsc'},
    {label: 'Name Descending', value: 'nameDesc'},
    {label: 'Name Ascending', value: 'nameAsc'},
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
      .get('http://165.232.113.240/api/pizzas')
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
  }, [sortType, pizzas]);

  const handleAddToCart = (pizza) => {
    addToCart(pizza);
  };

  const handleSearch = (searchTerm) => {
    const searchTermLower = searchTerm.toLowerCase();

    const filteredPizzaList = pizzas.filter((pizza) => {
      const nameMatch = pizza.name.toLowerCase().includes(searchTermLower);
      const descriptionMatch = pizza.description.toLowerCase().includes(searchTermLower);
      const priceMatch = pizza.price.toString().includes(searchTermLower);

      return nameMatch || descriptionMatch || priceMatch;
    });

    setSearchResults(filteredPizzaList);
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
  <div style={{ position: 'absolute', top: 200, right: 0 }}>
    <SimpleDropdown
      options={data}
      clearable
      searchable
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
