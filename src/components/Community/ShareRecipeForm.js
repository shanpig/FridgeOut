import { mainContentConfig } from '../../variables';
import RecipeForm from './RecipeForm';
import styled from 'styled-components';
import { post } from '../../utils/firebase';
import { useSelector } from 'react-redux';
import { Animated } from 'react-animated-css';

export default function ShareRecipeForm() {
  const user = useSelector((state) => state.user_info);
  function postRecipe(recipe) {
    const postData = {
      type: 'share',
      by: user.name,
      id: user.id,
      recipe,
      profile_image: user.profile,
    };
    post(postData);
  }

  return (
    <Main>
      <Animated>
        <RecipeForm
          formTitle="分享食譜"
          submit={(recipe) => postRecipe(recipe)}
        />
      </Animated>
    </Main>
  );
}

const Main = styled.main`
  position: relative;
`;
