const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

// Converte uma data ISO para o formato do design, ex.: "19 de fevereiro de 2019".
export function formatArticleDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Retorna a data de N dias atrás no formato AAAA-MM-DD (parâmetro `from` da News API).
export function getDateDaysAgo(days) {
  return new Date(Date.now() - days * MILLISECONDS_PER_DAY).toISOString().slice(0, 10);
}

export function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}
