const addSearchKeyword = (keyword) => {
  return {
    type: 'search/add',
    payload: keyword,
  };
};
const removeSearchKeyword = (ingredientName) => {
  return {
    type: 'search/remove',
    payload: ingredientName,
  };
};

export { addSearchKeyword, removeSearchKeyword };
