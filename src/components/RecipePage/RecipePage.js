import React, { useEffect, useState } from 'react';
import { theme } from '../../variables';
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
      <GoBackButton onClick={history.goBack}></GoBackButton>
      <ContentRow>
        <MainContent>
          <Title>{title}</Title>
          <RecipeImageContainer>
            <RecipeImage src={main_image} alt='' />
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
        </MainContent>
        <SidebarContent>
          <SidebarBody />
        </SidebarContent>
      </ContentRow>
    </Main>
  );
}

const Main = styled.main`
  padding: 10px;
  position: relative;

  @media screen and (min-width: 769px) {
    padding: 60px 42px;
    background-color: ${theme.lighterOrange};
  }
`;

const ContentRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0;
  width: 100%;
  align-items: flex-start;
  margin-top: 20px;
`;

const MainContent = styled.div`
  background-color: white;
  padding: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (min-width: 769px) {
    width: 60%;
  }
`;

const GoBackButton = styled(BiArrowBack)`
  cursor: pointer;
  position: absolute;
  top: 30px;
  left: 30px;
  font-size: 1.3em;
  transform: scale(1.3);
`;

const RecipeImageContainer = styled.div`
  position: relative;
`;

const RecipeImage = styled.img`
  width: 100%;

  @media screen and (min-width: 769px) {
    box-shadow: 0 0 10px -5px black;
    max-width: 400px;
    height: 400px;
  }
`;

const AddToButtonGroup = styled.div`
  display: flex;
  position: absolute;
  left: 10px;
  bottom: 10px;
  gap: 5px;
`;

const AddToButton = styled.button`
  background-color: white;
  cursor: pointer;
  border-radius: 5px;
  line-height: 1.3;
  border: 1px solid gray;
  padding: 3px 5px;
`;

const Title = styled.h1`
  line-height: 1.3%;
  margin: 10px 0;
  font-size: 1.7em;
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
    margin-left: 40px;
    background-color: white;
  }
`;
