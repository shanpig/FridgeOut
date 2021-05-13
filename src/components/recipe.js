import React from 'react';
import state from '../mockData/state/state.json';
import styled from 'styled-components';

const { keyword, id, tags, title, main_image, preparation, steps } =
  state.searched_recipes[1];

export default function Recipe() {
  return (
    <Container>
      <RecipeImageContainer>
        <RecipeImage src={main_image} alt='' />
        <AddToButton value=''>
          <option key={0} value='' disabled>
            加到...
          </option>
          <option key={1} value='add-to-favorite'>
            我的收藏
          </option>
          <option key={2} value='add-to-kitchen'>
            我的廚房
          </option>
        </AddToButton>
      </RecipeImageContainer>
      <Title>{title}</Title>
      <ListTitle>食材：</ListTitle>
      <IngredientList>
        <IngredientCategories>
          {preparation.map((prep, i) => {
            return (
              <React.Fragment key={i}>
                <Category>{prep.category}</Category>
                <ul key={i}>
                  {prep.ingredients.map((ingredient, i) => {
                    const {
                      ingredient_name: name,
                      ingredient_amount: amount,
                      ingredient_unit: unit,
                    } = ingredient;
                    if (name.includes('.')) {
                      const [char, text] = name.split('.');
                      return (
                        <React.Fragment key={i}>
                          <IngredientCategory>
                            <span>{char}.</span>
                          </IngredientCategory>
                          <Ingredient>
                            <span>{text}</span>
                            <span>{amount + ' ' + unit}</span>
                          </Ingredient>
                        </React.Fragment>
                      );
                    }
                    return (
                      <Ingredient key={i}>
                        <span>{name}</span>
                        <span>{amount + ' ' + unit}</span>
                      </Ingredient>
                    );
                  })}
                </ul>
              </React.Fragment>
            );
          })}
        </IngredientCategories>
      </IngredientList>
      <StepTitle>步驟：</StepTitle>
      <Steps>
        {steps.map((step, i) => (
          <Step key={i}>
            <span>{i + 1}.</span>
            <span>{step.trim()}</span>
          </Step>
        ))}
      </Steps>
    </Container>
  );
}

const Container = styled.div`
  padding: 45px 25px 5px;
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

const AddToButton = styled.select`
  background-color: white;
  position: absolute;
  text-align: left;
  right: 10px;
  bottom: 10px;
  cursor: pointer;
  border-radius: 5px;
  line-height: 1.3;
  border: 1px solid gray;
  width: 66px;
  height: 22px;
`;

const Title = styled.h1`
  line-height: 38px;
  margin-top: 25px;
`;

const ListTitle = styled.h3``;

const Category = styled.h3`
  margin-top: 15px;
`;

const IngredientList = styled.div`
  padding-left: 50px;
  display: flex;
`;

const IngredientCategories = styled.div`
  width: 100%;
`;

const IngredientCategory = styled.div`
  margin: 15px 0;
`;

const Ingredient = styled.div`
  display: flex;
  margin: 5px 0;
  /* justify-content: space-between; */

  span:first-child {
    margin-right: 5px;
  }
`;

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
