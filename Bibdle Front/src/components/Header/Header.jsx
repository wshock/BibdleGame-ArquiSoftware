import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          BibDle
        </Link>

        <nav className="header-nav">
          {isLoggedIn ? (
            <>
              
              <button onClick={handleLogout} className="logout-button">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link">
              Iniciar Sesión
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
