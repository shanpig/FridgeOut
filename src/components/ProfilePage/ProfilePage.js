import styled from 'styled-components';
import { theme } from '../../variables';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { signInWithPopup, getUserData, logOut } from '../../utils/firebase';
import { setUser, signOutUser } from '../../redux/reducers/user/userActions';
import { FiLogOut } from 'react-icons/fi';
import { CgSmartHomeRefrigerator } from 'react-icons/cg';
import { GiCook } from 'react-icons/gi';
import { RiNewspaperFill, RiMessage2Fill } from 'react-icons/ri';
import { Animated } from 'react-animated-css';
import Fridge from './Fridge';
import Kitchen from './Kitchen';
import Messages from './Messages';
import Favorites from './Favorites';
import {
  useRouteMatch,
  useParams,
  useHistory,
  Switch,
  Redirect,
  Route,
  NavLink as Link,
} from 'react-router-dom';

export default function ProfilePage() {
  const d = useDispatch();
  const history = useHistory();

  const {
    identity,
    name,
    email,
    profile,
    left_overs: leftOvers,
    my_favorites: myFavorites,
    my_kitchen: myKitchen,
    messages,
  } = useSelector((state) => state.user_info);

  let match = useRouteMatch();

  function signOut() {
    console.log('hi');
    logOut().then(() => {
      d(signOutUser());
    });
  }

  if (identity === 'none') {
    return <Redirect to="/login" />;
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
                  <Kitchen></Kitchen>
                </Route>
                <Route path={`${match.url}/favorites`}>
                  <Favorites></Favorites>
                </Route>
                <Route path={`${match.url}/messages`}>
                  <Messages></Messages>
                </Route>
                <Route path={`${match.url}/`}>
                  <Redirect to={`${match.url}/fridge`} />
                  <Fridge></Fridge>
                </Route>
              </Switch>
            </MainContent>
          </ContentRow>
          <Row>
            <Logout onClick={signOut}>
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
  /* width: 100%; */
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  /* padding-bottom: 20px; */
  overflow: hidden;
  /* background-color: white; */
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
  /* background-image: url('https://picsum.photos/400/150');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat; */
  justify-content: center;
  /* background-color: #ffe6c2; */
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
  /* margin-bottom: 50px; */

  @media screen and (min-width: 769px) {
    border-radius: 5px 5px 0 0;
    padding-bottom: 20px;
  }
  /* margin-left: 40px;
  margin-bottom: 30px;
  padding: 20px 30px 20px 60px;
  width: fit-content;
  background-color: white;
  
  
  font-size: 1.3em; */
`;
const ProfileImage = styled.img`
  width: 125px;
  height: 125px;
  border: 5px solid white;
  background: white;
  object-fit: contain;
  z-index: 20;
  border-radius: 50%;
  /* box-shadow: 2px 1px 7px -5px black; */
  /* position: absolute; */
  /* bottom: 0; */
  /* transform: translate(10px, 60%); */

  /* 
  position: absolute;*/
`;

const UserName = styled.div`
  /* position: absolute; */
  /* bottom: 0;
  transform: translate(80px, calc(60% + 15px)); */
  color: ${theme.darkbrown};
  text-align: center;
  font-weight: bold;
  font-family: 'Roboto';
  font-size: 1.8em;
`;

const NavRow = styled(Row)`
  justify-content: center;
  align-items: center;
  /* gap: 5px; */
  /* background-color: rgba(255, 255, 255, 0.8); */
  min-height: 50px;
  padding: 10px 0 20px;
  gap: 15px;
  /* background-color: #fcfcfc; */
  flex-wrap: wrap;

  @media screen and (min-width: 769px) {
    padding: 20px 0;
    margin-top: 20px;
  }
`;

const NavItem = styled(Link)`
  /* color: black; */
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
    overflow: hidden;
  }

  &:not(.active) span {
    width: 0;
  }
  /* &::after {
    position: absolute;
    content: '';
    left: 50%;
    right: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    transform-origin: center;
    transform: translate(-50%, 0);
    background-color: ${theme.orange};
    transition: width ease 0.2s;
  } */

  &.active,
  &:hover {
    /* background-color: #f0f0f0; */
    /* &::after {
      width: 80%;
    } */
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
  font-size: 25px;

  & path {
    fill: ${theme.darkbrown};
  }
`;
const KitchenIcon = styled(GiCook)`
  font-size: 25px;
  fill: ${theme.darkbrown};
`;
const FavoriteIcon = styled(RiNewspaperFill)`
  font-size: 25px;
  fill: ${theme.darkbrown};
`;
const MessageIcon = styled(RiMessage2Fill)`
  font-size: 25px;
  fill: ${theme.darkbrown};
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
  /* display: none; */
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
    /* flex: 1 1;
    border-radius: 5px;
    justify-content: space-evenly;
    background-color: rgba(255, 255, 255, 0.9); */
  }
`;

const StatisticsCount = styled.div`
  aspect-ratio: 1;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  /* gap: 8px; */
  font-size: 0.8em;
  border-radius: 20px;
  /* border-radius: 50%; */
  /* padding: 20px; */
  padding: 0 10px;

  & span {
    font-size: 3em;
    font-family: 'Roboto';
    font-weight: bold;
    color: ${theme.darkbrown};
    /* text-shadow: 1px 1px black; */
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

const UserEmail = styled.div``;

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
