import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

export const Header = () => {
  const { isAuthenticated, userEmail } = useContext(AuthContext);

  return (
    <header>

      <h1><Link className="home" to="/">GamesPlay</Link></h1>
      <nav>
        <Link to="/catalogue">All games</Link>
  
        {isAuthenticated && (
          <div id="user">
            <Link to="/create-game">Create Game</Link>
            <Link to="/logout">Logout</Link>
            <span>{userEmail}</span>
          </div>
        )}
        
        {!isAuthenticated && (
          <div id="guest">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}