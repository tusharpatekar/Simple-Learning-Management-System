import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css'

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data.token);
      if (response.ok) {
        alert(data.message); // Show success message
        localStorage.setItem('token', data.token); // Save token to localStorage
        localStorage.setItem('userRole', data.user.role);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isSelected', data.user.isSelected)
        if(data.user.role==="Admin"){
          window.location.href = '/AdminDashboard';
        }else{
          
          window.location.href = '/StudentDashboard';
        }
         // Redirect to dashboard
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignIn}>Sign In</button>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default SignInPage;
