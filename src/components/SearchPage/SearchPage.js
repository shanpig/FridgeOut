import { GrFormAdd } from 'react-icons/gr';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

import { theme } from '../../variables';

import SearchBar from './components/SearchBar';
import RecipeItem from '../common/RecipeItem';
import SidebarBody from '../common/Sidebar/SidebarBody';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addToKitchen } from '../../redux/reducers/user/userActions';

import styled from 'styled-components';
import { Animated } from 'react-animated-css';

import { searchRecipesByIngredientNames } from '../../utils/firebase';

export default function SearchPage() {
  const [recipes, setRecipes] = useState([]);
  const [recipesPage, setRecipesPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const selectedRecipes = useSelector((state) => state.user_info.my_kitchen);
  const searchKeywords = useSelector((state) => state.searched_keywords);

  useEffect(() => {
    setIsLoading(true);
    let subscribed = true;
    let ingredientNames = searchKeywords.map((s) => s.ingredient_name);
    searchRecipesByIngredientNames(ingredientNames).then((searchedRecipes) => {
      if (subscribed) {
        setRecipes(searchedRecipes);
        setIsLoading(false);
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
      <SearchBar />

      <ContentRow>
        {isLoading ? (
          <LoadingAnimation key={1}>
            <lottie-player
              src="https://assets6.lottiefiles.com/packages/lf20_UGvCSC/loading_animation.json"
              background="transparent"
              speed="1"
              style={{ width: '300px', height: '300px' }}
              loop
              autoplay
            />
          </LoadingAnimation>
        ) : recipes.length === 0 ? (
          <IconContainer key={2}>
            <lottie-player
              src="https://assets5.lottiefiles.com/packages/lf20_MrIjH2.json"
              background="transparent"
              speed="1"
              style={{
                width: '200px',
                height: '200px',
              }}
              loop
              autoplay
            />
            <Text>找不到食譜</Text>
          </IconContainer>
        ) : (
          <SearchedRecipes key={3}>
            {recipes.length &&
              recipes
                .sort((a, b) => a.ingredients.length - b.ingredients.length)
                .slice(recipesPage * 10, recipesPage * 10 + 10)
                .map((recipe, i) => (
                  <StyledAnimated
                    key={i}
                    animationIn="fadeInUp"
                    animationInDelay={(i - 1) * 200}
                  >
                    <RecipeItem
                      readOnly={true}
                      recipe={recipe}
                      Button={isSelected(recipe) ? DisabledButton : AddButton} //
                      buttonAction={() => addToKitchen(recipe)}
                    />
                  </StyledAnimated>
                ))}
            <Pagination>
              <PrevPageButton onClick={() => movePage(-1)}>
                <PrevPageIcon />
              </PrevPageButton>
              {recipesPage + 1}/{Math.floor(recipes.length / 10) + 1}
              <NextPageButton onClick={() => movePage(1)}>
                <NextPageIcon />
              </NextPageButton>
            </Pagination>
          </SearchedRecipes>
        )}
        <DeskTopSidebar>
          <StyledSidebarBody />
        </DeskTopSidebar>
      </ContentRow>
    </Main>
  );
}

const Main = styled.main`
  padding: 10px;
  max-width: 760px;
  margin: 0 auto;

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

const ContentRow = styled(Row)`
  margin-top: 30px;
  align-items: flex-start;
`;

const Button = styled.button`
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: center;

  &:hover {
    transform: scale(1.4);

    & path {
      fill: ${theme.orange};
    }
  }
`;

const PrevPageButton = styled(Button)``;

const PrevPageIcon = styled(AiFillCaretLeft)`
  cursor: pointer;
  width: 100%;
  height: 100%;

  @media screen and (min-width: 769px) {
    font-size: 0.8em;
  }
`;

const NextPageButton = styled(Button)``;

const NextPageIcon = styled(AiFillCaretRight)`
  cursor: pointer;
  width: 100%;
  height: 100%;

  @media screen and (min-width: 769px) {
    font-size: 0.8em;
  }
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  gap: 10px;
  font-size: 1.3em;
  user-select: none;
  letter-spacing: 5px;

  color: white;
  & path {
    color: white;
  }
`;

const SearchedRecipes = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media screen and (min-width: 769px) {
    width: 70%;
  }
`;

const IconContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 769px) {
    width: 70%;
  }
`;

const LoadingAnimation = styled(IconContainer)``;

const Text = styled.h2`
  font-size: 1.5em;
  color: white;
`;

const StyledAnimated = styled(Animated)`
  pointer-events: unset;
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

const StyledSidebarBody = styled(SidebarBody)`
  & * {
    color: ${theme.darkbrown};
  }
`;
