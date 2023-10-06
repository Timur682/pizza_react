// FilterForm.js - Component for the filtering form
import React, { useState } from 'react';

function FilterForm({ onFilter }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleFilter = () => {
    onFilter({ name, price });
  };

  return (
    <div>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
      </label>
      <button onClick={handleFilter}>Apply Filter</button>
    </div>
  );
}

export default FilterForm;
