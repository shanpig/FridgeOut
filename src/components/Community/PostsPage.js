import { headerConfig, footerConfig, theme } from '../../variables';
import {
  Redirect,
  Switch,
  Route,
  Link,
  NavLink,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import { Animated } from 'react-animated-css';
import styled from 'styled-components';
import './popupStyles.css';

import Posts from './Posts';
import { GoPrimitiveDot } from 'react-icons/go';
import { BsPencilSquare } from 'react-icons/bs';
import { useEffect, useState } from 'react';

export default function PostsPage() {
  const match = useRouteMatch();
  const history = useHistory();
  const [tab, setTab] = useState('query');

  useEffect(() => {
    const newTab = history.location.pathname.split('/')[2];
    console.log(newTab);
    setTab(newTab);
  }, [history.location.pathname]);

  return (
    <Main>
      <MainContent>
        <Animated style={{ zIndex: 100 }}>
          <ButtonGroup>
            <PostQuery activeClassName="active" to={`${match.url}/query`}>
              求食譜
            </PostQuery>
            <PostRecipe activeClassName="active" to={`${match.url}/share`}>
              分享食譜
            </PostRecipe>
            <WritePostButton to={`/form/${tab}`} tab={tab}>
              <WritePostIcon />
            </WritePostButton>
          </ButtonGroup>
        </Animated>
        <ButtonGroupSpacer />
        <Switch>
          <Route path={`${match.url}/query`}>
            <Posts category="query" />
          </Route>
          <Route path={`${match.url}/share`}>
            <Posts category="share" />
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
  max-width: 1024px;
  width: 100%;
  padding: 40px 30px 0;
  display: flex;
  position: relative;

  min-height: calc(100vh - ${headerConfig.mobile_height});
  flex-direction: column;

  @media screen and (min-width: 769px) {
    margin: 0px auto;
  }
`;

const EndSign = styled(GoPrimitiveDot)`
  color: gray;
  align-self: center;
  margin: 10px 0;
`;

const ButtonGroup = styled.div`
  max-width: 400px;
  width: 90%;
  padding: 5px;
  display: flex;
  border-radius: 30px;
  justify-content: space-between;

  position: fixed;
  z-index: 100;
  top: calc(${headerConfig.computer_height} + 30px);
  background-color: rgba(255, 255, 255, 0.9);
  left: 0;
  right: 0;

  margin: 0 auto;
`;

const ButtonGroupSpacer = styled.div`
  height: 100px;
`;

const WritePostIcon = styled(BsPencilSquare)`
  width: 50%;
  height: 50%;
  fill: ${theme.darkbrown};
`;

const WritePostButton = styled(Link)`
  display: block;
  width: 60px;
  height: 60px;
  position: absolute;
  cursor: pointer;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  box-shadow: 1px 1px 4px gray;
  bottom: calc(${footerConfig.mobile_height} + 10px);
  display: flex;
  border: 5px solid rgba(255, 255, 255, 0.8);
  justify-content: center;
  align-items: center;
  background-color: ${theme.lightOrange};
  border-radius: 50%;

  &:hover {
    background-color: ${theme.darkbrown};
    &::after {
      opacity: 0;
    }
    & ${WritePostIcon} {
      fill: white;
    }
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    z-index: -100;
    transform-origin: right;
    transform: translateX(-50%)
      ${(props) => (props.tab === 'query' ? 'rotateZ(0)' : 'rotateZ(180deg)')};
    height: 20px;
    background-color: ${theme.lightOrange};
    clip-path: polygon(20% 50%, 60% 0, 100% 0, 100% 100%, 60% 100%);

    transition: transform 0.3s ease;
  }

  @media screen and (min-width: 769px) {
    bottom: 10px;
  }
`;

const Tab = styled(NavLink)`
  width: 45%;
  letter-spacing: 10px;
  white-space: nowrap;
  text-indent: 10px;
  color: ${theme.darkbrown};
  text-align: center;
  text-decoration: none;
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: center;
  transition: all ease 0.3s;

  &:hover,
  &.active {
    color: white;
    background-color: ${theme.darkbrown};

    &::after {
      display: unset;
    }
  }
`;

const PostQuery = styled(Tab)`
  border-radius: 30px 0 0 30px;
`;

const PostRecipe = styled(Tab)`
  border-radius: 0 30px 30px 0;
`;
