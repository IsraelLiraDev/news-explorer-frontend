import { MAX_KEYWORDS_SHOWN } from './constants';

// Converte a resposta da News API para o formato usado pelo app e descarta itens incompletos.
export function normalizeArticles(apiArticles, keyword) {
  const seenLinks = new Set();

  return (apiArticles || []).reduce((articles, apiArticle) => {
    if (!apiArticle.title || !apiArticle.url || seenLinks.has(apiArticle.url)) {
      return articles;
    }
    seenLinks.add(apiArticle.url);
    articles.push({
      keyword,
      title: apiArticle.title,
      text: apiArticle.description || '',
      date: apiArticle.publishedAt,
      source: (apiArticle.source && apiArticle.source.name) || '',
      link: apiArticle.url,
      image: apiArticle.urlToImage || '',
    });
    return articles;
  }, []);
}

// Palavras-chave dos artigos salvos, da mais popular para a menos popular.
export function getSortedKeywords(articles) {
  const counts = new Map();
  articles.forEach(({ keyword }) => counts.set(keyword, (counts.get(keyword) || 0) + 1));
  return [...counts.entries()]
    .sort((first, second) => second[1] - first[1])
    .map(([keyword]) => keyword);
}

// Texto da linha "Por palavras-chave": todas, se forem até 3; senão as duas primeiras + "e N outras".
export function getKeywordsText(articles) {
  const keywords = getSortedKeywords(articles);

  if (keywords.length <= MAX_KEYWORDS_SHOWN) {
    return keywords.join(', ');
  }
  const [first, second] = keywords;
  return `${first}, ${second}, e ${keywords.length - 2} outras`;
}

// Palavra no singular/plural conforme a quantidade.
export function getArticlesCountText(count) {
  return count === 1 ? '1 artigo salvo' : `${count} artigos salvos`;
}
