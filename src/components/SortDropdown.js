import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const SortByDropdown = ({ onSort }) => {
  const [show, setShow] = useState(false);

  const handleSelect = (sortType) => {
    onSort(sortType);
    setShow(false); // Закрыть меню после выбора
  };

  return (
    <Dropdown show={show} onToggle={(isOpen) => setShow(isOpen)}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Sort By
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onSelect={() => handleSelect('priceDesc')}>Price Descending</Dropdown.Item>
        <Dropdown.Item onSelect={() => handleSelect('priceAsc')}>Price Ascending</Dropdown.Item>
        <Dropdown.Item onSelect={() => handleSelect('nameDesc')}>Name Descending</Dropdown.Item>
        <Dropdown.Item onSelect={() => handleSelect('nameAsc')}>Name Ascending</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortByDropdown;
