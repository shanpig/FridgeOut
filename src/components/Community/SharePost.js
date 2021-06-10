import { theme } from '../../variables';
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
      setRecipe(recipeData);
    });
  }, []);

  return (
    <PostContent
      name={name}
      profile_image={profile_image}
      timestamp={timestamp}
    >
      <Title>分享了一份食譜！</Title>
      <Recipe to={`/recipe/${recipe.id}`}>
        <ImageCol>
          <RecipeImage src={recipe && recipe.main_image} alt="" />
        </ImageCol>
        <InfoCol>
          <RecipeTitle>{recipe.title}</RecipeTitle>
          <RecipeIngredients>
            {recipe.ingredients &&
              recipe.ingredients.map((ingredient, i) => (
                <Ingredient key={i}>{ingredient.ingredient_name}</Ingredient>
              ))}
          </RecipeIngredients>
        </InfoCol>
      </Recipe>
    </PostContent>
  );
}

const PostContent = styled(Post)`
  width: 100%;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageCol = styled.div`
  width: fit-content;
`;

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h2`
  color: #706255;
  font-size: 0.9em;
  text-align: center;
  letter-spacing: 2px;
`;

const Recipe = styled(Link)`
  text-decoration: none;
  /* color: ${theme.darkbrown}; */
  width: 100%;
  cursor: pointer;
  /* background-color: white; */
  margin: 10px 10px 10px;
  background-color: white;
  /* border: 1px solid ${theme.darkbrown}; */
  border-radius: 4px;
  display: flex;
  padding: 10px 20px;
  gap: 10px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 1px 5px 4px lightgray;
  }
`;

const RecipeTitle = styled.h2`
  font-size: 1.2em;
  /* color: black; */
  line-height: 1.3;
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
  line-height: 1.3;
  border-bottom: 1.5px solid ${theme.orange};
`;
