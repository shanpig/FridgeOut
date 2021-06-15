import React, { useEffect, useState } from 'react';
import { mainContentConfig, theme } from '../../variables';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router';
import { getRecipe } from '../../utils/firebase';
import SidebarBody from '../common/Sidebar/SidebarBody';
import ScrollToTop from '../common/ScrollToTop';
import backgroundImageSrc from '../../images/kitchen-table.jpg';
import { GrClose, GrAdd, GrCheckmark } from 'react-icons/gr';
import { TiArrowBack } from 'react-icons/ti';

import { useDispatch, useSelector } from 'react-redux';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Animated } from 'react-animated-css';
import {
  addToFavorite,
  addToKitchen,
  removeFromFavorite,
  removeFromKitchen,
} from '../../redux/reducers/user/userActions';
import { GiConsoleController } from 'react-icons/gi';
// import GoBackButton from '../common/GoBackButton';
// import { addRecipeToSelections } from '../../redux/reducers/user/userActions';

export default function RecipePage() {
  const {
    my_kitchen: myKitchen,
    my_favorites: myFavorite,
    identity,
  } = useSelector((state) => state.user_info);
  // const myKitchen = useSelector((state) => state.user_info.my_kitchen);
  // const myFavorite = useSelector((state) => state.user_info.my_favorites);
  const d = useDispatch();
  const history = useHistory();
  let cat = '';
  let group = '';
  const [{ id, title, main_image, ingredients, steps }, setRecipeInfo] =
    useState({});
  const [recipe, setRecipe] = useState({});
  const { id: recipeId } = useParams();

  useEffect(() => {
    setRecipeInfo(recipe);
  }, [recipe]);

  useEffect(() => {
    getRecipe(recipeId).then((recipe) => {
      setRecipe(recipe);
    });
  }, [id]);

  function isInKitchen(recipe) {
    console.log(myKitchen);
    console.log(myKitchen.findIndex((target) => target.id === recipe.id));
    return myKitchen.findIndex((target) => target.id === recipe.id) >= 0;
  }

  function isInFavorite(recipe) {
    return myFavorite.findIndex((target) => target.id === recipe.id) >= 0;
  }

  function toggleKitchenRecipe(recipe) {
    if (isInKitchen(recipe)) d(removeFromKitchen(recipe));
    else d(addToKitchen(recipe));
  }

  function toggleFavoriteRecipe(recipe) {
    if (isInFavorite(recipe)) d(removeFromFavorite(recipe));
    else d(addToFavorite(recipe));
  }

  return (
    <Main>
      <ScrollToTop />
      <Animated>
        <Card>
          <GoBackButton onClick={(e) => history.goBack()} />
          <RecipeImageContainer src={main_image} />
          <RecipeInfoContainer>
            <Title>{title}</Title>
            <AddToButtonGroup>
              {identity !== 'none' ? (
                <AddToButton
                  key={1}
                  value=""
                  className={isInFavorite(recipe) ? 'active' : ''}
                  onClick={() => {
                    if (recipe.id) toggleFavoriteRecipe(recipe);
                  }}
                >
                  {isInFavorite(recipe) ? <CheckIcon /> : <AddIcon />}
                  收藏
                </AddToButton>
              ) : (
                <></>
              )}

              <AddToButton
                key={2}
                value=""
                className={isInKitchen(recipe) ? 'active' : ''}
                onClick={() => {
                  if (recipe.id) toggleKitchenRecipe(recipe);
                }}
              >
                {isInKitchen(recipe) ? <CheckIcon /> : <AddIcon />}
                我的廚房
              </AddToButton>
            </AddToButtonGroup>

            <Info>
              <ListContainer>
                <ListTitle>
                  <ListTitleBullet>食材</ListTitleBullet>
                </ListTitle>
                <IngredientList>
                  {ingredients &&
                    ingredients.map((ingredient, i) => {
                      let ingredientItem = [];

                      if (ingredient.ingredient_cat !== cat) {
                        ingredientItem.push(
                          <IngredientCat>
                            {ingredient.ingredient_cat}
                          </IngredientCat>
                        );
                        cat = ingredient.ingredient_cat;
                      }
                      if (ingredient.ingredient_group !== group) {
                        ingredientItem.push(
                          <IngredientGroup>
                            {ingredient.ingredient_group}
                          </IngredientGroup>
                        );
                        group = ingredient.ingredient_group;
                      }

                      ingredientItem.push(
                        <Ingredient>
                          {ingredient.ingredient_name}&nbsp;
                          {ingredient.ingredient_amount}&nbsp;
                          {ingredient.ingredient_unit}
                        </Ingredient>
                      );

                      return (
                        <IngredientItem key={i}>
                          {ingredientItem}
                        </IngredientItem>
                      );
                    })}
                </IngredientList>
              </ListContainer>
              <ListContainer>
                <ListTitle>
                  <ListTitleBullet>步驟</ListTitleBullet>
                </ListTitle>
                <Steps>
                  {steps &&
                    steps.map((step, i) => (
                      <Step key={i}>
                        <span>{i + 1}.</span>
                        <span>{step.trim()}</span>
                      </Step>
                    ))}
                </Steps>
              </ListContainer>
            </Info>
          </RecipeInfoContainer>
          {/* <SidebarContent>
          <SidebarBody />
        </SidebarContent> */}
        </Card>
      </Animated>
    </Main>
  );
}

