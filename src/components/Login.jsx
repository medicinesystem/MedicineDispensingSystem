import React, { useState } from 'react';
import './Login.css';

const LoginForm = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};
    if (!formValues.email) {
      errors.email = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formValues.password) {
      errors.password = 'Required';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      console.log('Form data', formValues);
    } else {
      setFormErrors(errors);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="component">
    <div className='loginmain'>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {formErrors.email && <div className="error">{formErrors.email}</div>}
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
          <button className="google-login">
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;
