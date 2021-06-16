import './App.css';
import backgroundImageSrc from './images/kitchen-table.jpg';

import PostQueryForm from './components/Community/PostQueryForm';
import ShareRecipeForm from './components/Community/ShareRecipeForm';
import ProfilePage from './components/ProfilePage/ProfilePage';
import RecipePage from './components/RecipePage/RecipePage';
import SearchPage from './components/SearchPage/SearchPage';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import PageNotFound from './components/404/PageNotFound';
import RecommendForm from './components/Community/RecommendForm';
import HeaderSpacer from './components/common/HeaderSpacer';
import FooterSpacer from './components/common/FooterSpacer';
import CommunityPage from './components/Community/CommunityPage';
import Header from './components/common/Header';

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
    <>
      <Body>
        <Router>
          {/* <ScrollToTop /> */}
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
    </>
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
