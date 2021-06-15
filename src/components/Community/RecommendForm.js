import RecipeForm from './RecipeForm';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { sendMessageTo } from '../../utils/firebase';
import { Animated } from 'react-animated-css';

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
      <MainContent>
        <Animated>
          <RecipeForm
            formTitle="推薦食譜"
            submit={(recipe) => sendRecipeTo(queryPost.id, recipe)}
            defaultIngredients={queryPost.ingredients}
          />
        </Animated>
      </MainContent>
    </Main>
  );
}

const Main = styled.main`
  position: relative;
`;

const MainContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;
