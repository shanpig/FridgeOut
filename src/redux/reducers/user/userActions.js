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

const addToKitchen = (id) => {
  console.log('add to kitchen: ', id);
  return {
    type: 'user/add/kitchen',
    payload: id,
  };
};

const removeFromKitchen = (id) => {
  console.log('remove from kitchen: ', id);
  return {
    type: 'user/remove/kitchen',
    payload: id,
  };
};

export { setUser, setLeftOvers, setLeftOver, addToKitchen, removeFromKitchen };
