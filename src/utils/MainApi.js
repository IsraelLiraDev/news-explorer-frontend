import { MAIN_API_BASE_URL, MESSAGE_SERVER_UNAVAILABLE } from './constants';

// Devolve o JSON em caso de sucesso; em caso de erro rejeita com a mensagem da API.
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res
    .json()
    .catch(() => ({}))
    .then((body) => Promise.reject(new Error(body.message || `Erro: ${res.status}`)));
}

function request(path, options = {}) {
  return fetch(`${MAIN_API_BASE_URL}${path}`, options)
    .catch(() => Promise.reject(new Error(MESSAGE_SERVER_UNAVAILABLE)))
    .then(checkResponse);
}

function getHeaders(token) {
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export function signup({ email, password, name }) {
  return request('/signup', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, password, name }),
  });
}

export function signin({ email, password }) {
  return request('/signin', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
}

export function getUser(token) {
  return request('/users/me', { headers: getHeaders(token) });
}

export function getArticles(token) {
  return request('/articles', { headers: getHeaders(token) });
}

export function saveArticle(article, token) {
  const {
    keyword, title, text, date, source, link, image,
  } = article;

  return request('/articles', {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({
      keyword, title, text, date, source, link, image,
    }),
  });
}

export function deleteArticle(articleId, token) {
  return request(`/articles/${articleId}`, {
    method: 'DELETE',
    headers: getHeaders(token),
  });
}
