import {
  NEWS_API_BASE_URL,
  NEWS_API_KEY,
  SEARCH_DAYS_RANGE,
  SEARCH_PAGE_SIZE,
} from './constants';
import { getDateDaysAgo, getTodayDate } from './dateHelpers';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Erro: ${res.status}`));
}

// Busca notícias da última semana que contenham a palavra-chave.
export function getNewsByKeyword(keyword) {
  const params = new URLSearchParams({
    q: keyword,
    apiKey: NEWS_API_KEY,
    from: getDateDaysAgo(SEARCH_DAYS_RANGE),
    to: getTodayDate(),
    pageSize: SEARCH_PAGE_SIZE,
  });

  return fetch(`${NEWS_API_BASE_URL}/everything?${params}`).then(checkResponse);
}
