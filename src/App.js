import './App.css';
import {
  addSearchKeyword,
  removeSearchKeyword,
} from './redux/search/searchActions';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const d = useDispatch();
  const search_keywords = useSelector((state) => state);
  return (
    <div>
      <h2>hello</h2>
      <button
        onClick={() =>
          d(
            addSearchKeyword({
              ingredient_name: '培根',
              ingredient_amount: 2,
              ingredient_unit: '條',
            })
          )
        }>
        push me to add 2 bacon
      </button>
      <button onClick={() => d(removeSearchKeyword('培根'))}>
        remove bacons
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
