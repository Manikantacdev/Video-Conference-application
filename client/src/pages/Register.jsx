import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RiGlobalLine, RiMailLine, RiLockPasswordLine, RiUserLine } from 'react-icons/ri';
import { AuthContext } from '../context/authContext';
import '../styles/LoginRegister.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputs = { username, email, password };
    await register(inputs);
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
        <span className="title">Create Account</span>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="registerUsername" className="form-label">
              <RiUserLine style={{ marginRight: '6px' }} />
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="registerUsername"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="registerEmail" className="form-label">
              <RiMailLine style={{ marginRight: '6px' }} />
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="registerEmail"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="registerPassword" className="form-label">
              <RiLockPasswordLine style={{ marginRight: '6px' }} />
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="registerPassword"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
        </form>
        <p>Already have an account? <Link to={'/login'}>Sign in</Link></p>
      </motion.div>
    </div>
  );
};

export default Register;