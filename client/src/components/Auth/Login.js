import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { login, error, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div id="login-page" className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="chat-icon">💬</div>
          <h1>Welcome Back</h1>
          <p>Sign in to continue to ChatApp</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email-input">Email address</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                id="email-input"
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={false} // Always keep enabled
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password-input">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                id="password-input"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={false} // Always keep enabled
                required
              />
            </div>
          </div>

          {error && (
            <div id="login-error" className="error-message">
              {error}
            </div>
          )}

          <button
            id="login-button"
            type="submit"
            className="auth-button"
            disabled={loading} // Only disable the button, not inputs
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
