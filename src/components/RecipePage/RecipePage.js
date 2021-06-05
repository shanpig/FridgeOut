import React, { useEffect, useState } from 'react';
import { mainContentConfig, theme } from '../../variables';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router';
import { getRecipe } from '../../utils/firebase';
import SidebarBody from '../common/Sidebar/SidebarBody';
import backgroundImageSrc from '../../images/kitchen-table.jpg';
import { GrClose, GrAdd, GrCheckmark } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorite,
  addToKitchen,
} from '../../redux/reducers/user/userActions';
import GoBackButton from '../common/GoBackButton';
// import { addRecipeToSelections } from '../../redux/reducers/user/userActions';

export default function RecipePage() {
  const myKitchen = useSelector((state) => state.user_info.my_kitchen);
  const myFavorite = useSelector((state) => state.user_info.my_favorites);
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

  return (
    <Main>
      <Card>
        <CloseButton onClick={() => history.goBack()}></CloseButton>
        <CardHead></CardHead>
        <RecipeImageContainer src={main_image}>
          {/* <RecipeImage src={main_image} alt='' /> */}
        </RecipeImageContainer>
        <Title>{title}</Title>
        <AddToButtonGroup>
          <AddToButton
            key={1}
            value=""
            className={isInFavorite(recipe) ? 'active' : ''}
            onClick={() => {
              if (recipe.id) d(addToFavorite(recipe));
            }}
          >
            {isInFavorite(recipe) ? (
              <CheckIcon></CheckIcon>
            ) : (
              <AddIcon></AddIcon>
            )}
            收藏
          </AddToButton>
          <AddToButton
            key={2}
            value=""
            className={isInKitchen(recipe) ? 'active' : ''}
            onClick={() => {
              if (recipe.id) d(addToKitchen(recipe));
            }}
          >
            {isInKitchen(recipe) ? (
              <CheckIcon></CheckIcon>
            ) : (
              <AddIcon></AddIcon>
            )}
            我的廚房
          </AddToButton>
        </AddToButtonGroup>

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
                    <IngredientCat>{ingredient.ingredient_cat}</IngredientCat>
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
                  <IngredientItem key={i}>{ingredientItem}</IngredientItem>
                );
              })}
          </IngredientList>
        </ListContainer>
        <StepsContainer>
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
        </StepsContainer>
        {/* <SidebarContent>
          <SidebarBody />
        </SidebarContent> */}
      </Card>
    </Main>
  );
}

const Main = styled.main`
  padding: 10px 0 50px;
  position: relative;
  /* background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${backgroundImageSrc}); */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  max-width: 1024px;
  margin: 0 auto;
  min-height: ${mainContentConfig.computer_height};

  @media screen and (min-width: 769px) {
    min-height: ${mainContentConfig.mobile_height};
    padding: 60px 42px;
  }
`;

const CloseButton = styled(GrClose)`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 20px;
  height: 20px;
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
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  gap: 10px;
  max-width: 600px;
  width: 90%;
  margin: 20px auto;

  & * {
    color: ${theme.darkbrown};
    /* font-family: 'Roboto'; */
  }
`;

const CardHead = styled.div`
  height: 150px;
  width: 100%;
  border-radius: 20px 20px 0 0;
  background-color: ${theme.orange};
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

  &.active {
    border: none;
    pointer-events: none;
  }
  &:hover {
    background-color: ${theme.darkbrown};
    color: white;
    & path {
      stroke: white;
    }
  }
`;

const AddIcon = styled(GrAdd)``;
const CheckIcon = styled(GrCheckmark)``;

const RecipeImageContainer = styled.div`
  position: relative;
  margin-top: -125px;
  border: 2px solid white;
  box-shadow: 0 0 10px -6px black;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  &:hover ${AddToButton} {
    top: 0;
  }
`;

const AddToButtonGroup = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
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
  padding: 5px 15px;
  border-radius: 30px;
  border: 1.5px solid ${theme.darkbrown};
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
  padding-left: 30px;
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
