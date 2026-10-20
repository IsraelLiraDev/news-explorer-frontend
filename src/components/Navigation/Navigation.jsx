import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({
  isLoggedIn, userName, onSignInClick, onSignOutClick,
}) {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink
            className="navigation__link"
            activeClassName="navigation__link_active"
            exact
            to="/"
          >
            Início
          </NavLink>
        </li>
        {isLoggedIn && (
          <li className="navigation__item">
            <NavLink
              className="navigation__link"
              activeClassName="navigation__link_active"
              to="/saved-news"
            >
              Artigos salvos
            </NavLink>
          </li>
        )}
      </ul>
      {isLoggedIn ? (
        <button className="navigation__button" type="button" onClick={onSignOutClick}>
          <span className="navigation__user">{userName}</span>
          <span className="navigation__logout-icon" aria-hidden="true" />
          <span className="navigation__sr-only">Sair</span>
        </button>
      ) : (
        <button className="navigation__button" type="button" onClick={onSignInClick}>
          Entrar
        </button>
      )}
    </nav>
  );
}

export default Navigation;
