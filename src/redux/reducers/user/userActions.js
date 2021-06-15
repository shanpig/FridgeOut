import { AiOutlineConsoleSql } from 'react-icons/ai';
import {
  setUserLeftovers,
  addRecipeToUserKitchen,
  removeRecipeFromUserKitchen,
  addRecipeToUserFavorites,
  removeRecipeFromUserFavorites,
} from '../../../utils/firebase';

import { combine } from '../../../utils/recipes';

const userTemplate = {
  identity: 'none',
  id: '',
  name: 'Random',
  email: '',
  profile: '',
  left_overs: [],
  my_favorites: [],
  my_kitchen: [],
  messages: [],
  recommend_post_holder: {},
};

const setUser = (user_info) => {
  return {
    type: 'user/set/all',
    payload: user_info,
  };
};

const signOutUser = () => {
  return {
    type: 'user/set/all',
    payload: userTemplate,
  };
};

const _setLeftOvers = (leftOvers) => {
  return {
    type: 'user/set/leftOvers',
    payload: leftOvers,
  };
};

const setLeftOvers = (leftOvers) => {
  return function (dispatch, getState) {
    const userInfo = getState().user_info;
    if (userInfo.identity !== 'none') setUserLeftovers(userInfo.id, leftOvers);

    return dispatch(_setLeftOvers(leftOvers));
  };
};

const _addLeftOver = (leftOver) => {
  return {
    type: 'user/add/leftOver',
    payload: leftOver,
  };
};

const _setLeftOver = (leftOver) => {
  return {
    type: 'user/set/leftOver',
    payload: leftOver,
  };
};

const addLeftOver = (newIngredient) => {
  return function (dispatch, getState) {
    const leftovers = getState().user_info.left_overs;
    const targetIndex = leftovers.findIndex(
      (leftover) => leftover.ingredient_name === newIngredient.ingredient_name
    );
    let newLeftovers;
    if (targetIndex >= 0) {
      const leftover = combine(leftovers[targetIndex], newIngredient);
      leftover.ingredient_amount = leftover.ingredient_amount.toString();

      newLeftovers = [
        ...leftovers.slice(0, targetIndex),
        leftover,
        ...leftovers.slice(targetIndex + 1),
      ];
    } else {
      newLeftovers = [...leftovers, newIngredient];
    }

    return dispatch(setLeftOvers(newLeftovers));
  };
};

const _addToFavorite = (recipe) => {
  return {
    type: 'user/add/favorite',
    payload: recipe,
  };
};

const addToFavorite = (recipe) => {
  return async function (dispatch, getState) {
    const userInfo = getState().user_info;
    if (userInfo.identity !== 'none') {
      await addRecipeToUserFavorites(userInfo.id, recipe);
    }
    return dispatch(_addToFavorite(recipe));
  };
};

const _removeFromFavorite = (id) => {
  return {
    type: 'user/remove/favorite',
    payload: id,
  };
};

const removeFromFavorite = (recipe) => {
  return async function (dispatch, getState) {
    const userInfo = getState().user_info;
    if (userInfo.identity !== 'none')
      await removeRecipeFromUserFavorites(userInfo.id, recipe);

    return dispatch(_removeFromFavorite(recipe.id));
  };
};

const _addToKitchen = (recipe) => {
  return {
    type: 'user/add/kitchen',
    payload: recipe,
  };
};

const addToKitchen = (recipe) => {
  return function (dispatch, getState) {
    const userInfo = getState().user_info;
    if (userInfo.identity !== 'none') {
      addRecipeToUserKitchen(userInfo.id, recipe);
    }
    return dispatch(_addToKitchen(recipe));
  };
};

const _removeFromKitchen = (id) => {
  return {
    type: 'user/remove/kitchen',
    payload: id,
  };
};

const removeFromKitchen = (recipe) => {
  return async function (dispatch, getState) {
    const userInfo = getState().user_info;
    if (userInfo.identity !== 'none') {
      await removeRecipeFromUserKitchen(userInfo.id, recipe);
    }

    return dispatch(_removeFromKitchen(recipe.id));
  };
};

const setRecommendPostHolder = (post) => {
  return {
    type: 'user/set/post_holder',
    payload: post,
  };
};

export {
  setUser,
  signOutUser,
  setLeftOvers,
  addLeftOver,
  addToFavorite,
  removeFromFavorite,
  addToKitchen,
  removeFromKitchen,
  setRecommendPostHolder,
};
