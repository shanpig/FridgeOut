import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import RecipeItem from '../common/RecipeItem';
import { searchRecipesByIngredientNames } from '../../utils/firebase';

export default function SearchPage() {
  const d = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const [shownRecipesPage, setShownRecipesPage] = useState(0);
  const searchKeywords = useSelector((state) => state.search_keywords);
  const leftOvers = useSelector((state) => state.user_info.left_overs);

  useEffect(() => {
    let ingredientNames = searchKeywords.map((s) => s.ingredient_name);
    searchRecipesByIngredientNames(ingredientNames).then((searchedRecipes) => {
      setRecipes(searchedRecipes);
    });
  }, [searchKeywords]);

  return (
    <Main>
      <SearchBar></SearchBar>
      <FilterBar></FilterBar>
      <SortSelection>
        <option value='' disabled>
          排序
        </option>
        <option value=''>食材種類 (少到多)</option>
      </SortSelection>
      <SearchedRecipes>
        {recipes &&
          recipes
            .slice(shownRecipesPage * 10, shownRecipesPage * 10 + 10)
            .map((recipe, i) => <RecipeItem recipe={recipe} />)}
      </SearchedRecipes>
    </Main>
  );
}

const Main = styled.main`
  padding: 10px;
`;

const SortSelection = styled.select`
  padding: 3px 5px;
`;

const SearchedRecipes = styled.ul``;
