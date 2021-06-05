import { headerConfig, mainContentConfig, theme } from '../../variables';
import {
  Redirect,
  Switch,
  Route,
  NavLink,
  useRouteMatch,
} from 'react-router-dom';
import styled from 'styled-components';
import SmallLogoSrc from '../../images/logo-small.svg';

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
            求食譜
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
  max-width: 400px;
  width: 100%;
  margin: 10px auto;
  padding: 40px 10px 0;
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
  max-width: 600px;
  width: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: space-evenly;
  /* align-items: stretch; */

  position: fixed;
  /* box-shadow: 0 1px 10px -5px gray; */
  z-index: 10;
  top: calc(${headerConfig.computer_height} + 10px);
  left: 0;
  right: 0;

  margin: 0 auto;
  height: 30px;
`;

const ButtonGroupSpacer = styled.div`
  height: 40px;
`;

const Tab = styled(NavLink)`
  width: 40%;
  letter-spacing: 10px;
  text-indent: 10px;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 50px;
  background-color: ${theme.darkbrown};
  display: flex;
  align-items: center;
  justify-content: center;
  /* transform: scale(0.8); */
  transition: all ease 0.3s;

  &:not(.active):hover {
    width: 50%;
  }

  &.active {
    color: ${theme.darkbrown};
    /* color: white; */
    /* flex-grow: 3; */
    /* transform: scale(1); */
    background-color: white;

    &::after {
      display: unset;
    }
    /* background-color: white; */
  }
`;

const PostQuery = styled(Tab)`
  /* border-radius: 5px 0 0 5px; */
`;

const PostRecipe = styled(Tab)`
  /* border-radius: 0 5px 5px 0; */
`;
