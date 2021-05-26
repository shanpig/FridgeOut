import { theme } from '../../variables';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import RecipeItem from '../SearchPage/RecipeItem';
import { GrFormTrash } from 'react-icons/gr';
import { removeRecipeFromSelections } from '../../redux/reducers/selection/selectionActions';

export default function Kitchen() {
  const kitchen = useSelector((state) => state.selected_recipes);

  return (
    <KitchenContent>
      {kitchen.map((recipe, i) => (
        <Recipe
          key={i}
          recipe={recipe}
          button={RemoveButton}
          buttonAction={() => removeRecipeFromSelections(recipe.id)}
        />
      ))}
    </KitchenContent>
  );
}

const KitchenContent = styled.ul`
  padding: 0 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Recipe = styled(RecipeItem)`
  border: 1px solid ${theme.orange};
  height: 100px;
`;

const RemoveButton = styled(GrFormTrash)`
  min-width: 18px;
  font-size: 2em;
  margin-left: auto;
  cursor: pointer;
`;
