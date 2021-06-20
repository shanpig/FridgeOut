import backgroundImageSrc from './images/kitchen-table.jpg';

import Header from './components/common/Header';
import HeaderSpacer from './components/common/HeaderSpacer';
import LandingPage from './components/LandingPage/LandingPage';
import SearchPage from './components/SearchPage/SearchPage';
import CommunityPage from './components/CommunityPage/CommunityPage';
import RecipePage from './components/RecipePage/RecipePage';
import LoginPage from './components/LoginPage/LoginPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import PostQueryForm from './components/CommunityPage/PostQueryForm';
import RecommendForm from './components/CommunityPage/RecommendForm';
import ShareRecipeForm from './components/CommunityPage/ShareRecipeForm';
import PageNotFound from './components/404/PageNotFound';
import FooterSpacer from './components/common/FooterSpacer';

import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/reducers/user/userActions';

import styled from 'styled-components';

import { getUserData } from './utils/firebase';

function App() {
  const d = useDispatch();

  useEffect(() => {
    const uid = localStorage.getItem('fridgeoutid');
    if (uid) {
      getUserData(uid).then((data) => {
        if (data) d(setUser(data));
      });
    }
  });
  return (
    <Body>
      <Router>
        <Header />
        <HeaderSpacer />
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/posts">
            <CommunityPage />
          </Route>
          <Route path="/recipe/:id">
            <RecipePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/profile/:uid">
            <ProfilePage />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/form/query">
            <PostQueryForm />
          </Route>
          <Route path="/form/recommend/:id">
            <RecommendForm />
          </Route>
          <Route path="/form/share">
            <ShareRecipeForm />
          </Route>
          <Route path="/">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
      <FooterSpacer />
    </Body>
  );
}
const Body = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${backgroundImageSrc});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: max-content;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
`;

export default App;
