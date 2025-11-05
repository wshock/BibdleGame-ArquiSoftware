import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validación simple (puedes conectarlo a tu backend después)
    if (username.trim() === '' || password.trim() === '') {
      setError('Completa todos los campos');
      return;
    }

    // Simulación de login exitoso
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    navigate('/'); 
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">BibDle</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="form-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>

        <p className="register-link">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
