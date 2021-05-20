import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GrFormAdd } from 'react-icons/gr';
import styled from 'styled-components';

export default function RecipeItem({ recipe }) {
  const { main_image, title, ingredients, id } = recipe;
  console.log(main_image, title, ingredients);
  const leftovers = useSelector((state) => state.search_keywords);
  const [usedLeftovers, setUsedLeftovers] = useState([]);
  const [neededLeftovers, setNeededLeftovers] = useState([]);

  useEffect(() => {
    let used = [];
    let needed = [];
    ingredients.forEach((ingredient) => {
      const {
        ingredient_name: name,
        ingredient_amount: amount,
        ingredient_unit: unit,
      } = ingredient;
      if (
        leftovers.find(
          (leftover) =>
            leftover.ingredient_name === name &&
            leftover.ingredient_unit === unit &&
            leftover.ingredient_amount < amount
        )
      ) {
        used.push(name);
      } else needed.push(name);
    });
    setUsedLeftovers(used);
    setNeededLeftovers(needed);
  });

  return (
    <Item>
      <AddButton></AddButton>
      <ImageSection>
        <img src={main_image} alt='' />
      </ImageSection>
      <TextSection>
        <Title>{title}</Title>
        <h2>使用剩食：</h2>
        <UsedLeftovers></UsedLeftovers>
        <h2>你還缺：</h2>
        <NeededLeftovers></NeededLeftovers>
      </TextSection>
    </Item>
  );
}

const Item = styled.li`
  width: 100%;
  height: 200px;
  display: flex;
  position: relative;
`;

const AddButton = styled(GrFormAdd)`
  position: absolute;
  top: 0;
  right: 0;
`;

const ImageSection = styled.div`
  flex: 1 1 40%;

  & img {
    height: 100%;
  }
`;

const TextSection = styled.div`
  flex: 1 1 40%;
`;

const Title = styled.h1``;

const UsedLeftovers = styled.ul``;
const NeededLeftovers = styled.ul``;
