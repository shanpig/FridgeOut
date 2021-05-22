import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRecipeToSelections } from '../../redux/reducers/selection/selectionActions';
import { GrFormAdd } from 'react-icons/gr';
import styled from 'styled-components';

function removeRepeat(array) {
  return Array.from(new Set(array));
}

export default function RecipeItem({ recipe }) {
  const d = useDispatch();
  const { main_image, title, ingredients, id } = recipe;
  const leftovers = useSelector((state) => state.searched_keywords);
  const [usedLeftovers, setUsedLeftovers] = useState([]);
  const [neededLeftovers, setNeededLeftovers] = useState([]);

  useEffect(() => {
    if (!leftovers) return;
    let used = [];
    let needed = [];
    ingredients.forEach((ingredient) => {
      const {
        ingredient_name: name,
        ingredient_amount: amount,
        ingredient_unit: unit,
      } = ingredient;
      if (leftovers.find((leftover) => leftover.ingredient_name === name)) {
        used.push(name);
      } else needed.push(name);
    });
    setUsedLeftovers(removeRepeat(used));
    setNeededLeftovers(removeRepeat(needed));
  }, [ingredients, leftovers]);

  return (
    <Item>
      <ImageLink to={`/recipe/${id}`}>
        <Image src={main_image}></Image>
      </ImageLink>
      <TextSection>
        <TitleRow>
          <Title>{title}</Title>
          <AddButton onClick={() => d(addRecipeToSelections(recipe))} />
        </TitleRow>
        <h2>使用剩食：</h2>
        <UsedLeftovers key={1}>
          {usedLeftovers.map((leftover, i) => (
            <UsedLeftover key={i}>{leftover}</UsedLeftover>
          ))}
        </UsedLeftovers>
        <h2>你還缺：</h2>
        <NeededLeftovers key={2}>
          {neededLeftovers.map((leftover, i) => (
            <NeededLeftover key={i}>{leftover}</NeededLeftover>
          ))}
        </NeededLeftovers>
      </TextSection>
    </Item>
  );
}

const Item = styled.li`
  width: 100%;
  min-height: 180px;
  display: flex;
  padding: 20px 10px;
  position: relative;

  @media screen and (min-width: 769px) {
    background-color: white;
  }
`;

const AddButton = styled(GrFormAdd)`
  font-size: 2em;
  margin-left: auto;
  cursor: pointer;
`;

const ImageLink = styled(Link)`
  flex: 1 1 130px;
  display: flex;
  align-items: center;
`;

const Image = styled.div`
  width: 100%;
  height: 160px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const TextSection = styled.div`
  flex: 1 1 40%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 1.3em;
  font-weight: bold;
`;

const UsedLeftovers = styled.ul`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;
const UsedLeftover = styled.li`
  color: green;
  word-break: break-all;
`;
const NeededLeftovers = styled.ul`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const NeededLeftover = styled.li`
  color: red;
  word-break: break-all;
`;
