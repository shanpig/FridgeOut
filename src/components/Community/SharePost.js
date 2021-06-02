import { useEffect, useState } from 'react';
import { getRecipe } from '../../utils/firebase';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Post from './Post';

export default function SharePost({ post }) {
  const [recipe, setRecipe] = useState({});
  const { by: name, profile_image, timestamp, recipe: recipeData } = post;

  useEffect(() => {
    getRecipe(recipeData.id).then((recipe) => {
      console.log(recipeData);
      setRecipe(recipeData);
    });
  }, []);

  return (
    <Post name={name} profile_image={profile_image} timestamp={timestamp}>
      <Title>{name} 分享了一份食譜！</Title>
      <Recipe to={`/recipe/${recipe.id}`}>
        <ImageCol>
          <RecipeImage src={recipe && recipe.main_image} alt="" />
        </ImageCol>
        <InfoCol>
          <RecipeName>{recipe.title}</RecipeName>
          <RecipeIngredients>
            {recipe.ingredients &&
              recipe.ingredients.map((ingredient, i) => (
                <Ingredient key={i}>{ingredient.ingredient_name}</Ingredient>
              ))}
          </RecipeIngredients>
        </InfoCol>
      </Recipe>
    </Post>
  );
}

const ImageCol = styled.div`
  width: fit-content;
`;

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h2`
  color: gray;
`;

const Recipe = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  margin: 0 10px 10px;
  border: 1px solid lightgray;
  display: flex;
  padding: 10px 20px;
  gap: 10px;
`;

const RecipeName = styled.h2`
  font-size: 1.2em;
  color: black;
  font-weight: bold;
`;

const RecipeImage = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const RecipeIngredients = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Ingredient = styled.li`
  color: gray;
`;
