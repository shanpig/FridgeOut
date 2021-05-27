import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import RecipeItem from './RecipeItem';
import SidebarBody from '../common/Sidebar/SidebarBody';
import { GrFormAdd } from 'react-icons/gr';
import { theme } from '../../variables';
import { searchRecipesByIngredientNames } from '../../utils/firebase';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { addToKitchen } from '../../redux/reducers/user/userActions';

export default function SearchPage() {
  const d = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const [recipesPage, setRecipesPage] = useState(0);
  const searchKeywords = useSelector((state) => state.searched_keywords);
  const leftOvers = useSelector((state) => state.user_info.left_overs);

  useEffect(() => {
    let subscribed = true;
    let ingredientNames = searchKeywords.map((s) => s.ingredient_name);
    searchRecipesByIngredientNames(ingredientNames).then((searchedRecipes) => {
      if (subscribed) {
        setRecipes(searchedRecipes);
        setRecipesPage(0);
      }
    });

    return () => (subscribed = false);
  }, [searchKeywords]);

  function movePage(num) {
    let nextPage = recipesPage + num;
    let maxPage = Math.floor(recipes.length / 10);
    if (nextPage < 0 || nextPage > maxPage) return;
    setRecipesPage((p) => p + num);
  }

  return (
    <Main>
      <SearchBar></SearchBar>
      <FilterBar></FilterBar>
      <MiscRow>
        <Pagination>
          <PrevPageButton onClick={() => movePage(-1)} />
          {recipesPage + 1}/{Math.floor(recipes.length / 10) + 1}
          <NextPageButton onClick={() => movePage(1)} />
        </Pagination>
        <SortSelection>
          <option value='' disabled>
            排序
          </option>
          <option value=''>食材種類 (少到多)</option>
          <option value=''>食材種類 (多到少)</option>
        </SortSelection>
      </MiscRow>
      <ContentRow>
        <SearchedRecipes>
          {recipes
            .sort((a, b) => a.ingredients.length - b.ingredients.length)
            .slice(recipesPage * 10, recipesPage * 10 + 10)
            .map((recipe, i) => (
              <RecipeItem
                key={i}
                recipe={recipe}
                button={AddButton}
                buttonAction={() => addToKitchen(recipe)}
              />
            ))}
        </SearchedRecipes>
        <DeskTopSidebar>
          <SidebarBody />
        </DeskTopSidebar>
      </ContentRow>
    </Main>
  );
}

const Main = styled.main`
  padding: 10px;

  @media screen and (min-width: 769px) {
    padding: 60px 42px;
    background-color: ${theme.lighterOrange};
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  padding: 5px 0;
  width: 100%;
`;

const MiscRow = styled(Row)`
  align-items: center;
`;

const ContentRow = styled(Row)`
  align-items: flex-start;
  margin-top: 20px;
`;

const PrevPageButton = styled(AiOutlineArrowLeft)`
  cursor: pointer;
  font-size: 1.1em;
  @media screen and (min-width: 769px) {
    font-size: 0.8em;
  }
`;

const NextPageButton = styled(AiOutlineArrowRight)`
  cursor: pointer;
  font-size: 1.1em;
  @media screen and (min-width: 769px) {
    font-size: 0.8em;
  }
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.3em;
  user-select: none;
`;

const SortSelection = styled.select`
  padding: 3px 5px;
`;

const SearchedRecipes = styled.ul`
  width: 100%;

  @media screen and (min-width: 769px) {
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
`;

const DeskTopSidebar = styled.aside`
  display: none;
  @media screen and (min-width: 769px) {
    display: unset;
    flex-grow: 1;
    margin-left: 40px;
    background-color: white;
  }
`;

const AddButton = styled(GrFormAdd)`
  min-width: 25px;
  font-size: 25px;
  margin-left: auto;
  cursor: pointer;
`;
