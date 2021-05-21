import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Header from './components/common/Header';
import PostQueryForm from './components/pending/PostQueryForm';
import Posts from './components/pending/Posts.js';
import RecipePage from './components/RecipePage/RecipePage';
import SearchPage from './components/SeachPage/SearchPage';
import LandingPage from './components/LandingPage/LandingPage';
import HeaderSpacer from './components/common/HeaderSpacer';
import FooterSpacer from './components/common/FooterSpacer';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Header></Header>
      <HeaderSpacer></HeaderSpacer>
      <Router>
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
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
