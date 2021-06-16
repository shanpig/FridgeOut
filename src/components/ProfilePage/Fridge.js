import { AiOutlinePlus } from 'react-icons/ai';

import { theme } from '../../variables';

import FridgeIngredient from './FridgeIngredient';
import EmptyMessage from './EmptyMessage';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLeftOvers } from '../../redux/reducers/user/userActions';

import { uid } from 'react-uid';
import styled from 'styled-components';
import { Animated } from 'react-animated-css';

export default function Fridge() {
  const d = useDispatch();
  const [leftovers, setLeftovers] = useState([]);
  const fridge = useSelector((state) => {
    const _leftovers = state.user_info.left_overs;
    return _leftovers;
  });

  function setSingleLeftover(leftover, i) {
    const newLeftovers = [
      ...leftovers.slice(0, i),
      leftover,
      ...leftovers.slice(i + 1),
    ];
    setLeftovers(newLeftovers);
    d(setLeftOvers(newLeftovers));
  }

  function removeSingleLeftover(i) {
    const newLeftovers = [...leftovers.slice(0, i), ...leftovers.slice(i + 1)];
    setLeftovers(newLeftovers);
    d(setLeftOvers(newLeftovers));
  }

  function addNewLeftover() {
    const emptyLeftover = {
      ingredient_name: '',
      ingredient_amount: '',
      ingredient_unit: '',
    };
    setLeftovers([...leftovers, emptyLeftover]);
  }

  useEffect(() => {
    setLeftovers(fridge);
  }, [fridge]);

  return (
    <Animated animationIn="fadeIn" animationInDuration={1000}>
      <FridgeContent>
        {leftovers.length === 0 ? (
          <EmptyMessage text="冰箱目前沒有食材喔！" />
        ) : (
          leftovers.map((ingredient, i) => (
            <FridgeIngredient
              key={uid(ingredient)}
              ingredient={ingredient}
              removeLeftover={() => removeSingleLeftover(i)}
              setLeftover={(leftover) => setSingleLeftover(leftover, i)}
            />
          ))
        )}
      </FridgeContent>
      <AddButton onClick={addNewLeftover}>
        {leftovers.length === 0 ? <Text>點我加入食材...</Text> : <AddIcon />}
      </AddButton>
    </Animated>
  );
}

const FridgeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  background-color: white;
  padding: 15px 10px 10px;
  border-radius: 5px;
`;

const AddButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto 0;
  background-color: ${theme.lightOrange};
  cursor: pointer;
  padding: 4px;
  border-radius: 5px;

  &:hover {
    background-color: ${theme.orange};
  }
`;

const Text = styled.div`
  text-align: center;
  margin: 8px 0 5px;
  color: ${theme.darkbrown};
`;

const AddIcon = styled(AiOutlinePlus)`
  font-size: 20px;
  fill: black;
`;
