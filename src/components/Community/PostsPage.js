import { theme } from '../../variables';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Posts from './Posts';
import { GoPrimitiveDot } from 'react-icons/go';

export default function PostsPage() {
  return (
    <Main>
      <MainContent>
        <ButtonGroup>
          <PostQuery to='/form/query'>剩食求解</PostQuery>
          <PostRecipe to='/form/share'>分享食譜</PostRecipe>
        </ButtonGroup>
        <Posts></Posts>
        <EndSign />
      </MainContent>
    </Main>
  );
}

const Main = styled.main`
  /* background-color: lightgray; */
  @media screen and (min-width: 769px) {
    background-color: ${theme.lighterOrange};
  }
`;

const MainContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  position: relative;
  min-height: 100vh;
  flex-direction: column;
`;

const EndSign = styled(GoPrimitiveDot)`
  color: gray;
  align-self: center;
  margin: 10px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  margin: 5px 0;
  height: 50px;
  padding: 7px 0;
  top: 0;
  left: 0;
  right: 0;
`;

const PostQuery = styled(Link)`
  flex-grow: 1;
  text-align: center;
`;

const PostRecipe = styled(Link)`
  flex-grow: 1;
  text-align: center;
  border-left: 1px solid lightgray;
`;
