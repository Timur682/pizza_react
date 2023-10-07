import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import '../routes/styles.scss'; // Импортируем файл стилей

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Form onSubmit={handleSubmit} className="search-form">
      <div className="flex-container">
        <FormControl
          type="text"
          placeholder="Search"
          className="search-input"
          name="search"
          value={searchTerm}
          onChange={handleChange}
        />
        <Button 
          variant="outline-primary" 
          type="submit" 
          className="search-button">
          Search
        </Button>
      </div>
    </Form>
  );
};

export default SearchBar;
