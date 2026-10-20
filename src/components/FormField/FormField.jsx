import './FormField.css';

function FormField({
  label, id, error, ...inputProps
}) {
  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={id}>{label}</label>
      <input
        className={`form-field__input${error ? ' form-field__input_invalid' : ''}`}
        id={id}
        aria-invalid={Boolean(error)}
        {...inputProps}
      />
      <span className="form-field__error">{error}</span>
    </div>
  );
}

export default FormField;
