import React from 'react';
import './styles.scss'; 

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <h1>401 Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
    </div>
  );
};

export default Unauthorized;
