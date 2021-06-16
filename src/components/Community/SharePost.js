import { theme } from '../../variables';

import Post from './Post';

import { Link } from 'react-router-dom';

import styled from 'styled-components';

export default function SharePost({ post }) {
  const {
    by: name,
    timestamp,
    recipe: { id, main_image, title, ingredients },
  } = post;

  return (
    <PostContent name={name} timestamp={timestamp}>
      <Title>分享了一份食譜！</Title>
      <Recipe to={`/recipe/${id}`}>
        <ImageCol>
          <RecipeImage src={main_image} alt="" />
        </ImageCol>
        <InfoCol>
          <RecipeTitle>{title}</RecipeTitle>
          <RecipeIngredients>
            {ingredients &&
              ingredients.map(({ ingredient_name }, i) => (
                <Ingredient key={i}>{ingredient_name}</Ingredient>
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
  width: 100%;
  cursor: pointer;
  margin: 10px 10px 10px;
  background-color: white;
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
