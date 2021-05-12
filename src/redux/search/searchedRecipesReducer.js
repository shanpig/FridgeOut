import data from '../../mockData/state/state.json';
const initialState = { ...data.searched_recipes, ...data.search_keyword };

const searchedRecipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'search/search': {
      console.log(state);
      return state;
    }
    default:
      return state;
  }
};

export default searchedRecipesReducer;
