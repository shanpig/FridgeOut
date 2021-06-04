import { headerConfig, mainContentConfig, theme } from '../../variables';
import {
  Redirect,
  Switch,
  Route,
  NavLink,
  useRouteMatch,
} from 'react-router-dom';
import styled from 'styled-components';

import Posts from './Posts';
import { GoPrimitiveDot } from 'react-icons/go';
import { useState } from 'react';

export default function PostsPage() {
  const [tab, setTab] = useState('query');
  const match = useRouteMatch();
  return (
    <Main>
      <MainContent>
        <ButtonGroup>
          <PostQuery activeClassName="active" to={`${match.url}/query`}>
            剩食求解
          </PostQuery>
          <PostRecipe activeClassName="active" to={`${match.url}/share`}>
            分享食譜
          </PostRecipe>
        </ButtonGroup>
        <ButtonGroupSpacer />
        <Switch>
          <Route path={`${match.url}/query`}>
            <Posts category="query"></Posts>
          </Route>
          <Route path={`${match.url}/share`}>
            <Posts category="share"></Posts>
          </Route>
          <Route path={`${match.url}`}>
            <Redirect to={`${match.url}/query`} />
          </Route>
        </Switch>
        <EndSign />
      </MainContent>
    </Main>
  );
}

const Main = styled.main``;

const MainContent = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 10px auto;
  display: flex;
  position: relative;

  min-height: calc(100vh - ${headerConfig.mobile_height});
  flex-direction: column;
`;

const EndSign = styled(GoPrimitiveDot)`
  color: gray;
  align-self: center;
  margin: 10px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
  position: absolute;
  box-shadow: 0 1px 10px -5px gray;
  z-index: 10;
  top: 0;
  /* top: ${headerConfig.computer_height}; */
  left: 0;
  right: 0;

  margin: 0 auto;
  height: 30px;
`;

const ButtonGroupSpacer = styled.div`
  height: 30px;
`;

const Tab = styled(NavLink)`
  flex-grow: 1;
  color: white;
  text-align: center;
  text-decoration: none;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  /* transform: scale(0.8); */
  transition: all ease 0.3s;

  &.active {
    color: black;
    /* flex-grow: 3; */
    /* transform: scale(1); */
    border-bottom: 1px solid white;
    background-color: white;
  }
`;

const PostQuery = styled(Tab)``;

const PostRecipe = styled(Tab)``;
