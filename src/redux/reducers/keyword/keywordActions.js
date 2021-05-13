const addInput = (input) => {
  return {
    type: 'keyword/addInput',
    payload: input,
  };
};
const removeInput = (input) => {
  return {
    type: 'keyword/removeInput',
    payload: input,
  };
};

export { addInput, removeInput };
