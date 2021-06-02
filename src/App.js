import './App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import { theme } from './variables';
import styled from 'styled-components';
import Header from './components/common/Header';
import PostQueryForm from './components/Community/PostQueryForm';
import ShareRecipeForm from './components/Community/ShareRecipeForm';
import ProfilePage from './components/ProfilePage/ProfilePage';
import RecipePage from './components/RecipePage/RecipePage';
import SearchPage from './components/SearchPage/SearchPage';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import RecommendForm from './components/Community/RecommendForm';
import HeaderSpacer from './components/common/HeaderSpacer';
import FooterSpacer from './components/common/FooterSpacer';
import ScrollToTop from './components/common/ScrollToTop';
import PostsPage from './components/Community/PostsPage';

function App() {
  return (
    <>
      <Body>
        <Router>
          <ScrollToTop />
          <Header></Header>
          <HeaderSpacer></HeaderSpacer>
          <Switch>
            <Route exact path='/'>
              <LandingPage></LandingPage>
            </Route>
            <Route path='/search'>
              <SearchPage></SearchPage>
            </Route>
            <Route path='/posts'>
              <PostsPage></PostsPage>
            </Route>
            <Route path='/recipe/:id'>
              <RecipePage></RecipePage>
            </Route>
            <Route path='/login'>
              <LoginPage />
            </Route>
            <Route path='/profile/:uid'>
              <ProfilePage />
            </Route>
            <Route exact path='/profile'>
              <ProfilePage></ProfilePage>
            </Route>
            <Route path='/form/query'>
              <PostQueryForm></PostQueryForm>
            </Route>
            <Route path='/form/recommend/:id'>
              <RecommendForm></RecommendForm>
            </Route>
            <Route path='/form/share'>
              <ShareRecipeForm></ShareRecipeForm>
            </Route>
          </Switch>
        </Router>
        <FooterSpacer></FooterSpacer>
      </Body>
    </>
  );
}

const Body = styled.div`
  height: max-content;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
`;

export default App;
