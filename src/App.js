import './App.css';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const d = useDispatch();
  const search_keywords = useSelector((state) => state.search_keywords);
  const leftOvers = useSelector((state) => state.user_info.left_overs);
  return (
    <div>
      <h2>hello</h2>

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
