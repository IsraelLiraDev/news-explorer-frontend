import { useCallback, useState } from 'react';

// Mensagens de erro em português (as mensagens nativas dependem do idioma do navegador).
function getErrorMessage(input) {
  const { validity } = input;

  if (validity.valueMissing) {
    return 'Este campo é obrigatório';
  }
  if (validity.typeMismatch && input.type === 'email') {
    return 'Insira um endereço de e-mail válido';
  }
  if (validity.tooShort) {
    return `Use pelo menos ${input.minLength} caracteres`;
  }
  if (validity.tooLong) {
    return `Use no máximo ${input.maxLength} caracteres`;
  }
  return input.validationMessage;
}

// Valida o formulário a cada caractere digitado.
function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback((evt) => {
    const input = evt.target;

    setValues((currentValues) => ({ ...currentValues, [input.name]: input.value }));
    setErrors((currentErrors) => ({ ...currentErrors, [input.name]: getErrorMessage(input) }));
    setIsValid(input.closest('form').checkValidity());
  }, []);

  const resetForm = useCallback(() => {
    setValues({});
    setErrors({});
    setIsValid(false);
  }, []);

  return {
    values, errors, isValid, handleChange, resetForm,
  };
}

export default useFormWithValidation;
