import { search_keywords as initialState } from '../../mockData/state/state.json';

const searchKeywordReducer = (state = initialState, action) => {
  let newKeyWords = JSON.parse(JSON.stringify(state));
  let data = action.payload;

  switch (action.type) {
    case 'search/add': {
      const ingredients = newKeyWords.map((k) => k.ingredient_name);
      const indexOfKeyword = ingredients.findIndex(
        (ing) => ing === data.ingredient_name
      );

      if (indexOfKeyword >= 0)
        newKeyWords[indexOfKeyword].ingredient_amount += data.ingredient_amount;
      else newKeyWords.push(action.payload);

      return newKeyWords;
    }

    case 'search/remove': {
      let ingredients = newKeyWords.map((k) => k.ingredient_name);
      if (ingredients.includes(data))
        newKeyWords = newKeyWords.filter(
          (keyword) => keyword.ingredient_name !== data
        );
      return newKeyWords;
    }
    default: {
      return newKeyWords;
    }
  }
};

export default searchKeywordReducer;
