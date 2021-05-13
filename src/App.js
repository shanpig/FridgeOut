import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorite } from './redux/reducers/user/userActions';

function App() {
  const d = useDispatch();
  const search_keywords = useSelector((state) => state.search_keywords);
  return (
    <div>
      <h2>hello</h2>
      <button onClick={() => d(addToFavorite('12345'))}>
        click to add favorite
      </button>
      <div>
        {search_keywords.map((keyword, i) => (
          <p key={i}>{Object.values(keyword).join(' ')}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
