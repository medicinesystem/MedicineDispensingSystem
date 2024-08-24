import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    pharmacyName: '',
    registrationNumber: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
    registrationCertificate: null,
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.pharmacyName.trim()) tempErrors.pharmacyName = 'Pharmacy Name is required';
    if (!formData.registrationNumber.trim()) tempErrors.registrationNumber = 'Registration Number is required';
    if (!formData.address.trim()) tempErrors.address = 'Address is required';
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email address is invalid';
    }
    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords must match';
    }
    if (!formData.registrationCertificate) tempErrors.registrationCertificate = 'Registration Certificate is required';
    if (!formData.terms) tempErrors.terms = 'You must agree to the terms and conditions';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form data:', formData);
      alert('Signup successful!');
      navigate('/login');
    }
  };

  const handlePrivacyPolicyClick = () => {
    navigate('/Term'); 
  };

  return (
    <div className="maincontainer">
    <div className='signupmain'>
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <p className="error">{errors.name}</p>}
          </label>
          <label>
            Pharmacy Name:
            <input type="text" name="pharmacyName" value={formData.pharmacyName} onChange={handleChange} />
            {errors.pharmacyName && <p className="error">{errors.pharmacyName}</p>}
          </label>
          <label>
            Registration Number:
            <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} />
            {errors.registrationNumber && <p className="error">{errors.registrationNumber}</p>}
          </label>
          <label>
            Address:
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
            {errors.address && <p className="error">{errors.address}</p>}
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </label>
          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <p className="error">{errors.password}</p>}
          </label>
          <label>
            Confirm Password:
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </label>
          <label>
            Registration Certificate:
            <input type="file" name="registrationCertificate" onChange={handleChange} />
            {errors.registrationCertificate && <p className="error">{errors.registrationCertificate}</p>}
          </label>
          <label className="terms">
            <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} />
            I agree to the <a href="#" onClick={handlePrivacyPolicyClick}>terms and conditions</a>
          </label>
          {errors.terms && <p className="error">{errors.terms}</p>}
          <button type="submit">Sign Up</button>
          <button type="button" className="google-btn">Sign up with Google</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
