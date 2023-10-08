import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [pizzaData, setPizzaData] = useState({
    name: '',
    image: '',
    price: '',
    description: ''
  });
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  

  useEffect(() => {
    axios.get('http://localhost/api/pizzas')
    
      .then(response => {
        setPizzas(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  useEffect(() => {
    // Принудительно перерисовывает компонент после изменения pizzas
  }, [pizzas]);

  const handleChange = (e) => {
    setPizzaData({
      ...pizzaData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (selectedPizza) {
      axios.put(`http://localhost/api/pizzas/${selectedPizza.id}`, pizzaData)
        .then(response => {
          setPizzas(pizzas.map(pizza => (pizza.id === selectedPizza.id ? response.data : pizza)));
          resetForm();
        })
        .catch(error => {
          console.error('Error updating pizza: ', error);
        });
    } else {
      axios.post('http://localhost/api/pizzas', pizzaData , config)
        .then(response => {
          setPizzas([...pizzas, response.data]);
          resetForm();
        })
        .catch(error => {
          console.error('Error creating pizza: ', error);
        });
    }
  };

  const handleEdit = (pizza) => {
    setSelectedPizza(pizza);
    setPizzaData({
      name: pizza.name,
      image: pizza.image,
      price: pizza.price,
      description: pizza.description
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost/api/pizzas/${id}`)
      .then(() => {
        setPizzas(pizzas.filter(pizza => pizza.id !== id));
      })
      .catch(error => {
        console.error('Error deleting pizza: ', error);
      });
  };

  const resetForm = () => {
    setSelectedPizza(null);
    setPizzaData({
      name: '',
      image: '',
      price: '',
      description: ''
    });
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <input
          type="text"
          name="name"
          value={pizzaData.name}
          onChange={handleChange}
          placeholder="Pizza name"
        />
        <input
          type="text"
          name="image"
          value={pizzaData.image}
          onChange={handleChange}
          placeholder="Pizza image URL"
        />
        <input
          type="number"
          name="price"
          value={pizzaData.price}
          onChange={handleChange}
          placeholder="Pizza price"
        />
        <textarea
          name="description"
          value={pizzaData.description}
          onChange={handleChange}
          placeholder="Pizza description"
        />
        <button onClick={handleSubmit}>
          {selectedPizza ? 'Update Pizza' : 'Create Pizza'}
        </button>
      </div>
      <div>
        <h2>Pizzas</h2>
        <ul>
          {pizzas.map(pizza => (
            <li key={pizza.id}>
              {pizza.name} - ${pizza.price}
              <button onClick={() => handleEdit(pizza)}>Edit</button>
              <button onClick={() => handleDelete(pizza.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
