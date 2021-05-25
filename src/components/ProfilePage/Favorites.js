import { useSelector } from 'react-redux';

export default function Favorites() {
  const favorites = useSelector((state) => state.user_info.my_favorites);

  return (
    <ul>
      {favorites.map((recipe) => (
        <li>{recipe}</li>
      ))}
    </ul>
  );
}
