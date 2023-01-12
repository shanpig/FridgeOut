import { GrFormTrash } from 'react-icons/gr';

import { theme } from '../../variables';

import RecipeItem from '../common/RecipeItem';
import EmptyMessage from './EmptyMessage';

import { useSelector } from 'react-redux';
import { removeFromKitchen } from '../../redux/reducers/user/userActions';

import styled from 'styled-components';
import { Animated } from 'react-animated-css';

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
  transition: all ease 0.3s;

  &:hover {
    transform: translate(-2px, -5px);
    box-shadow: 1px 3px 4px lightgray;
    border-right: 10px solid ${theme.darkbrown};
  }
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
