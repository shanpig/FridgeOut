import React, { useEffect, useState } from 'react';
import { theme } from '../../variables';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router';
import { getRecipe } from '../../utils/firebase';
import SidebarBody from '../common/SidebarBody';
import { BiArrowBack } from 'react-icons/bi';

export default function RecipePage() {
  const history = useHistory();
  let cat = '';
  let group = '';
  const [{ id, title, main_image, ingredients, steps }, setRecipe] = useState(
    {}
  );
  const { id: recipeId } = useParams();

  useEffect(() => {
    getRecipe(recipeId).then((recipe) => {
      setRecipe(recipe);
    });
  }, [id]);

  return (
    <>
      <Container src={main_image}>
        <GoBackButton onClick={history.goBack}></GoBackButton>
        <RecipeImageContainer>
          <RecipeImage src={main_image} alt='' />
          <AddToButtonGroup>
            <AddToButton key={1} value=''>
              + 收藏
            </AddToButton>
            <AddToButton key={2} value=''>
              + 我的廚房
            </AddToButton>
          </AddToButtonGroup>
        </RecipeImageContainer>
        <Title>{title}</Title>
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

              return <IngredientItem key={i}>{ingredientItem}</IngredientItem>;
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
      </Container>
      <SidebarBody />
    </>
  );
}

const Container = styled.div`
  padding: 45px 25px 5px;
`;

const GoBackButton = styled(BiArrowBack)`
  cursor: pointer;
  transform: scale(1.3);
`;

const RecipeImageContainer = styled.div`
  position: relative;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 200px;
  border: 1px solid black;
  object-fit: cover;
`;

const AddToButtonGroup = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
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
  line-height: 38px;
  margin-top: 25px;
`;

const ListTitle = styled.h3``;

const IngredientList = styled.ul`
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  list-style-type: none;
`;

const IngredientItem = styled.li``;

const IngredientCat = styled.div``;

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
