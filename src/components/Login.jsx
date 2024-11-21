
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup } from './firebase'; 
import { useUser } from './UserContext';
import './Login.css';

const LoginForm = () => {
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); 
  const { setUser } = useUser(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};
    if (!formValues.username) {
      errors.username = 'Required';
    }
    if (!formValues.password) {
      errors.password = 'Required';
    }
    return errors;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   const errors = validate();
  //   if (Object.keys(errors).length === 0) {
  //     console.log('Form data', formValues);
  //     navigate('/categorization'); 
  //   } else {
  //     setFormErrors(errors);
  //   }
  //   setIsSubmitting(false);
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const errors = validate();
    if (Object.keys(errors).length === 0) {
        try {
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                // Handle successful login, e.g., store user info, redirect, etc.
                setUser(data.user);
                navigate('/categorization');
            } else {
                const errorData = await response.json();
                setFormErrors({ general: errorData.detail || 'Login failed' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            setFormErrors({ general: 'An unexpected error occurred' });
        }
    } else {
        setFormErrors(errors);
    }
    setIsSubmitting(false);
};

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google Sign-In successful:', user);
      alert('Google Sign-In successful!');
      setUser(user); 
      navigate(''); 
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  };
  

  return (
    <div className="component">
      <div className='loginmain'>
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formValues.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
              {formErrors.username && <div className="error">{formErrors.username}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              {formErrors.password && <div className="error">{formErrors.password}</div>}
            </div>

            <button type="submit" disabled={isSubmitting}>Login</button>
            <a href="/forgot-password" className="forgot-password">Forgot password?</a>
          </form>
          <div className="social-login">
            <p>OR</p>
            <button className="google-login" onClick={handleGoogleSignIn}>
              Sign In with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;





