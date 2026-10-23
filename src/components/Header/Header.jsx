import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({
  theme,
  isLoggedIn,
  isMenuOpen,
  onMenuToggle,
  onSignInClick,
  onSignOutClick,
}) {
  const headerClass = `header header_theme_${theme}${isMenuOpen ? ' header_menu_opened' : ''}`;

  return (
    <header className={headerClass}>
      <Link className="header__logo" to="/">NewsExplorer</Link>
      <button
        className={`header__menu-button${isMenuOpen ? ' header__menu-button_type_close' : ''}`}
        type="button"
        aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isMenuOpen}
        onClick={onMenuToggle}
      />
      <Navigation
        isLoggedIn={isLoggedIn}
        onSignInClick={onSignInClick}
        onSignOutClick={onSignOutClick}
      />
    </header>
  );
}

export default Header;
