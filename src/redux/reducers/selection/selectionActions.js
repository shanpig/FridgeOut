const addRecipeToSelections = (recipe) => {
  return {
    type: 'select/add/recipe',
    payload: recipe,
  };
};

const removeRecipeFromSelections = (id) => {
  return {
    type: 'select/remove/recipe',
    payload: id,
  };
};

const addLeftoverToSelections = (leftover) => {
  return {
    type: 'select/add/leftover',
    payload: leftover,
  };
};

const removeLeftoverFromSelections = (leftover) => {
  return {
    type: 'select/remove/leftover',
    payload: leftover,
  };
};

export {
  addLeftoverToSelections,
  addRecipeToSelections,
  removeLeftoverFromSelections,
  removeRecipeFromSelections,
};