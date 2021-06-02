import React, { useEffect, useState } from 'react';
import { mainContentConfig, theme } from '../../variables';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router';
import { getRecipe } from '../../utils/firebase';
import SidebarBody from '../common/Sidebar/SidebarBody';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import {
  addToFavorite,
  addToKitchen,
} from '../../redux/reducers/user/userActions';
import GoBackButton from '../common/GoBackButton';
// import { addRecipeToSelections } from '../../redux/reducers/user/userActions';

export default function RecipePage() {
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

  return (
    <Main>
      {/* <GoBackButton></GoBackButton> */}
      <ContentRow>
        <Left>
          <RecipeImageContainer src={main_image}>
            {/* <RecipeImage src={main_image} alt='' /> */}
            <AddToButtonGroup>
              <AddToButton
                key={1}
                value=''
                onClick={() => {
                  if (recipe.id) d(addToFavorite(recipe));
                }}>
                + 收藏
              </AddToButton>
              <AddToButton
                key={2}
                value=''
                onClick={() => {
                  if (recipe.id) d(addToKitchen(recipe));
                }}>
                + 我的廚房
              </AddToButton>
            </AddToButtonGroup>
          </RecipeImageContainer>
          <Title>{title}</Title>
        </Left>
        <Right>
          <ListTitle>食材：</ListTitle>

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

          <StepTitle>步驟：</StepTitle>
          <Steps>
            {steps &&
              steps.map((step, i) => (
                <Step key={i}>
                  <span>{i + 1}.</span>
                  <span>{step.trim()}</span>
                </Step>
              ))}
          </Steps>
        </Right>
        {/* <SidebarContent>
          <SidebarBody />
        </SidebarContent> */}
      </ContentRow>
    </Main>
  );
}

const Main = styled.main`
  padding: 10px 0 50px;
  position: relative;
  max-width: 1024px;
  margin: 0 auto;
  min-height: ${mainContentConfig.computer_height};

  @media screen and (min-width: 769px) {
    min-height: ${mainContentConfig.mobile_height};
    padding: 60px 42px;
  }
`;

const ContentRow = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 5px 0; */
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
  margin-top: 20px;

  @media screen and (min-width: 769px) {
    gap: 100px;
    justify-content: space-between;
    flex-direction: row;
  }
`;

const Left = styled.div`
  position: relative;
  flex-grow: 1;
  max-width: 500px;

  @media screen and (min-width: 769px) {
    max-width: 300px;
  }
`;

const Right = styled.div`
  position: relative;
  max-width: 500px;
  flex-grow: 3;
  padding: 0 20px;
  overflow-y: auto;

  @media screen and (min-width: 769px) {
    max-width: unset;
  }
`;

const AddToButton = styled.button`
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  position: relative;
  border-radius: 5px;
  line-height: 1.3;
  border: 1px solid gray;
  padding: 3px 5px;

  @media screen and (min-width: 769px) {
    top: 40px;
    transition: top ease 0.3s;
    &:hover {
      background-color: rgb(0, 0, 0);
    }
  }
`;

const RecipeImageContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
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
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
  gap: 5px;
  overflow: hidden;
`;

const Title = styled.h1`
  line-height: 1.3;
  font-size: 1.7em;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ListTitle = styled.h3`
  font-size: 1.3em;
`;

const IngredientList = styled.ul`
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  gap: 5px;
`;

const IngredientItem = styled.li``;

const IngredientCat = styled.div`
  margin: 10px 0;
`;

const IngredientGroup = styled.div``;

const Ingredient = styled.div``;

const StepTitle = styled.h3`
  margin-top: 16px;
`;

const Steps = styled.ul``;

const Step = styled.li`
  display: flex;
  margin-top: 5px;
  margin-left: 5px;
  line-height: 1.3;

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
