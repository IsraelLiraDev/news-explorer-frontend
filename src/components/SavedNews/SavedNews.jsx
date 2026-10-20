import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import { getArticlesCountText, getKeywordsText } from '../../utils/articleHelpers';
import './SavedNews.css';

function SavedNews({ userName, articles, onDeleteClick }) {
  return (
    <main className="saved-news">
      <SavedNewsHeader
        userName={userName || 'Elise'}
        countText={getArticlesCountText(articles.length)}
        keywordsText={getKeywordsText(articles)}
      />
      <NewsCardList variant="saved" articles={articles} onDeleteClick={onDeleteClick} />
    </main>
  );
}

export default SavedNews;
