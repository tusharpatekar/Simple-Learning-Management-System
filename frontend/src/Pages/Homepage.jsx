import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  
  // If user is not logged in, show welcome message
  return (
    <div className="homepage-container">
      <h1>Welcome to LMS</h1>
      <p>Please <Link to="/signin">sign in</Link> or <Link to="/signup">sign up</Link> to continue.</p>
    </div>
  );
};

export default Homepage;
