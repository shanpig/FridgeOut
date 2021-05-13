import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { setLeftOvers } from './redux/reducers/user/userActions';

const left = [
  {
    ingredient_name: '蛋',
    ingredient_amount: 55,
    ingredient_unit: '粒',
  },
];

function App() {
  const d = useDispatch();
  const search_keywords = useSelector((state) => state.search_keywords);
  const leftOvers = useSelector((state) => state.user_info.left_overs);
  return (
    <div>
      <h2>hello</h2>
      <button onClick={() => d(setLeftOvers(left))}>
        click to remove favorite
      </button>
      <div>
        {search_keywords.map((keyword, i) => (
          <p key={i}>{Object.values(keyword).join(' ')}</p>
        ))}
      </div>
      <ul>
        {leftOvers.map((leftover, i) => (
          <p key={i}>{Object.values(leftover).join(' ')}</p>
        ))}
      </ul>
    </div>
  );
}

export default App;
