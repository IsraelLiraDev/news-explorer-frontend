import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList({
  variant, title, articles, hasMore, isLoggedIn, savedArticles, onShowMore, onSaveClick, onDeleteClick,
}) {
  const savedLinks = (savedArticles || []).map((article) => article.link);

  return (
    <section className={`news-card-list news-card-list_type_${variant}`}>
      {title && <h2 className="news-card-list__title">{title}</h2>}
      <ul className="news-card-list__list">
        {articles.map((article) => (
          <li className="news-card-list__item" key={article._id || article.link}>
            <NewsCard
              variant={variant}
              article={article}
              isLoggedIn={isLoggedIn}
              isSaved={savedLinks.includes(article.link)}
              onSaveClick={onSaveClick}
              onDeleteClick={onDeleteClick}
            />
          </li>
        ))}
      </ul>
      {hasMore && (
        <button className="news-card-list__more" type="button" onClick={onShowMore}>
          Mostrar mais
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
