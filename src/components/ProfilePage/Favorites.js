import { theme } from '../../variables';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GrFormTrash } from 'react-icons/gr';
import { removeFromFavorite } from '../../redux/reducers/user/userActions';

export default function Favorites() {
  const d = useDispatch();
  const favorites = useSelector((state) => state.user_info.my_favorites);

  return (
    <FavoritesContent>
      {favorites.map((recipe, i) => (
        <Recipe key={i}>
          <ImageContainer to={`/recipe/${recipe.id}`}>
            <Image src={recipe.main_image}></Image>
          </ImageContainer>
          <Title>{recipe.title}</Title>
          <RemoveButton onClick={() => d(removeFromFavorite(recipe))} />
        </Recipe>
      ))}
    </FavoritesContent>
  );
}

const FavoritesContent = styled.ul`
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
  aspect-ratio: 1;
  /* max-height: 150px; */
`;

const Title = styled.h2``;

const Image = styled.img`
  transition: transform ease 1s;
  transform: translateY(-5%) scale(1.2);
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
