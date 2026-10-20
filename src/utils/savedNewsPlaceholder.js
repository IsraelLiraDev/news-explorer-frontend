// Artigos de exemplo da página "Artigos salvos" (Fase 1).
// Na Fase 3 esta lista é substituída pelos dados de GET /articles.
import corgiImage from '../images/article-1.jpg';
import boatsImage from '../images/article-2.jpg';
import moosImage from '../images/article-3.jpg';
import skyImage from '../images/article-4.jpg';

const PLACEHOLDER_SAVED_ARTICLES = [
  {
    keyword: 'Natureza',
    title: 'Todo mundo precisa de um "Lugar Especial para Sentar" na natureza',
    text: 'Desde que li o influente livro de Richard Louv, "O Último Filho na Floresta", a ideia de ter um "lugar para sentar" especial me pegou de jeito. Esse conselho, que Louv atribui ao educador da natureza Jon Young, serve tanto para adultos quanto para crianças.',
    date: '2020-11-04',
    source: 'Treehugger',
    link: 'https://example.com/lugar-especial-para-sentar',
    image: corgiImage,
  },
  {
    keyword: 'Natureza',
    title: 'A natureza faz de você uma pessoa melhor',
    text: 'Todos nós sabemos como a natureza nos faz bem. Nós a conhecemos há milênios: o som dos oceanos, os aromas de uma floresta, a forma como a luz do sol dança através das folhas.',
    date: '2019-02-19',
    source: 'National Geographic',
    link: 'https://example.com/natureza-faz-bem',
    image: boatsImage,
  },
  {
    keyword: 'Yellowstone',
    title: 'Grand Teton renova a histórica Crest Trail',
    text: '"A ligação entre as trilhas de Cascade e Death Canyon aconteceu em 1º de outubro de 1933, e marcou o primeiro passo na realização de um plano onde o viajante será...',
    date: '2020-10-19',
    source: 'National Parques Traveler',
    link: 'https://example.com/crest-trail',
    image: moosImage,
  },
  {
    keyword: 'Fotografia',
    title: 'Cientistas não sabem por que Polaris é tão diferente',
    text: 'Os humanos, há muito tempo, confiam no céu estrelado para abrir novas fronteiras, navegar até os confins do mundo e encontrar o caminho de volta para casa.',
    date: '2020-03-16',
    source: 'Treehugger',
    link: 'https://example.com/polaris',
    image: skyImage,
  },
  {
    keyword: 'Parques',
    title: 'Fotos nostálgicas de turistas nos parques nacionais dos EUA',
    text: 'Uri Løvevild Golman e Helle Løvevild Golman são exploradores da National Geographic e fotógrafos de conservação que acabaram de concluir um projeto e livro que consideram uma...',
    date: '2020-10-19',
    source: 'National Geographic',
    link: 'https://example.com/fotos-nostalgicas',
    image: boatsImage,
  },
];

export default PLACEHOLDER_SAVED_ARTICLES;
