import { useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import FormField from '../FormField/FormField';
import useFormWithValidation from '../../utils/useFormWithValidation';

function Register({
  isOpen, onClose, onSubmit, onSwitchClick, errorMessage,
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
      name="register"
      title="Inscrever-se"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Inscrever-se"
      isSubmitDisabled={!isValid}
      errorMessage={errorMessage}
      switchText="Entre"
      onSwitchClick={onSwitchClick}
    >
      <FormField
        label="E-mail"
        id="register-email"
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
        id="register-password"
        name="password"
        type="password"
        placeholder="Insira a senha"
        autoComplete="new-password"
        value={values.password || ''}
        error={errors.password}
        onChange={handleChange}
        minLength={8}
        required
      />
      <FormField
        label="Nome de usuário"
        id="register-name"
        name="name"
        type="text"
        placeholder="Insira seu nome de usuário"
        autoComplete="username"
        value={values.name || ''}
        error={errors.name}
        onChange={handleChange}
        minLength={2}
        maxLength={30}
        required
      />
    </PopupWithForm>
  );
}

export default Register;
