import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? '/api/register' : '/api/login';
    const response = await fetch(`http://localhost:5000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role: 'user' }), // Default role: user
    });

    const data = await response.json();
    if (response.ok) {
      if (isRegister) {
        setMessage('Registration successful! Please log in.');
        setIsRegister(false);
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username); // ✅ Store username in localStorage
        setUser({ username, role: data.role }); // ✅ Set username & role in state
        navigate(data.role === 'admin' ? '/admin' : '/workout');
      }
    } else {
      setMessage(data.error || 'Something went wrong');
    }
  };

  return (
    <div className="login-page">
      {/* Welcome Title at the top center */}
      <h1 className="welcome-title">Welcome to Fitness Tracker</h1>
      
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">{isRegister ? 'Register' : 'Login'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
            </div>
            <button type="submit" className="login-button">
              {isRegister ? 'Register' : 'Login'}
            </button>
          </form>
          {message && <p className="error-message">{message}</p>}
          <p className="toggle-text">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span onClick={() => setIsRegister(!isRegister)} className="toggle-link">
              {isRegister ? 'Login' : 'Register'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
