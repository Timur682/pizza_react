import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    onSearch(searchTerm);
  };

  return (
    <Form inline className="mb-3">
      <FormControl
        type="text"
        placeholder="Search"
        className="mr-sm-2"
        name="search"
        value={searchTerm}
        onChange={handleChange}
        style={{ width: '200px', fontSize: '14px' }}
      />
    </Form>
  );
};

export default SearchBar;
