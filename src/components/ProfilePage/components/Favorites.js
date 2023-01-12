import { GrFormTrash } from 'react-icons/gr';

import EmptyMessage from './EmptyMessage';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorite } from '../../redux/reducers/user/userActions';

import styled from 'styled-components';
import { Animated } from 'react-animated-css';

export default function Favorites() {
  const d = useDispatch();
  const favorites = useSelector((state) => state.user_info.my_favorites);

  return (
    <FavoritesContent>
      {favorites.length === 0 ? (
        <EmptyMessage text={'目前沒有收藏的食譜喔~'} />
      ) : (
        <Recipes>
          {favorites.map((recipe, i) => (
            <Animated key={i} animationInDelay={i * 200}>
              <Recipe>
                <ImageContainer to={`/recipe/${recipe.id}`}>
                  <Image src={recipe.main_image} />
                </ImageContainer>
                <Title>{recipe.title}</Title>
                <RemoveButton onClick={() => d(removeFromFavorite(recipe))} />
              </Recipe>
            </Animated>
          ))}
        </Recipes>
      )}
    </FavoritesContent>
  );
}

const FavoritesContent = styled.ul``;

const Recipes = styled.ul`
  padding: 5px;
  width: 100%;
  display: grid;
  gap: 10px 10px;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (min-width: 550px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Recipe = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;

  &:hover img {
    transform: scale(1);
  }
`;

const ImageContainer = styled(Link)`
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: stretch;
  aspect-ratio: 1;
`;

const Title = styled.h2`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 1.1em;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 7px 0 4px;
  color: white;
`;

const Image = styled.img`
  transition: transform ease 1s;
  transform: scale(1.2);
  width: 100%;
`;

const RemoveButton = styled(GrFormTrash)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 1.3em;
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
  & path {
    stroke: white;
    stroke-width: 1;
  }
`;
