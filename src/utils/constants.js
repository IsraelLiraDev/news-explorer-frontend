// Endereço da News API. Em desenvolvimento a chave gratuita só funciona a partir do localhost.
// Em produção (build) usa o proxy da TripleTen.
export const NEWS_API_DEV_URL = 'https://newsapi.org/v2';
export const NEWS_API_PROXY_URL = 'https://nomoreparties.co/news/v2';
export const NEWS_API_BASE_URL = import.meta.env.PROD ? NEWS_API_PROXY_URL : NEWS_API_DEV_URL;
export const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const SEARCH_DAYS_RANGE = 7;
export const SEARCH_PAGE_SIZE = 100;
export const CARDS_PER_PAGE = 3;
export const MAX_KEYWORDS_SHOWN = 3;

export const STORAGE_KEY_ARTICLES = 'newsExplorerArticles';
export const STORAGE_KEY_KEYWORD = 'newsExplorerKeyword';
export const STORAGE_KEY_TOKEN = 'jwt';

export const SEARCH_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  EMPTY: 'empty',
  ERROR: 'error',
};

export const POPUP = {
  LOGIN: 'login',
  REGISTER: 'register',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const MESSAGE_EMPTY_KEYWORD = 'Por favor, insira uma palavra-chave';
export const MESSAGE_NOT_FOUND_TITLE = 'Nada encontrado';
export const MESSAGE_NOT_FOUND_TEXT = 'Desculpe, mas nada corresponde aos seus termos de pesquisa.';
export const MESSAGE_SEARCHING = 'Procurando notícias...';
export const MESSAGE_REQUEST_ERROR = 'Desculpe, algo deu errado durante a solicitação. Pode haver um problema de conexão ou o servidor pode estar inativo. Por favor, tente novamente mais tarde.';
export const MESSAGE_SIGN_IN_TO_SAVE = 'Faça o login para salvar os artigos.';
export const MESSAGE_REMOVE_FROM_SAVED = 'Remover dos salvos';

// Links do rodapé (ajustar para os seus perfis)
export const LINK_PRACTICUM = 'https://tripleten.com';
export const LINK_GITHUB = 'https://github.com';
export const LINK_FACEBOOK = 'https://facebook.com';

// Endereço da API própria (back-end da Fase 2).
export const MAIN_API_DEV_URL = 'http://localhost:3000';
export const MAIN_API_PROD_URL = 'https://api-israel-news.duckdns.org';
export const MAIN_API_BASE_URL = import.meta.env.PROD ? MAIN_API_PROD_URL : MAIN_API_DEV_URL;

// A API exige imagem, texto e fonte; usados quando a notícia vem sem esses campos.
export const FALLBACK_IMAGE_URL = 'https://placehold.co/400x272/e6e8eb/b6bcbf.png?text=Sem+imagem';
export const FALLBACK_TEXT = 'Sem descrição disponível.';
export const FALLBACK_SOURCE = 'Fonte desconhecida';

export const MESSAGE_ACTION_ERROR = 'Não foi possível concluir a ação. Tente novamente mais tarde.';
export const MESSAGE_SERVER_UNAVAILABLE = 'Servidor indisponível. Tente novamente mais tarde.';
