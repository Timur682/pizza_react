import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container mt-5">
      <h1 className="text-center mb-5">Admin Page</h1>
      <div className="mb-5">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Pizza Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={pizzaData.name}
            onChange={handleChange}
            placeholder="Pizza name"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Pizza Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={pizzaData.image}
            onChange={handleChange}
            placeholder="Pizza image URL"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Pizza Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={pizzaData.price}
            onChange={handleChange}
            placeholder="Pizza price"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Pizza Description:</label>
          <textarea
            id="description"
            name="description"
            value={pizzaData.description}
            onChange={handleChange}
            placeholder="Pizza description"
            className="form-control"
          />
        </div>
        <div className="d-grid">
          <button onClick={handleSubmit} className="btn btn-primary">
            {selectedPizza ? 'Update Pizza' : 'Create Pizza'}
          </button>
        </div>
      </div>
      <div>
        <h2 className="mb-3">Pizzas</h2>
        <ul className="list-unstyled">
          {pizzas.map(pizza => (
            <li className="mb-2">
              <div className="d-flex justify-content-between align-items-center">
                <span>{pizza.name} - ${pizza.price}</span>
                <div>
                  <button className="btn btn-warning me-2" onClick={() => handleEdit(pizza)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(pizza.id)}>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;