import { useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import FormField from '../FormField/FormField';
import useFormWithValidation from '../../utils/useFormWithValidation';

function Login({
  isOpen, onClose, onSubmit, onSwitchClick, errorMessage, isLoading,
}) {
  const {
    values, errors, isValid, handleChange, resetForm,
  } = useFormWithValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(values);
  }

  return (
    <PopupWithForm
      name="login"
      title="Entrar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Enviando...' : 'Entrar'}
      isSubmitDisabled={!isValid || isLoading}
      errorMessage={errorMessage}
      switchText="Inscreva-se"
      onSwitchClick={onSwitchClick}
    >
      <FormField
        label="E-mail"
        id="login-email"
        name="email"
        type="email"
        placeholder="Insira e-mail"
        autoComplete="email"
        value={values.email || ''}
        error={errors.email}
        onChange={handleChange}
        required
      />
      <FormField
        label="Senha"
        id="login-password"
        name="password"
        type="password"
        placeholder="Insira a senha"
        autoComplete="current-password"
        value={values.password || ''}
        error={errors.password}
        onChange={handleChange}
        required
      />
    </PopupWithForm>
  );
}

export default Login;
