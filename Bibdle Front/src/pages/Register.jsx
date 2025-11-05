import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validación
    if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
      setError('Completa todos los campos');
      return;
    }

    if (!email.includes('@')) {
      setError('Ingresa un correo válido');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      // Aquí conectas con tu backend
      const response = await fetch('http://tu-backend-url/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('¡Registro exitoso! Redirigiendo...');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setError(data.message || 'Error al registrarse');
      }
    } catch (err) {
      // Por ahora, simular un registro exitoso si no hay backend
      console.log('Registro:', { username, email, password });
      setSuccess('¡Registro exitoso! Redirigiendo...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
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
            <label htmlFor="email">Correo</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo"
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
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="login-button">
            Registrarse
          </button>
        </form>

        <p className="register-link">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
