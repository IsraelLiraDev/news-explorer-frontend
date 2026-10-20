import { Link } from 'react-router-dom';
import { LINK_FACEBOOK, LINK_GITHUB, LINK_PRACTICUM } from '../../utils/constants';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2021 Supersite, desenvolvido pela News API</p>
      <nav className="footer__nav">
        <ul className="footer__links">
          <li><Link className="footer__link" to="/">Início</Link></li>
          <li>
            <a className="footer__link" href={LINK_PRACTICUM} target="_blank" rel="noreferrer noopener">
              Practicum
            </a>
          </li>
        </ul>
        <ul className="footer__social">
          <li>
            <a
              className="footer__social-link footer__social-link_type_github"
              href={LINK_GITHUB}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
            />
          </li>
          <li>
            <a
              className="footer__social-link footer__social-link_type_facebook"
              href={LINK_FACEBOOK}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook"
            />
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
