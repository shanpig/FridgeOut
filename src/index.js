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
import HeaderSpacer from './components/common/HeaderSpacer';
import FooterSpacer from './components/common/FooterSpacer';

import RecipeItem from './components/common/RecipeItem';
import testRecipe from './mockData/recipe/客家釀豆腐.json';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Header></Header>
      <HeaderSpacer></HeaderSpacer>
      <Router>
        <Switch>
          <Route exact path='/'>
            <></>
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
          <Route path='/test/components/recipeComponent'>
            <RecipeItem recipe={testRecipe}></RecipeItem>
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
