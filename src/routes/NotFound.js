import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss'; 

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h2>Page not found</h2>
            <p>Sorry, the page you're looking for does not exist.</p>
            <Link to="/">Go back to the home page</Link>
        </div>
    );
};

export default NotFound;