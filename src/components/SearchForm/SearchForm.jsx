import { useState } from 'react';
import { MESSAGE_EMPTY_KEYWORD } from '../../utils/constants';
import './SearchForm.css';

function SearchForm({ initialKeyword, onSearch }) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(evt) {
    setKeyword(evt.target.value);
    setErrorMessage('');
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      setErrorMessage(MESSAGE_EMPTY_KEYWORD);
      return;
    }
    onSearch(trimmedKeyword);
  }

  return (
    <form className="search-form" name="search" noValidate onSubmit={handleSubmit}>
      <div className="search-form__field">
        <input
          className="search-form__input"
          type="text"
          name="keyword"
          placeholder="Inserir tema"
          aria-label="Tema da pesquisa"
          aria-invalid={Boolean(errorMessage)}
          value={keyword}
          onChange={handleChange}
        />
        <button className="search-form__button" type="submit">Procurar</button>
      </div>
      {errorMessage && <p className="search-form__error" role="alert">{errorMessage}</p>}
    </form>
  );
}

export default SearchForm;
