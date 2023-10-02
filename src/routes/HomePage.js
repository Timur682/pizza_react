import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useCart } from '../contexts/CartContext'; // Импортируйте useCart из контекста корзины

const HomePage = () => {
    const { addToCart, cartState } = useCart(); // Используйте функцию addToCart из контекста корзины

    const [pizzas, setPizzas] = useState([]);
    const [error, setError] = useState(null);
   const token=localStorage.getItem("token")
    useEffect(() => {
        // Выполняем запрос при монтировании компонента
        axios.get('http://localhost:8081/api/pizzas', {
        })
            .then(response => {
                // Устанавливаем полученные данные в состояние
                setPizzas(response.data);
            })
            .catch(error => {
                setError('Error fetching data. Please log in to your account.');
                console.error('Error fetching data:', error);
            });
    }, ); 

    const handleAddToCart = (pizza) => {
        addToCart(pizza); // Используйте функцию addToCart для добавления пиццы в корзину

    };

    const saveCartToLocalStorage = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
      };
      
      useEffect(() => {
        saveCartToLocalStorage(cartState);

      }, [cartState])
    return (
        <div>
            <div className="jumbotron">
                <h1>Welcome to the Pizza delicious</h1>
                <p>This is a simple app for ordering pizza</p>
            </div>

            <Container>
                {error && <p className="text-danger">{error}</p>}
                <Row className="pizza-grid">
                    {pizzas.map((pizza) => (
                        <Col md={4} key={pizza.id}>
                            <Card>
                            <Card.Img variant="top" src={pizza.image} alt={pizza.name}
                            style={{ width: '225px', height: '200px' }} />
                                
                                <Card.Body>
                                    <Card.Title className=''>{pizza.name}</Card.Title>
                                    <Card.Text className=''>{pizza.description}</Card.Text>
                                    <Card.Text className='price'>{pizza.price}</Card.Text>
                                    <Button variant="primary" onClick={() => handleAddToCart(pizza)}>Order Now</Button>
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
