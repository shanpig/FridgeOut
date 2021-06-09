import RecipeForm from './RecipeForm';
import GoBackButton from '../common/GoBackButton';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { sendMessageTo } from '../../utils/firebase';

export default function RecommendForm() {
  const queryPost = useSelector(
    (state) => state.user_info.recommend_post_holder
  );

  function sendRecipeTo(userId, recipe) {
    const message = {
      from: queryPost.by,
      recipe,
      type: 'recommendation',
    };
    sendMessageTo(userId, message);
  }

  return (
    <Main>
      {/* <GoBackButton></GoBackButton> */}
      <MainContent>
        {/* <LeftoverList>
          {queryPost.ingredients &&
            queryPost.ingredients.map((leftover) => (
              <li>{leftover.ingredient_name}</li>
            ))}
        </LeftoverList> */}
        <RecipeForm
          submit={(recipe) => sendRecipeTo(queryPost.id, recipe)}
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

const LeftoverList = styled.ul``;
const MainContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;
