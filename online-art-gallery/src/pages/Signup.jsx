import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ROLES } from "../constants";
import "../styles/auth.css";
import "../styles/error.css";

export default function Signup() {
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: ROLES.CUSTOMER,
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.email.includes('@')) newErrors.email = "Invalid email format";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    
    try {
      if (!validateForm()) {
        return;
      }

      // Clear any existing errors
      setErrors({});

      console.log('Sending signup data:', formData);
      const signupData = {
        ...formData,
        role: formData.role.toUpperCase()
      };
      console.log('Processed signup data:', signupData);

      await signup(signupData);
    } catch (err) {
      console.error('Signup error:', err);
      const errorMessage = err.message || 'Registration failed';
      
      // Map error messages to form fields
      if (errorMessage.toLowerCase().includes('email already in use') || 
          errorMessage.toLowerCase().includes('email exists')) {
        setErrors({ email: 'This email is already registered' });
      } else if (errorMessage.toLowerCase().includes('password')) {
        setErrors({ password: errorMessage });
      } else if (errorMessage.toLowerCase().includes('email')) {
        setErrors({ email: errorMessage });
      } else if (errorMessage.toLowerCase().includes('name')) {
        setErrors({ name: errorMessage });
      } else if (errorMessage.toLowerCase().includes('role')) {
        setErrors({ role: errorMessage });
      } else {
        setErrors({ 
          submit: errorMessage.replace('Registration failed: ', '')
        });
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {errors.submit && (
            <div className="submit-error">{errors.submit}</div>
          )}
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              required
              className={errors.name ? 'error-field' : ''}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) {
                  setErrors({ ...errors, name: '' });
                }
              }}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              className={errors.email ? 'error-field' : ''}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) {
                  setErrors({ ...errors, email: '' });
                }
              }}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Create a password"
                required
                className={errors.password ? 'error-field' : ''}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) {
                    setErrors({ ...errors, password: '' });
                  }
                }}
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️‍🗨️" : "👁️"}
              </span>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="role">I want to register as:</label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => {
                const newRole = e.target.value;
                console.log('Role selected:', newRole); // Debug log
                setFormData({ ...formData, role: newRole.toUpperCase() });
              }}
              className={errors.role ? 'error-field' : ''}
            >
              <option value={ROLES.CUSTOMER}>Art Buyer (Customer)</option>
              <option value={ROLES.ARTIST}>Artist (Sell Artwork)</option>
            </select>
            {errors.role && <div className="error-message">{errors.role}</div>}
          </div>

          {formData.role === 'admin' && (
            <div className="input-group">
              <label htmlFor="adminCode">Admin Registration Code</label>
              <input
                type="password"
                id="adminCode"
                placeholder="Enter admin registration code"
                required
                className={errors.adminCode ? 'error-field' : ''}
                onChange={(e) => {
                  setFormData({ ...formData, adminCode: e.target.value });
                  if (errors.adminCode) {
                    setErrors({ ...errors, adminCode: '' });
                  }
                }}
              />
              {errors.adminCode && (
                <div className="error-message">{errors.adminCode}</div>
              )}
            </div>
          )}

          <button type="submit" className="gold-btn">Sign Up</button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
