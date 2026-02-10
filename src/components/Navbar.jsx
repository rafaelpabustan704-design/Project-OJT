import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Code2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <Code2 size={20} style={{ marginRight: 6, verticalAlign: 'middle' }} />
        portfolio
      </Link>
      <div className="navbar-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Home
        </Link>
        <Link
          to="/admin"
          className={isAdmin ? 'active' : ''}
        >
          Admin
        </Link>
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}
