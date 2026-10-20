import { useEffect } from 'react';
import './Popup.css';

// Janela modal base: fecha com o X, clique fora ou Esc.
function Popup({
  name, title, isOpen, onClose, children,
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscClose);
    return () => document.removeEventListener('keydown', handleEscClose);
  }, [isOpen, onClose]);

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_${name}${isOpen ? ' popup_opened' : ''}`}
      role="presentation"
      onMouseDown={handleOverlayClick}
    >
      <div
        className="popup__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`popup-title-${name}`}
        aria-hidden={!isOpen}
      >
        <button className="popup__close" type="button" aria-label="Fechar" onClick={onClose} />
        <h2 className="popup__title" id={`popup-title-${name}`}>{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Popup;
