import RecipeForm from './RecipeForm';
import GoBackButton from '../common/GoBackButton';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { sendMessageTo } from '../../utils/firebase';

export default function RecommendForm() {
  const queryPost = useSelector(
    (state) => state.user_info.recommend_post_holder
  );
  console.log(queryPost);

  const { name } = useSelector((state) => state.user_info);

  function sendRecipeTo(userId, recipe) {
    const message = {
      from: name,
      recipe,
      type: 'recommendation',
    };
    sendMessageTo(userId, message);
  }

  return (
    <Main>
      {/* <GoBackButton></GoBackButton> */}
      <MainContent>
        <RecipeForm
          formTitle="推薦食譜"
          submit={(recipe) => sendRecipeTo(queryPost.id, recipe)}
          defaultIngredients={
            queryPost.ingredients &&
            queryPost.ingredients.map(
              ({
                ingredient_name: name,
                ingredient_amount: amount,
                ingredient_unit: unit,
              }) => `${name} ${amount} ${unit}`
            )
          }
        ></RecipeForm>
      </MainContent>
    </Main>
  );
}

const Main = styled.main`
  /* padding: 10px; */
  position: relative;

  @media screen and (min-width: 769px) {
    /* padding: 60px 42px; */
  }
`;

const Title = styled.h1`
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 10px;
`;

const LeftoverList = styled.ul``;
const MainContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;
