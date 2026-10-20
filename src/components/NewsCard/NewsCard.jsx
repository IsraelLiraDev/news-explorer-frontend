import { formatArticleDate } from '../../utils/dateHelpers';
import { MESSAGE_REMOVE_FROM_SAVED, MESSAGE_SIGN_IN_TO_SAVE } from '../../utils/constants';
import fallbackImage from '../../images/no-image.svg';
import './NewsCard.css';

function NewsCard({
  variant, article, isLoggedIn, isSaved, onSaveClick, onDeleteClick,
}) {
  const isSavedVariant = variant === 'saved';

  function handleImageError(evt) {
    evt.target.onerror = null;
    evt.target.src = fallbackImage;
  }

  return (
    <article className="news-card">
      <a
        className="news-card__link"
        href={article.link}
        target="_blank"
        rel="noreferrer noopener"
      >
        <img
          className="news-card__image"
          src={article.image || fallbackImage}
          alt={article.title}
          loading="lazy"
          onError={handleImageError}
        />
        <div className="news-card__content">
          <time className="news-card__date" dateTime={article.date}>
            {formatArticleDate(article.date)}
          </time>
          <h3 className="news-card__title">{article.title}</h3>
          <p className="news-card__text">{article.text}</p>
          <p className="news-card__source">{article.source}</p>
        </div>
      </a>
      {isSavedVariant && <p className="news-card__keyword">{article.keyword}</p>}
      <div className="news-card__actions">
        {isSavedVariant ? (
          <>
            <span className="news-card__tooltip" role="tooltip">{MESSAGE_REMOVE_FROM_SAVED}</span>
            <button
              className="news-card__button"
              type="button"
              aria-label={MESSAGE_REMOVE_FROM_SAVED}
              onClick={() => onDeleteClick(article)}
            >
              <span className="news-card__icon news-card__icon_type_trash" />
            </button>
          </>
        ) : (
          <>
            {!isLoggedIn && (
              <span className="news-card__tooltip" role="tooltip">{MESSAGE_SIGN_IN_TO_SAVE}</span>
            )}
            <button
              className={`news-card__button${isSaved ? ' news-card__button_saved' : ''}`}
              type="button"
              aria-label={isSaved ? 'Remover artigo dos salvos' : 'Salvar artigo'}
              aria-pressed={isSaved}
              onClick={() => onSaveClick(article)}
            >
              <span className="news-card__icon news-card__icon_type_bookmark" />
            </button>
          </>
        )}
      </div>
    </article>
  );
}

export default NewsCard;
