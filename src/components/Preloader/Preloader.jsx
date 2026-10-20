import { MESSAGE_SEARCHING } from '../../utils/constants';
import './Preloader.css';

function Preloader() {
  return (
    <section className="preloader" aria-live="polite">
      <i className="preloader__circle" aria-hidden="true" />
      <p className="preloader__text">{MESSAGE_SEARCHING}</p>
    </section>
  );
}

export default Preloader;
