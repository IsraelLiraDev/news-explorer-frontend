import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import { getArticlesCountText, getKeywordsText } from '../../utils/articleHelpers';
import './SavedNews.css';

function SavedNews({ articles, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="saved-news">
      <SavedNewsHeader
        userName={currentUser.name}
        countText={getArticlesCountText(articles.length)}
        keywordsText={getKeywordsText(articles)}
      />
      <NewsCardList variant="saved" articles={articles} onDeleteClick={onDeleteClick} />
    </main>
  );
}

export default SavedNews;
