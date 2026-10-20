import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import About from '../About/About';
import { SEARCH_STATUS, MESSAGE_NOT_FOUND_TEXT, MESSAGE_NOT_FOUND_TITLE, MESSAGE_REQUEST_ERROR } from '../../utils/constants';
import './Main.css';

function renderResults({
  status, articles, visibleCount, isLoggedIn, savedArticles, onShowMore, onSaveClick,
}) {
  switch (status) {
    case SEARCH_STATUS.LOADING:
      return <Preloader />;
    case SEARCH_STATUS.EMPTY:
      return <NotFound title={MESSAGE_NOT_FOUND_TITLE} text={MESSAGE_NOT_FOUND_TEXT} />;
    case SEARCH_STATUS.ERROR:
      return <NotFound text={MESSAGE_REQUEST_ERROR} />;
    case SEARCH_STATUS.SUCCESS:
      return (
        <NewsCardList
          variant="search"
          title="Procurar resultados"
          articles={articles.slice(0, visibleCount)}
          hasMore={visibleCount < articles.length}
          isLoggedIn={isLoggedIn}
          savedArticles={savedArticles}
          onShowMore={onShowMore}
          onSaveClick={onSaveClick}
        />
      );
    default:
      return null;
  }
}

function Main({
  keyword, status, articles, visibleCount, isLoggedIn, savedArticles, onSearch, onShowMore, onSaveClick,
}) {
  return (
    <main className="main">
      <section className="main__hero">
        <h1 className="main__title">O que está acontecendo no mundo?</h1>
        <p className="main__subtitle">
          Encontre as últimas notícias sobre qualquer tema e salve elas em sua conta pessoal
        </p>
        <SearchForm initialKeyword={keyword} onSearch={onSearch} />
      </section>
      {renderResults({
        status, articles, visibleCount, isLoggedIn, savedArticles, onShowMore, onSaveClick,
      })}
      <About />
    </main>
  );
}

export default Main;
