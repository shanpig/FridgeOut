import styled from 'styled-components';
import { theme } from '../../variables';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { signInWithPopup, getUserData, logOut } from '../../utils/firebase';
import { setUser, signOutUser } from '../../redux/reducers/user/userActions';
import { FiLogOut } from 'react-icons/fi';
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
      <Card>
        <ProfileRow>
          <ProfileImage src={profile} />
          <Col>
            <UserName>{name}</UserName>
            <Statistics>
              <KitchenCount>
                <span>{myKitchen.length}</span>廚房的菜單
              </KitchenCount>
              <FavoriteCount>
                <span>{myFavorites.length}</span>收藏的食譜
              </FavoriteCount>
            </Statistics>
          </Col>
        </ProfileRow>
        <NavRow>
          <NavItem activeClassName="active" to={`${match.url}/fridge`}>
            我的冰箱
          </NavItem>
          <NavItem activeClassName="active" to={`${match.url}/kitchen`}>
            我的廚房
          </NavItem>
          <NavItem activeClassName="active" to={`${match.url}/favorites`}>
            食譜收藏
          </NavItem>
          <NavItem activeClassName="active" to={`${match.url}/messages`}>
            我的訊息
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
        <Logout onClick={() => signOut()}>
          登出
          <LogoutButton />
        </Logout>
      </Card>
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
  padding-bottom: 20px;
  /* background-color: white; */
  background-color: #ffe6c2;

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

const Col = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  gap: 15px 0;
`;

const ProfileRow = styled(Row)`
  /* background-image: url('https://picsum.photos/400/150');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat; */
  justify-content: flex-start;
  background-color: #ffe6c2;
  align-items: center;
  gap: 0 30px;
  padding: 20px 30px;
  height: 150px;
  position: relative;
  /* margin-bottom: 50px; */

  @media screen and (min-width: 769px) {
    border-radius: 5px 5px 0 0;
    height: 200px;
  }
  /* margin-left: 40px;
  margin-bottom: 30px;
  padding: 20px 30px 20px 60px;
  width: fit-content;
  background-color: white;
  
  
  font-size: 1.3em; */
`;
const ProfileImage = styled.img`
  width: 100px;
  height: 100px;

  background: white;
  object-fit: contain;
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
  font-weight: bold;
  font-family: 'Roboto';
  font-size: 1.8em;
`;

const NavRow = styled(Row)`
  justify-content: flex-start;
  align-items: center;
  /* gap: 5px; */
  /* background-color: rgba(255, 255, 255, 0.8); */
  min-height: 50px;
  padding: 0 20px;
  background-color: #fcfcfc;
  flex-wrap: wrap;
`;

const NavItem = styled(Link)`
  /* color: black; */
  text-decoration: none;
  padding: 10px 5px 5px;
  height: 100%;
  line-height: 1;
  position: relative;
  color: ${theme.darkbrown};

  &:hover {
    background-color: #f0f0f0;
  }

  &::after {
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
  }

  &.active {
    /* background-color: #f0f0f0; */
    &::after {
      width: 80%;
    }
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
  /* display: none; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px 0;
  /* @media screen and (min-width: 769px) {
    flex: 1 1;
    border-radius: 5px;
    justify-content: space-evenly;
    background-color: rgba(255, 255, 255, 0.9);
  } */
`;

const StatisticsCount = styled.div`
  flex-grow: 1;
  height: 60%;
  display: flex;
  align-items: baseline;
  gap: 0 8px;
  font-size: 0.8em;
  color: #9f8e7f;
  justify-content: space-between;

  & span {
    font-size: 1.8em;
    font-family: 'Roboto';
    font-weight: bold;
    color: ${theme.darkbrown};
    /* text-shadow: 1px 1px black; */
  }
`;

const KitchenCount = styled(StatisticsCount)``;
const FavoriteCount = styled(StatisticsCount)``;

const UserEmail = styled.div``;

const Logout = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
  gap: 5px;
  color: red;
  cursor: pointer;
`;

const LogoutButton = styled(FiLogOut)`
  stroke: red;
`;
