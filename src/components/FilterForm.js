// FilterForm.js - компонент для формы фильтрации
import React, { useState } from 'react';

function FilterForm({ onFilter }) {
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const handleFilter = () => {
    onFilter({ category, price });
  };

  return (
    <div>
      <label>
        Категория:
        <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
      </label>
      <label>
        Цена:
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
      </label>
      <button onClick={handleFilter}>Применить фильтр</button>
    </div>
  );
}

export default FilterForm;
