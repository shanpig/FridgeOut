import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { theme } from './variables';
import styled from 'styled-components';
import Header from './components/common/Header';
import PostQueryForm from './components/pending/PostQueryForm';
import Posts from './components/pending/Posts.js';
import ProfilePage from './components/ProfilePage/ProfilePage';
import RecipePage from './components/RecipePage/RecipePage';
import SearchPage from './components/SearchPage/SearchPage';
import LandingPage from './components/LandingPage/LandingPage';
import HeaderSpacer from './components/common/HeaderSpacer';
import FooterSpacer from './components/common/FooterSpacer';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
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
          <Route path='/profile'>
            <ProfilePage></ProfilePage>
          </Route>
          <Route path='/recipe/:id'>
            <RecipePage></RecipePage>
          </Route>
          <Route path='/posts'>
            <></>
          </Route>
          <Route path='/post/shareRecipe'>
            <></>
          </Route>
          <Route path='/post/recommendRecipe'>
            <></>
          </Route>

          <Route path='/testPost'>
            <PostQueryForm></PostQueryForm>
            <Posts></Posts>
          </Route>
        </Switch>
      </Router>
      <FooterSpacer></FooterSpacer>
    </Body>
  );
}

const Body = styled.div`
  height: max-content;
  min-height: 100vh;

  @media screen and (min-width: 769px) {
    background-color: ${theme.lighterOrange};
  }
`;

export default App;
