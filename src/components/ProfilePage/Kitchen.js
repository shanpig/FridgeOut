import { useSelector } from 'react-redux';

export default function Kitchen() {
  const kitchen = useSelector((state) => state.selected_recipes);

  return (
    <ul>
      {kitchen.map((recipe) => (
        <li>{recipe.title}</li>
      ))}
    </ul>
  );
}
