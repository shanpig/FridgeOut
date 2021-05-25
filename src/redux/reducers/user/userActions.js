const setUser = (user_info) => {
  return {
    type: 'user/set/all',
    payload: user_info,
  };
};

const setLeftOvers = (leftOvers) => {
  console.log('set left over to: ', leftOvers);
  return {
    type: 'user/set/leftOvers',
    payload: leftOvers,
  };
};

const setLeftOver = (leftOver) => {
  console.log('set one leftover: ', leftOver);
  return {
    type: 'user/set/leftOver',
    payload: leftOver,
  };
};

const addToFavorite = (recipe) => {
  console.log('add to favorite: ', recipe);
  return {
    type: 'user/add/favorite',
    payload: recipe,
  };
};

const removeFromFavorite = (recipe) => {
  console.log('remove from favorite: ', recipe);
  return {
    type: 'user/remove/favorite',
    payload: recipe,
  };
};

export {
  setUser,
  setLeftOvers,
  setLeftOver,
  addToFavorite,
  removeFromFavorite,
};
