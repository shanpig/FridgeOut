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
import { Animated } from 'react-animated-css';

export default function SearchPage() {
  const d = useDispatch();
  const [recipes, setRecipes] = useState([]);
  const [recipesPage, setRecipesPage] = useState(0);
  const selectedRecipes = useSelector((state) => state.user_info.my_kitchen);
  console.log(selectedRecipes);
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
    window.scrollTo(0, 0);
  }

  function isSelected(recipe) {
    return selectedRecipes.findIndex((target) => target.id === recipe.id) >= 0;
  }

  return (
    <Main>
      {/* <FilterBar></FilterBar> */}
      <SearchBar></SearchBar>

      <ContentRow>
        <SearchedRecipes>
          {recipes
            .sort((a, b) => a.ingredients.length - b.ingredients.length)
            .slice(recipesPage * 10, recipesPage * 10 + 10)
            .map((recipe, i) => (
              <Animated animationInDelay={(i - 1) * 200}>
                <RecipeItem
                  key={i}
                  recipe={recipe}
                  button={isSelected(recipe) ? DisabledButton : AddButton}
                  buttonAction={() => addToKitchen(recipe)}
                />
              </Animated>
            ))}
        </SearchedRecipes>
        <DeskTopSidebar>
          <SidebarBody />
        </DeskTopSidebar>
      </ContentRow>
      <MiscRow>
        <Pagination>
          <PrevPageButton onClick={() => movePage(-1)} />
          {recipesPage + 1}/{Math.floor(recipes.length / 10) + 1}
          <NextPageButton onClick={() => movePage(1)} />
        </Pagination>
        {/* <SortSelection>
          <option value='' disabled>
            排序
          </option>
          <option value=''>食材種類 (少到多)</option>
          <option value=''>食材種類 (多到少)</option>
        </SortSelection> */}
      </MiscRow>
    </Main>
  );
}

const Main = styled.main`
  padding: 10px;
  max-width: 760px;
  margin: 0 auto;

  & * {
    color: ${theme.darkbrown};
  }
  /* background-color: rgba(255, 255, 255, 0.8); */

  @media screen and (min-width: 769px) {
    padding: 30px 0;
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
  justify-content: center;
  margin-top: 20px;
`;

const ContentRow = styled(Row)`
  margin-top: 30px;

  align-items: flex-start;
  /* background-color: rgba(255, 255, 255, 0.8); */
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
  & path {
    stroke: white;
  }
  @media screen and (min-width: 769px) {
    font-size: 0.8em;
  }
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1.3em;
  user-select: none;
  letter-spacing: 5px;

  color: white;
`;

const SortSelection = styled.select`
  padding: 3px 5px;
`;

const SearchedRecipes = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (min-width: 769px) {
    width: 70%;
  }
`;

const DeskTopSidebar = styled.aside`
  display: none;
  @media screen and (min-width: 769px) {
    display: unset;
    flex-grow: 1;
    margin-left: 40px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

const AddButton = styled(GrFormAdd)`
  min-width: 25px;
  font-size: 25px;
  margin-left: auto;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
    background-color: black;
    & path {
      stroke: ${theme.orange};
    }
  }
`;

const DisabledButton = styled(AddButton)`
  pointer-events: none;
`;
