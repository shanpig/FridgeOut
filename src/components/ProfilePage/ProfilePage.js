import { FiLogOut } from 'react-icons/fi';
import { CgSmartHomeRefrigerator } from 'react-icons/cg';
import { GiCook } from 'react-icons/gi';
import { RiNewspaperFill, RiMessage2Fill } from 'react-icons/ri';

import { theme } from '../../variables';

import Fridge from './Fridge';
import Kitchen from './Kitchen';
import Messages from './Messages';
import Favorites from './Favorites';

import {
  useRouteMatch,
  useHistory,
  Switch,
  Redirect,
  Route,
  NavLink as Link,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../../redux/reducers/user/userActions';

import styled from 'styled-components';
import { Animated } from 'react-animated-css';

import { logOut } from '../../utils/firebase';

export default function ProfilePage() {
  const d = useDispatch();
  const history = useHistory();

  const {
    identity,
    name,
    profile,
    my_favorites: myFavorites,
    my_kitchen: myKitchen,
  } = useSelector((state) => state.user_info);

  let match = useRouteMatch();

  function signOut() {
    logOut().then(() => {
      window.localStorage.removeItem('fridgeoutid');
      d(signOutUser());
      history.push('/');
    });
  }

  if (identity === 'none') {
    // history.push('/login');
    return <Redirect to="/login"></Redirect>;
  }
  return (
    <Main>
      <Animated animationInDuration={500}>
        <Card>
          <ProfileRow>
            <ProfileImage src={profile} />
            <ProfileInfo>
              <UserName>{name}</UserName>
              <Statistics>
                <KitchenCount>
                  <span>{myKitchen.length}</span>
                  <p>廚房的菜單</p>
                </KitchenCount>
                <FavoriteCount>
                  <span>{myFavorites.length}</span>
                  <p>收藏的食譜</p>
                </FavoriteCount>
              </Statistics>
            </ProfileInfo>
          </ProfileRow>
          <NavRow>
            <NavItem activeClassName="active" to={`${match.url}/fridge`}>
              <FridgeIcon /> <span>我的冰箱</span>
            </NavItem>
            <NavItem activeClassName="active" to={`${match.url}/kitchen`}>
              <KitchenIcon />
              <span>我的廚房</span>
            </NavItem>
            <NavItem activeClassName="active" to={`${match.url}/favorites`}>
              <FavoriteIcon />
              <span>食譜收藏</span>
            </NavItem>
            <NavItem activeClassName="active" to={`${match.url}/messages`}>
              <MessageIcon /> <span>我的訊息</span>
            </NavItem>
          </NavRow>
          <ContentRow>
            <MainContent>
              <Switch>
                <Route path={`${match.url}/kitchen`}>
                  <Kitchen />
                </Route>
                <Route path={`${match.url}/favorites`}>
                  <Favorites />
                </Route>
                <Route path={`${match.url}/messages`}>
                  <Messages />
                </Route>
                <Route path={`${match.url}/`}>
                  <Redirect to={`${match.url}/fridge`} />
                  <Fridge />
                </Route>
              </Switch>
            </MainContent>
          </ContentRow>
          <Row>
            <Logout onClick={() => signOut()}>
              登出
              <LogoutButton />
            </Logout>
          </Row>
        </Card>
      </Animated>
    </Main>
  );
}
const Main = styled.main`
  position: relative;
  @media screen and (min-width: 769px) {
    padding: 20px 0;
    margin: 50px 42px 0;
    padding-bottom: 30px;
  }
`;

const Card = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #fcfcfc;

  @media screen and (min-width: 769px) {
    border-radius: 5px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: space-between;
  padding: 5px 0;
  width: 100%;
`;

const ProfileInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
  gap: 15px 0;
`;

const ProfileRow = styled(Row)`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 0 30px;
  padding-top: 100px;
  position: relative;
  margin-top: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100px;
    right: -100px;
    height: 300px;
    border-radius: 50%;
    margin-top: -130px;
    z-index: 1;
    background-color: ${theme.darkbrown};
  }

  @media screen and (min-width: 769px) {
    border-radius: 5px 5px 0 0;
    padding-bottom: 20px;
  }
`;
const ProfileImage = styled.img`
  width: 125px;
  height: 125px;
  border: 5px solid white;
  background: white;
  object-fit: contain;
  z-index: 20;
  border-radius: 50%;
`;

const UserName = styled.div`
  color: ${theme.darkbrown};
  text-align: center;
  font-weight: bold;
  font-family: 'Roboto';
  font-size: 1.8em;
`;

const NavRow = styled(Row)`
  justify-content: center;
  align-items: center;
  min-height: 50px;
  padding: 10px 0 20px;
  gap: 15px;
  flex-wrap: wrap;

  @media screen and (min-width: 769px) {
    padding: 20px 0;
    margin-top: 20px;
  }
`;

const NavItem = styled(Link)`
  text-decoration: none;
  padding: 7px 10px;
  height: 100%;
  line-height: 1;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0 5px;
  border-radius: 20px;
  background-color: #ececec;

  & span {
    white-space: nowrap;
    width: 63px;
    transition: width 0.2s linear;
    color: white;
    overflow: hidden;
  }

  &:not(.active) span {
    width: 0;
  }

  &.active,
  &:hover {
    background-color: ${theme.darkbrown};

    & svg:first-child > path {
      fill: white;
    }
    & svg {
      fill: white;
    }
  }

  @media screen and (min-width: 769px) {
    &:not(.active):hover span {
      color: white;
    }
    &:not(.active) span {
      color: ${theme.darkbrown};
    }

    &.active span,
    &:not(.active) span {
      width: 64px;
    }
  }
`;

const FridgeIcon = styled(CgSmartHomeRefrigerator)`
  font-size: 20px;

  & path {
    fill: ${theme.darkbrown};
  }

  @media screen and (min-width: 769px) {
    font-size: 25px;
  }
`;
const KitchenIcon = styled(GiCook)`
  font-size: 20px;
  fill: ${theme.darkbrown};

  @media screen and (min-width: 769px) {
    font-size: 25px;
  }
`;
const FavoriteIcon = styled(RiNewspaperFill)`
  font-size: 20px;
  fill: ${theme.darkbrown};

  @media screen and (min-width: 769px) {
    font-size: 25px;
  }
`;
const MessageIcon = styled(RiMessage2Fill)`
  font-size: 20px;
  fill: ${theme.darkbrown};

  @media screen and (min-width: 769px) {
    font-size: 25px;
  }
`;

const ContentRow = styled(Row)`
  margin: 0;
  gap: 0 20px;
  flex-wrap: nowrap;
  padding: 20px;
  background-color: #ffe6c2;
`;

const MainContent = styled.div`
  flex-grow: 3;
  flex-shrink: 1;
`;

const Statistics = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  z-index: 20;
  justify-content: space-evenly;
  background-color: #ffe6c2;

  @media screen and (min-width: 769px) {
    background-color: transparent;
    justify-content: center;
    gap: 5px 220px;
    margin-top: -170px;
  }
`;

const StatisticsCount = styled.div`
  aspect-ratio: 1;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  font-size: 0.8em;
  border-radius: 20px;
  padding: 0 10px;

  & span {
    font-size: 3em;
    font-family: 'Roboto';
    font-weight: bold;
    color: ${theme.darkbrown};
  }

  & p {
    font-size: 1.1em;
    line-height: 1.3;
    text-align: center;
    letter-spacing: 1px;
    white-space: nowrap;
    color: #cf831b;
  }

  @media screen and (min-width: 769px) {
    background-color: #ffe6c2;
    border: 3px solid white;
    & span {
      font-size: 2em;
    }
  }
`;

const KitchenCount = styled(StatisticsCount)``;
const FavoriteCount = styled(StatisticsCount)``;

const Logout = styled.button`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 20px;
  gap: 5px;
  color: red;
  cursor: pointer;
  transform-origin: right;

  &:hover {
    transform: scale(1.2);
  }
`;

const LogoutButton = styled(FiLogOut)`
  stroke: red;
`;
