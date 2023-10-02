import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={notFoundStyle}>
            <h2>Page not found</h2>
            <p>Sorry, the page you're looking for does not exist.</p>
            <Link to="/">Go back to the home page</Link>
        </div>
    );
};

const notFoundStyle = {
    textAlign: 'center',
    marginTop: '2rem',
};

export default NotFound;
