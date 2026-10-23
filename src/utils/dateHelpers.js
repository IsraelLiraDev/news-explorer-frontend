// Converte uma data ISO para o formato do design, ex.: "19 de fevereiro de 2019".
export function formatArticleDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
