const addToFavorite = (id) => {
  console.log('action created');
  return {
    type: 'user/add/favorite',
    payload: id,
  };
};

export { addToFavorite };
