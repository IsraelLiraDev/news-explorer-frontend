import Popup from '../Popup/Popup';
import './PopupWithForm.css';

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
  isSubmitDisabled,
  errorMessage,
  switchText,
  onSwitchClick,
  children,
}) {
  return (
    <Popup name={name} title={title} isOpen={isOpen} onClose={onClose}>
      <form className="popup__form" name={name} noValidate onSubmit={onSubmit}>
        <div className="popup__fields">{children}</div>
        {errorMessage && <p className="popup__error" role="alert">{errorMessage}</p>}
        <button className="popup__submit" type="submit" disabled={isSubmitDisabled}>
          {buttonText}
        </button>
      </form>
      <p className="popup__switch">
        ou
        {' '}
        <button className="popup__link" type="button" onClick={onSwitchClick}>{switchText}</button>
      </p>
    </Popup>
  );
}

export default PopupWithForm;
