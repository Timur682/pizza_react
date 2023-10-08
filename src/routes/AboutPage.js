import React from 'react';
import './AboutPage.scss'; 

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1 className="about-title">About Pizza Delicious</h1>
      <div className="feature">
        <h2 className="feature-title">Key Features:</h2>
        <ul className="feature-list">
          <li>Diverse Menu: Explore an extensive menu that includes classic pizzas, signature pizzas, and other delicious dishes.</li>
          <li>User Accounts: Create an account to streamline your ordering experience. Save your preferences, access your order history, and place new orders with ease.</li>
          <li>Order Placement: Ordering has never been easier. Add items to your cart, review your selections, and complete your order with your preferred delivery or pickup option and payment method.</li>
          <li>Registration and Login: New users can register, and existing users can log in to access their accounts and continue enjoying the app.</li>
          <li>Order Tracking: Track the status of your orders in real-time, from preparation to delivery. Rate and review dishes and service quality to provide feedback.</li>
          <li>Administrator Access: Administrators can manage the menu, review and process orders, and oversee user accounts.</li>
        </ul>
      </div>
      <p className="app-description">
        Pizza Delicious aims to satisfy your cravings, whether you're a pizza aficionado or just in the mood for a delicious meal.
         We're here to make your pizza ordering experience as user-friendly, personalized, and efficient as possible. Enjoy your meal!
      </p>
    </div>
  );
};

export default AboutPage;
