import { theme } from '../../variables';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import RecipeItem from '../SearchPage/RecipeItem';
import { GrFormTrash } from 'react-icons/gr';
import { removeFromKitchen } from '../../redux/reducers/user/userActions';
import { Animated } from 'react-animated-css';
import EmptyMessage from './EmptyMessage';

export default function Kitchen() {
  const kitchen = useSelector((state) => {
    const userInfo = state.user_info;
    return userInfo.my_kitchen;
  });

  return (
    <KitchenContent>
      {kitchen.length === 0 ? (
        <EmptyMessage text={'廚房裡面沒有食譜唷~'} />
      ) : (
        kitchen.map((recipe, i) => (
          <Animated
            key={i}
            animationIn="fadeInUp"
            animationInDelay={(i - 1) * 100}
          >
            <Recipe
              recipe={recipe}
              Button={RemoveButton}
              buttonAction={() => removeFromKitchen(recipe)}
            />
          </Animated>
        ))
      )}
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
  min-width: 25px;
  font-size: 25px;
  margin-left: auto;
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
    & path {
      stroke: red;
    }
  }
`;
