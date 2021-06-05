import { theme } from '../../variables';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Animated } from 'react-animated-css';

function removeRepeat(array) {
  return Array.from(new Set(array));
}

export default function RecipeItem({
  recipe,
  readOnly = false,
  Button,
  buttonAction = () => {},
}) {
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
      <ItemContent to={`/recipe/${id}`}>
        <ImageContainer>
          <Image src={main_image}></Image>
        </ImageContainer>
        <TextSection>
          <TitleRow>
            <Title>{title}</Title>
          </TitleRow>
          <ContentRow>
            {/* <H2>使用剩食：</H2>
            <UsedLeftovers key={1}>
              {usedLeftovers.map((leftover, i) => (
                <UsedLeftover key={i}>{leftover}</UsedLeftover>
              ))}
            </UsedLeftovers> */}
            <H2>你還缺：</H2>
            <NeededLeftovers key={2}>
              {neededLeftovers.map((leftover, i) => (
                <NeededLeftover key={i}>{leftover}</NeededLeftover>
              ))}
            </NeededLeftovers>
          </ContentRow>
        </TextSection>
      </ItemContent>
      <ButtonContent>
        {readOnly ? <></> : <Button onClick={() => d(buttonAction(recipe))} />}
      </ButtonContent>
    </Item>
  );
}

const Item = styled.div`
  display: flex;
  border-radius: 7px;
  background-color: white;
  padding: 10px 15px;

  @media screen and (min-width: 769px) {
    padding: 20px 25px;
  }
`;

const ItemContent = styled(Link)`
  width: 100%;
  text-decoration: none;
  /* height: 150px; */
  /* min-height: 180px; */
  display: flex;
  /* position: relative; */
  align-items: center;

  transition: all ease 0.2s;

  @media screen and (min-width: 769px) {
    background-color: rgba(255, 255, 255, 0.9);
  }

  &:hover {
    background-color: white;

    & img {
      transform: scale(1);
    }
  }
`;

const ImageContainer = styled.div`
  flex: 1 1 100px;
  border-radius: 10px;
  height: 80px;
  display: flex;
  overflow: hidden;
  align-items: center;

  @media screen and (min-width: 769px) {
    height: 100px;
  }
`;

const Image = styled.img`
  transition: 1s ease all;
  transform: scale(1.2);
  width: 100%;
`;

const TextSection = styled.div`
  flex: 3 1 40%;
  margin-left: 15px;
  align-self: stretch;
  display: flex;
  padding: 5px 0;
  flex-direction: column;
  justify-content: space-between;
  gap: 3px;

  @media screen and (min-width: 769px) {
    flex-grow: 2;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
`;

const ContentRow = styled.div`
  /* display: none; */
  padding-left: 5px;

  @media screen and (min-width: 769px) {
    display: unset;
  }
`;

const Title = styled.h1`
  font-size: 1.3em;
  color: ${theme.darkbrown};
  font-weight: bold;
  letter-spacing: 1.5px;
  flex-shrink: 1;
  line-height: 1.4;
`;

const LiItem = styled.li`
  font-size: 0.8em;
  /* padding: 4px 15px; */
  /* border-radius: 100px; */
  word-break: break-all;
  letter-spacing: 1.5px;
`;

const H2 = styled.h2`
  font-size: 0.9em;
  color: ${theme.darkbrown};
`;

const UsedLeftovers = styled.ul`
  display: flex;
  gap: 7px 10px;
  flex-wrap: wrap;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-left: 10px;
`;
const UsedLeftover = styled(LiItem)`
  border-bottom: 1px solid #00dd00;
  color: #00dd00;
`;
const NeededLeftovers = styled.ul`
  display: flex;
  gap: 7px 10px;
  flex-wrap: wrap;
  padding-top: 10px;
  padding-left: 10px;
`;

const NeededLeftover = styled(LiItem)`
  border-bottom: 1.5px solid ${theme.orange};
  /* color: red; */
  color: black;
`;

const ButtonContent = styled.div`
  align-self: flex-start;
  min-width: 30px;
  max-width: 30px;
`;