const Main = styled.main`
  padding: 10px 0 50px;
  position: relative;
  /* background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${backgroundImageSrc}); */
  /* background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */
  max-width: 1024px;
  margin: 0 auto;
  min-height: ${mainContentConfig.mobile_height};

  @media screen and (min-width: 769px) {
    min-height: ${mainContentConfig.computer_height};
    padding: 30px 42px;
  }
`;

const CloseButton = styled(GrClose)`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 20px;
  height: 20px;
  z-index: 1000;
  cursor: pointer;

  & path {
    stroke-width: 3;
    stroke: ${theme.darkbrown};
  }

  &:hover {
    transform: scale(1.2);
  }
`;

const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  /* overflow: hidden; */
  position: relative;
  display: flex;
  flex-direction: column;
  position: relative;

  border-radius: 5px;

  max-width: 600px;
  width: 90%;
  margin: 20px auto;

  & * {
    color: ${theme.darkbrown};
    /* font-family: 'Roboto'; */
  }

  @media screen and (min-width: 769px) {
    margin: 0 auto;
    flex-direction: row;
    height: calc(${mainContentConfig.computer_height} - 60px);
    max-width: 1024px;
  }
`;

const CardHead = styled.div`
  height: 100px;
  width: 100%;
  border-radius: 5px 5px 0 0;
  /* background-color: ${theme.orange}; */
`;

const AddToButton = styled.button`
  cursor: pointer;
  position: relative;
  border-radius: 5px;
  /* line-height: 1.3; */
  border: 1px solid gray;
  padding: 3px 5px;
  transition: 0.2s ease all;
  display: flex;
  align-items: center;
  gap: 0 5px;

  &:focus {
    border: none;
    outline: none;
  }

  &.active {
    border: none;
    /* pointer-events: none; */
  }

  @media screen and (min-width: 769px) {
    &:not(.active):hover {
      background-color: ${theme.darkbrown};
      color: white;
      & path {
        stroke: white;
      }
    }
  }
`;

const AddIcon = styled(GrAdd)``;
const CheckIcon = styled(GrCheckmark)``;

const RecipeImageContainer = styled.div`
  position: relative;
  /* margin-top: 40px; */
  /* margin-left: 60px;
  border: 5px solid white;
  border-radius: 10px; */
  /* transform: rotateZ(-15deg); */
  /* box-shadow: 0 0 10px -6px black; */
  width: 100%;
  height: 350px;
  align-self: flex-start;
  /* border-radius: 50%; */
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  /* border-radius: 0 0 30px 30px; */

  @media screen and (min-width: 769px) {
    width: 45%;
    height: 100%;
  }
`;

const GoBackButton = styled(TiArrowBack)`
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  padding: 5px 15px 15px 5px;
  cursor: pointer;
  z-index: 100;
  fill: ${theme.darkbrown};
  background-color: rgba(255, 255, 255, 0.8);
  /* border-radius: 0 0 50px; */
  transition: 0.3s all ease;
  /* clip-path: polygon(0 0, 100% 0, 0 100%); */
  clip-path: circle(50px at left top);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 1px 4px 4px black;
  }
`;

const RecipeInfoContainer = styled(PerfectScrollbar)`
  padding-top: 20px;
  overflow: auto;

  & .ps__rail-y {
    left: unset;
    right: 0;
  }

  @media screen and (min-width: 769px) {
    width: 55%;
    /* overflow: hidden; */
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;
`;

const AddToButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin: 10px 0 20px;
`;

const Title = styled.h1`
  line-height: 1.3;
  font-size: 1.7em;
  text-align: center;
`;

const ListContainer = styled.div`
  width: 100%;
  padding: 10px 15px 25px;
  background-color: #f0f0f0;
`;

const ListTitle = styled.h3`
  font-size: 1.1em;
  font-weight: bold;
  padding: 10px;
  border-bottom: 1.5px solid ${theme.darkbrown};
  margin-bottom: 10px;
`;

const ListTitleBullet = styled.div`
  width: fit-content;
  font-size: 1.2em;
  /* padding: 5px 15px; */
  /* border-radius: 30px;
  border: 1.5px solid ${theme.darkbrown}; */
`;

const IngredientList = styled.ul`
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  gap: 5px;
`;

const IngredientItem = styled.li`
  letter-spacing: 1px;
`;

const IngredientCat = styled.div`
  margin: 10px 0;
`;

const IngredientGroup = styled.div``;

const Ingredient = styled.div`
  padding-left: 10px;
`;

const StepTitle = styled.h3`
  margin-top: 16px;
`;

const Steps = styled.ul`
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
`;

const Step = styled.li`
  display: flex;
  margin-top: 5px;
  margin-left: 5px;
  line-height: 1.5;
  letter-spacing: 1px;

  span:first-child {
    margin-right: 5px;
  }
`;

const SidebarContent = styled.div`
  display: none;
  @media screen and (min-width: 769px) {
    display: unset;
    flex-grow: 1;
    flex-basis: 300px;
    margin-left: 40px;
    background-color: white;
  }
`;

const StepsContainer = styled(ListContainer)`
  border-radius: 0 0 20px 20px;
`;
