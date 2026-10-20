import './SavedNewsHeader.css';

function SavedNewsHeader({ userName, countText, keywordsText }) {
  return (
    <section className="saved-news-header">
      <p className="saved-news-header__label">Artigos salvos</p>
      <h1 className="saved-news-header__title">{`${userName}, você tem ${countText}`}</h1>
      {keywordsText && (
        <p className="saved-news-header__keywords">
          Por palavras-chave:
          {' '}
          <span className="saved-news-header__keywords-list">{keywordsText}</span>
        </p>
      )}
    </section>
  );
}

export default SavedNewsHeader;
