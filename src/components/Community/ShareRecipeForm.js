import { mainContentConfig } from '../../variables';
import RecipeForm from './RecipeForm';
import styled from 'styled-components';
import GoBackButton from '../common/GoBackButton';
import { post } from '../../utils/firebase';
import { useSelector } from 'react-redux';
import { Animated } from 'react-animated-css';

export default function ShareRecipeForm() {
  const user = useSelector((state) => state.user_info);
  function postRecipe(recipe) {
    console.log('recipe: ', recipe);
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
      {/* <GoBackButton></GoBackButton> */}
      <Animated>
        <RecipeForm
          formTitle="分享食譜"
          submit={(recipe) => postRecipe(recipe)}
        ></RecipeForm>
      </Animated>
    </Main>
  );
}

const Main = styled.main`
  /* padding: 10px; */
  position: relative;

  @media screen and (min-width: 769px) {
    /* height: calc(${mainContentConfig.computer_height} - 60px); */
  }
`;
