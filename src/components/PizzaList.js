import React, { useState } from 'react';
import FilterForm from './FilterForm';

function PizzaList() {
  const [pizzas, setPizzas] = useState([
    // Here is your initial array of pizzas
  ]);
  const [filteredPizzas, setFilteredPizzas] = useState([]);

  const handleFilter = (filterValues) => {
    const { name, price } = filterValues;
    
    let filtered = [...pizzas];

    if (name) {
      filtered = filtered.filter(pizza => pizza.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (price) {
      filtered = filtered.filter(pizza => pizza.price <= price);
    }

    setFilteredPizzas(filtered);
  };

  return (
    <div>
      <FilterForm onFilter={handleFilter} />
      <div>
        {filteredPizzas.map(pizza => (
          <div key={pizza.id}>
            <h3>{pizza.name}</h3>
            <p>${pizza.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PizzaList;
