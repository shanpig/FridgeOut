import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { theme } from './variables';
import styled from 'styled-components';
import Header from './components/common/Header';
import PostQueryForm from './components/pending/PostQueryForm';
import Posts from './components/pending/Posts.js';
import RecipePage from './components/RecipePage/RecipePage';
import SearchPage from './components/SeachPage/SearchPage';
import LandingPage from './components/LandingPage/LandingPage';
import HeaderSpacer from './components/common/HeaderSpacer';
import FooterSpacer from './components/common/FooterSpacer';

function App() {
  return (
    <Body>
      <Router>
        <Header></Header>
        <HeaderSpacer></HeaderSpacer>
        <Switch>
          <Route exact path='/'>
            <LandingPage></LandingPage>
          </Route>
          <Route path='/search'>
            {/* <App /> */}
            <SearchPage></SearchPage>
          </Route>
          <Route path='/profile/:id'>
            <></>
          </Route>
          <Route path='/testRecipe/:id'>
            <RecipePage></RecipePage>
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
  height: 100vh;

  @media screen and (min-width: 769px) {
    background-color: ${theme.lighterOrange};
  }
`;

export default App;
