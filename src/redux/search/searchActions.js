const addInput = (input) => {
  return {
    type: 'search/addInput',
    payload: input,
  };
};
const removeInput = (input) => {
  return {
    type: 'search/removeInput',
    payload: input,
  };
};

export { addInput, removeInput };
