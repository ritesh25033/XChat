// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import '../../styles/Auth.css';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     username: '',
//     password: ''
//   });
//   const { register, error, loading, isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = await register(formData);
//     if (result.success) {
//       navigate('/login');
//     }
//   };

//   return (
//     <div id="register-page" className="auth-container">
//       <div className="auth-card">
//         <div className="auth-header">
//           <div className="chat-icon">💬</div>
//           <h1>Create Account</h1>
//           <p>Join our community and start chatting</p>
//         </div>

//         <form onSubmit={handleSubmit} className="auth-form">
//           <div className="form-group">
//             <label htmlFor="fullname-input">Full Name</label>
//             <div className="input-wrapper">
//               <span className="input-icon">👤</span>
//               <input
//                 id="fullname-input"
//                 type="text"
//                 name="fullName"
//                 placeholder="Your full name"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="email-input">Email address</label>
//             <div className="input-wrapper">
//               <span className="input-icon">📧</span>
//               <input
//                 id="email-input"
//                 type="email"
//                 name="email"
//                 placeholder="name@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="username-input">Username</label>
//             <div className="input-wrapper">
//               <span className="input-icon">@</span>
//               <input
//                 id="username-input"
//                 type="text"
//                 name="username"
//                 placeholder="Choose a username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="password-input">Password</label>
//             <div className="input-wrapper">
//               <span className="input-icon">🔒</span>
//               <input
//                 id="password-input"
//                 type="password"
//                 name="password"
//                 placeholder="Choose a strong password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           {error && (
//             <div id="register-error" className="error-message">
//               {error}
//             </div>
//           )}

//           <button
//             id="register-button"
//             type="submit"
//             className="auth-button"
//             disabled={loading}
//           >
//             {loading ? 'Creating Account...' : 'Create Account'}
//           </button>
//         </form>

//         <div className="auth-footer">
//           <p>
//             Already have an account?{' '}
//             <Link to="/login" className="auth-link">Sign in</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;




import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: ''
  });
  const { register, error, loading, isAuthenticated } = useAuth();
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
    const result = await register(formData);
    if (result.success) {
      navigate('/login');
    }
  };

  return (
    <div id="register-page" className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="chat-icon">💬</div>
          <h1>Create Account</h1>
          <p>Join our community and start chatting</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="fullname-input">Full Name</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                id="fullname-input"
                type="text"
                name="fullName"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

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
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username-input">Username</label>
            <div className="input-wrapper">
              <span className="input-icon">@</span>
              <input
                id="username-input"
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                 disabled={false}
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
                placeholder="Choose a strong password"
                value={formData.password}
                onChange={handleChange}
                 disabled={false}
                required
              />
            </div>
          </div>

          {error && (
            <div id="register-error" className="error-message">
              {error}
            </div>
          )}

          <button
            id="register-button"
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
