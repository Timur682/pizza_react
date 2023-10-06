import React from 'react';
import './AboutPage.scss'; 
const AboutPage = () => {
  return (
    <div className="about-page">
      <h1 className="about-title">About Pizza delicious</h1>
      <div className="feature">
        <h2 className="feature-title">Key Features:</h2>
        <ul className="feature-list">
          <li>Diverse Menu: The app offers an extensive menu that includes classic and signature pizzas, along with other delectable dishes.</li>
          <li>User Accounts: Users can create accounts to streamline their ordering experience. This feature allows them to save preferences, access order history, and quickly place new orders without re-entering information.</li>
          <li>Order Placement: Ordering is a breeze. Users can add items to their cart, review their selections, and complete orders, including selecting delivery or pickup and choosing a payment method.</li>
          <li>Registration and Login: New users can register, and existing users can log in to access their accounts.</li>
          <li>Order Tracking: Users can track the status of their orders in real-time, from preparation to delivery. They can also provide feedback by rating and reviewing dishes and service quality.</li>
          <li>Dark Mode: The app offers a dark mode for users who prefer a darker interface for a more comfortable experience, day or night.</li>
          <li>Administrator Access: Administrators have special access to manage the menu, review and process orders, and oversee user accounts.</li>
        </ul>
      </div>
      <p className="app-description">
        The "Pizza delicious" aims to provide users with a seamless and enjoyable online 
        pizza ordering experience, with a user-friendly interface, personalized options, 
        and efficient order management. Whether you're a pizza aficionado or simply craving 
        a delicious meal, the "Pizza delicious" is here to satisfy your cravings.
      </p>
    </div>
  );
};

export default AboutPage;
