import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RiGlobalLine, RiMailLine, RiLockPasswordLine } from 'react-icons/ri';
import { AuthContext } from '../context/authContext';
import '../styles/LoginRegister.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputs = { email, password };
    await login(inputs);
  };

  return (
    <div className='formContainer'>
      <motion.div
        className="smart-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="smart-logo">
          <h2>
            <Link id='smart-logo-h2' to={'/'}>
              <RiGlobalLine style={{ fontSize: '1.5rem', marginRight: '8px' }} />
              Smart Meet
            </Link>
          </h2>
        </div>
      </motion.div>

      <motion.div
        className="formWrapper"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span className="title">Welcome Back</span>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="loginEmail" className="form-label">
              <RiMailLine style={{ marginRight: '6px' }} />
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="loginEmail"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label">
              <RiLockPasswordLine style={{ marginRight: '6px' }} />
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="loginPassword"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>
        <p>Don't have an account? <Link to={'/register'}>Register now!</Link></p>
      </motion.div>
    </div>
  );
};

export default Login;