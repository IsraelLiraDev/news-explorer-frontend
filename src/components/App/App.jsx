import { useCallback, useEffect, useState } from 'react';
import {
  Route, Switch, useHistory, useLocation,
} from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { getNewsByKeyword } from '../../utils/NewsApi';
import * as mainApi from '../../utils/MainApi';
import { normalizeArticles } from '../../utils/articleHelpers';
import {
  CARDS_PER_PAGE,
  FALLBACK_IMAGE_URL,
  FALLBACK_SOURCE,
  FALLBACK_TEXT,
  MESSAGE_ACTION_ERROR,
  POPUP,
  SEARCH_STATUS,
  STORAGE_KEY_ARTICLES,
  STORAGE_KEY_KEYWORD,
  STORAGE_KEY_TOKEN,
} from '../../utils/constants';
import './App.css';

function readToken() {
  try {
    return localStorage.getItem(STORAGE_KEY_TOKEN);
  } catch {
    return null;
  }
}

// Recupera a última busca guardada no armazenamento local.
function readStoredSearch() {
  try {
    const articles = JSON.parse(localStorage.getItem(STORAGE_KEY_ARTICLES));
    if (Array.isArray(articles) && articles.length > 0) {
      return { articles, keyword: localStorage.getItem(STORAGE_KEY_KEYWORD) || '' };
    }
  } catch {
    // armazenamento indisponível ou dados inválidos: começa sem resultados
  }
  return null;
}

function App() {
  const location = useLocation();
  const history = useHistory();
  const [activePopup, setActivePopup] = useState(null);
  const [menuOpenPath, setMenuOpenPath] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(() => Boolean(readToken()));
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const [storedSearch] = useState(readStoredSearch);
  const [searchKeyword, setSearchKeyword] = useState(storedSearch ? storedSearch.keyword : '');
  const [searchStatus, setSearchStatus] = useState(
    storedSearch ? SEARCH_STATUS.SUCCESS : SEARCH_STATUS.IDLE,
  );
  const [foundArticles, setFoundArticles] = useState(storedSearch ? storedSearch.articles : []);
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  const [savedArticles, setSavedArticles] = useState([]);

  const isLoggedIn = Boolean(currentUser);
  const isSavedPage = location.pathname === '/saved-news';
  // O menu do celular fecha sozinho ao trocar de página.
  const isMenuOpen = menuOpenPath === location.pathname;

  // Busca os dados do usuário e os artigos salvos dele na API.
  const loadUserData = useCallback(
    (token) => Promise.all([mainApi.getUser(token), mainApi.getArticles(token)]).then(
      ([user, articles]) => {
        setCurrentUser(user);
        setSavedArticles(articles);
      },
    ),
    [],
  );

  // Ao montar o app: valida o token guardado e restaura o usuário.
  useEffect(() => {
    const token = readToken();

    if (token) {
      loadUserData(token)
        .catch(() => localStorage.removeItem(STORAGE_KEY_TOKEN))
        .finally(() => setIsCheckingAuth(false));
    }
  }, [loadUserData]);

  const closePopup = useCallback(() => setActivePopup(null), []);

  const openPopup = useCallback((popupName) => {
    setAuthError('');
    setActivePopup(popupName);
  }, []);

  const openLoginPopup = useCallback(() => openPopup(POPUP.LOGIN), [openPopup]);

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

  function handleLogin({ email, password }) {
    setIsAuthLoading(true);
    setAuthError('');

    mainApi
      .signin({ email, password })
      .then(({ token }) => {
        localStorage.setItem(STORAGE_KEY_TOKEN, token);
        return loadUserData(token);
      })
      .then(closePopup)
      .catch((err) => setAuthError(err.message))
      .finally(() => setIsAuthLoading(false));
  }

  function handleRegister({ email, password, name }) {
    setIsAuthLoading(true);
    setAuthError('');

    mainApi
      .signup({ email, password, name })
      .then(() => openPopup(POPUP.SUCCESS))
      .catch((err) => setAuthError(err.message))
      .finally(() => setIsAuthLoading(false));
  }

  function handleSignOut() {
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    setCurrentUser(null);
    setSavedArticles([]);
    setMenuOpenPath(null);
    history.push('/');
  }

  function handleSaveClick(article) {
    if (!isLoggedIn) {
      openPopup(POPUP.REGISTER);
      return;
    }

    const token = readToken();
    const alreadySaved = savedArticles.find((saved) => saved.link === article.link);

    const request = alreadySaved
      ? mainApi
        .deleteArticle(alreadySaved._id, token)
        .then(() => setSavedArticles((articles) => articles.filter((saved) => saved._id !== alreadySaved._id)))
      : mainApi
        .saveArticle(
          {
            ...article,
            text: article.text || FALLBACK_TEXT,
            source: article.source || FALLBACK_SOURCE,
            image: article.image || FALLBACK_IMAGE_URL,
          },
          token,
        )
        .then((savedArticle) => setSavedArticles((articles) => [...articles, savedArticle]));

    request.catch(() => openPopup(POPUP.ERROR));
  }

  function handleDeleteClick(article) {
    mainApi
      .deleteArticle(article._id, readToken())
      .then(() => setSavedArticles((articles) => articles.filter((saved) => saved._id !== article._id)))
      .catch(() => openPopup(POPUP.ERROR));
  }

  return (
    <CurrentUserContext.Provider value={currentUser || {}}>
      <div className="page">
        <Header
          theme={isSavedPage ? 'light' : 'hero'}
          isLoggedIn={isLoggedIn}
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setMenuOpenPath(isMenuOpen ? null : location.pathname)}
          onSignInClick={openLoginPopup}
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
          <ProtectedRoute
            path="/saved-news"
            component={SavedNews}
            isLoggedIn={isLoggedIn}
            isCheckingAuth={isCheckingAuth}
            onUnauthorized={openLoginPopup}
            articles={savedArticles}
            onDeleteClick={handleDeleteClick}
          />
        </Switch>
        <Footer />
        <Login
          isOpen={activePopup === POPUP.LOGIN}
          onClose={closePopup}
          onSubmit={handleLogin}
          onSwitchClick={() => openPopup(POPUP.REGISTER)}
          errorMessage={authError}
          isLoading={isAuthLoading}
        />
        <Register
          isOpen={activePopup === POPUP.REGISTER}
          onClose={closePopup}
          onSubmit={handleRegister}
          onSwitchClick={() => openPopup(POPUP.LOGIN)}
          errorMessage={authError}
          isLoading={isAuthLoading}
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
            onClick={openLoginPopup}
          >
            Entrar
          </button>
        </Popup>
        <Popup
          name="error"
          isOpen={activePopup === POPUP.ERROR}
          onClose={closePopup}
          title={MESSAGE_ACTION_ERROR}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
