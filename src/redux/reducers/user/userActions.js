import {
  setUserLeftovers,
  addRecipeToUserKitchen,
  removeRecipeFromUserKitchen,
  addRecipeToUserFavorites,
  removeRecipeFromUserFavorites,
} from '../../../utils/firebase';

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
  console.log('set left over to: ', leftOvers);
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

const _addToFavorite = (recipe) => {
  console.log('add to favorite: ', recipe);
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
  console.log('remove from favorite: ', id);
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
      console.log('hi, ', userInfo.name);
    }
    console.log(`remove recipe from kitchen ${recipe}`);
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
  addToFavorite,
  removeFromFavorite,
  addToKitchen,
  removeFromKitchen,
  setRecommendPostHolder,
};
