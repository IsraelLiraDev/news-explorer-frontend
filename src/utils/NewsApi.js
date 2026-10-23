import { MAIN_API_BASE_URL } from './constants';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Erro: ${res.status}`));
}

// Busca notícias da última semana: a API própria consulta a News API no servidor.
export function getNewsByKeyword(keyword) {
  const params = new URLSearchParams({ keyword });

  return fetch(`${MAIN_API_BASE_URL}/search?${params}`).then(checkResponse);
}
