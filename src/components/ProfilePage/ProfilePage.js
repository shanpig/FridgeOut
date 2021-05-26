import styled from 'styled-components';
import { theme } from '../../variables';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Fridge from './Fridge';
import Kitchen from './Kitchen';
import Favorites from './Favorites';
import {
  useRouteMatch,
  Switch,
  Route,
  NavLink as Link,
} from 'react-router-dom';

export default function ProfilePage() {
  const {
    name,
    email,
    profile,
    left_overs: leftOvers,
    my_favorites: myFavorites,
    messages,
  } = useSelector((state) => state.user_info);
  const myKitchen = useSelector((state) => state.selected_recipes);
  let match = useRouteMatch();

  return (
    <Main>
      <ProfileRow>
        <ProfileImage src={profile} />
        <UserName>{name}</UserName>
      </ProfileRow>
      <NavRow>
        <NavItem activeClassName='active' to={`${match.url}/fridge`}>
          我的冰箱
        </NavItem>
        <NavItem activeClassName='active' to={`${match.url}/kitchen`}>
          我的廚房
        </NavItem>
        <NavItem activeClassName='active' to={`${match.url}/favorites`}>
          食譜收藏
        </NavItem>
      </NavRow>
      <ContentRow>
        <MainContent>
          <Switch>
            <Route path={`${match.url}/fridge`}>
              <Fridge></Fridge>
            </Route>
            <Route path={`${match.url}/kitchen`}>
              <Kitchen></Kitchen>
            </Route>
            <Route path={`${match.url}/favorites`}>
              <Favorites></Favorites>
            </Route>
          </Switch>
        </MainContent>
        <SideContent>
          <KitchenCount>
            廚房的菜單<span>{myKitchen.length}</span>
          </KitchenCount>
          <FavoriteCount>
            收藏的食譜<span>{myFavorites.length}</span>
          </FavoriteCount>
        </SideContent>
      </ContentRow>
    </Main>
  );
}
const Main = styled.main`
  width: 100%;
  position: relative;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media screen and (min-width: 769px) {
    padding: 50px 42px;
    background-color: ${theme.lighterOrange};
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

const ProfileRow = styled(Row)`
  background-image: url('https://picsum.photos/400/150');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 150px;
  position: relative;
  margin-bottom: 50px;

  /* margin-left: 40px;
  margin-bottom: 30px;
  padding: 20px 30px 20px 60px;
  width: fit-content;
  background-color: white;
  
  
  font-size: 1.3em; */
`;
const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  padding: 2px;
  background: white;
  object-fit: contain;
  border-radius: 50%;
  box-shadow: 2px 1px 7px -5px black;
  position: absolute;
  bottom: 0;
  transform: translate(10px, 60%);

  /* 
  position: absolute;*/
`;

const UserName = styled.div`
  position: absolute;
  bottom: 0;
  transform: translate(80px, calc(60% + 15px));
  font-size: 1.3em;
`;

const NavRow = styled(Row)`
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  background-color: #f6f6f6;
  min-height: 50px;
  padding: 0 20px;
  flex-wrap: wrap;
`;

const NavItem = styled(Link)`
  color: black;
  text-decoration: none;
  padding: 0 10px;
  height: 100%;
  line-height: 50px;
  position: relative;

  &:hover {
    background-color: #f0f0f0;
  }

  &:active {
    color: black;
  }

  &::after {
    position: absolute;
    content: '';
    left: 50%;
    right: 0;
    bottom: 10px;
    width: 0;
    height: 2px;
    transform-origin: center;
    transform: translate(-50%, 0);
    background-color: ${theme.orange};
    transition: width ease 0.2s;
  }

  &.active {
    &::after {
      width: 80%;
    }
  }
`;

const ContentRow = styled(Row)`
  margin: 20px 0;
  gap: 0 20px;
  flex-wrap: nowrap;
`;

const MainContent = styled.div`
  flex-grow: 3;
`;

const SideContent = styled.div`
  display: none;
  @media screen and (min-width: 769px) {
    max-width: 250px;
    min-width: 250px;
    height: 120px;
    flex: 1 1;
    justify-content: space-evenly;
    align-items: center;
    display: flex;
    background-color: white;
  }
`;

const SidebarCount = styled.div`
  flex-grow: 1;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  & span {
    font-size: 2em;
    color: ${theme.orange};
  }
`;

const KitchenCount = styled(SidebarCount)`
  border-right: 1px solid ${theme.orange};
`;
const FavoriteCount = styled(SidebarCount)``;

const UserEmail = styled.div``;
