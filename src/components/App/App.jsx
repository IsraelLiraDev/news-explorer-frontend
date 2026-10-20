import { useCallback, useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { getNewsByKeyword } from '../../utils/NewsApi';
import { normalizeArticles } from '../../utils/articleHelpers';
import PLACEHOLDER_SAVED_ARTICLES from '../../utils/savedNewsPlaceholder';
import {
  CARDS_PER_PAGE,
  POPUP,
  SEARCH_STATUS,
  STORAGE_KEY_ARTICLES,
  STORAGE_KEY_KEYWORD,
} from '../../utils/constants';
import './App.css';

function App() {
  const location = useLocation();
  const [activePopup, setActivePopup] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fase 1: login simulado. Na Fase 3 isto passa a vir da API e do CurrentUserContext.
  const [currentUser, setCurrentUser] = useState(null);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchStatus, setSearchStatus] = useState(SEARCH_STATUS.IDLE);
  const [foundArticles, setFoundArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  // Fase 1: artigos salvos em memória. Na Fase 3 passam a vir de GET /articles.
  const [savedArticles, setSavedArticles] = useState(PLACEHOLDER_SAVED_ARTICLES);

  const isLoggedIn = Boolean(currentUser);
  const isSavedPage = location.pathname === '/saved-news';

  // Ao montar o app, recupera a última busca do armazenamento local.
  useEffect(() => {
    try {
      const storedArticles = JSON.parse(localStorage.getItem(STORAGE_KEY_ARTICLES));
      if (Array.isArray(storedArticles) && storedArticles.length > 0) {
        setFoundArticles(storedArticles);
        setSearchKeyword(localStorage.getItem(STORAGE_KEY_KEYWORD) || '');
        setSearchStatus(SEARCH_STATUS.SUCCESS);
      }
    } catch {
      // armazenamento indisponível ou dados inválidos: começa sem resultados
    }
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const closePopup = useCallback(() => setActivePopup(null), []);

  function handleSearch(keyword) {
    setSearchKeyword(keyword);
    setSearchStatus(SEARCH_STATUS.LOADING);
    setVisibleCount(CARDS_PER_PAGE);

    getNewsByKeyword(keyword)
      .then((data) => {
        const articles = normalizeArticles(data.articles, keyword);

        setFoundArticles(articles);
        setSearchStatus(articles.length > 0 ? SEARCH_STATUS.SUCCESS : SEARCH_STATUS.EMPTY);
        try {
          localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(articles));
          localStorage.setItem(STORAGE_KEY_KEYWORD, keyword);
        } catch {
          // sem armazenamento local: o resultado continua disponível na sessão
        }
      })
      .catch(() => setSearchStatus(SEARCH_STATUS.ERROR));
  }

  function handleShowMore() {
    setVisibleCount((count) => count + CARDS_PER_PAGE);
  }

  // TODO Fase 3: trocar pelas chamadas ao MainApi (/signin, /signup, /users/me).
  function handleLogin({ email }) {
    const name = email.split('@')[0];

    setCurrentUser({ name: name.charAt(0).toUpperCase() + name.slice(1), email });
    closePopup();
  }

  function handleRegister() {
    setActivePopup(POPUP.SUCCESS);
  }

  function handleSignOut() {
    setCurrentUser(null);
    setIsMenuOpen(false);
  }

  // TODO Fase 3: POST /articles e DELETE /articles/:id.
  function handleSaveClick(article) {
    if (!isLoggedIn) {
      setActivePopup(POPUP.REGISTER);
      return;
    }
    setSavedArticles((articles) => {
      const isAlreadySaved = articles.some((saved) => saved.link === article.link);
      return isAlreadySaved
        ? articles.filter((saved) => saved.link !== article.link)
        : [...articles, article];
    });
  }

  function handleDeleteClick(article) {
    setSavedArticles((articles) => articles.filter((saved) => saved.link !== article.link));
  }

  return (
    <div className="page">
      <Header
        theme={isSavedPage ? 'light' : 'hero'}
        isLoggedIn={isLoggedIn}
        userName={currentUser ? currentUser.name : ''}
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen((isOpen) => !isOpen)}
        onSignInClick={() => setActivePopup(POPUP.LOGIN)}
        onSignOutClick={handleSignOut}
      />
      <Switch>
        <Route exact path="/">
          <Main
            keyword={searchKeyword}
            status={searchStatus}
            articles={foundArticles}
            visibleCount={visibleCount}
            isLoggedIn={isLoggedIn}
            savedArticles={savedArticles}
            onSearch={handleSearch}
            onShowMore={handleShowMore}
            onSaveClick={handleSaveClick}
          />
        </Route>
        <Route path="/saved-news">
          <SavedNews
            userName={currentUser ? currentUser.name : ''}
            articles={savedArticles}
            onDeleteClick={handleDeleteClick}
          />
        </Route>
      </Switch>
      <Footer />
      <Login
        isOpen={activePopup === POPUP.LOGIN}
        onClose={closePopup}
        onSubmit={handleLogin}
        onSwitchClick={() => setActivePopup(POPUP.REGISTER)}
      />
      <Register
        isOpen={activePopup === POPUP.REGISTER}
        onClose={closePopup}
        onSubmit={handleRegister}
        onSwitchClick={() => setActivePopup(POPUP.LOGIN)}
      />
      <Popup
        name="success"
        isOpen={activePopup === POPUP.SUCCESS}
        onClose={closePopup}
        title="Cadastro concluído com sucesso!"
      >
        <button
          className="popup__link popup__link_size_large"
          type="button"
          onClick={() => setActivePopup(POPUP.LOGIN)}
        >
          Entrar
        </button>
      </Popup>
    </div>
  );
}

export default App;
