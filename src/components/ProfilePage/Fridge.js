import { theme } from '../../variables';
import styled, { isStyledComponent } from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Prompt } from 'react-router-dom';
import { AiTwotoneEdit, AiFillSave, AiOutlinePlus } from 'react-icons/ai';
import { fractionStringToTC, isValidNumberString } from '../../utils/math';
import { setLeftOvers } from '../../redux/reducers/user/userActions';
import FridgeIngredient from './FridgeIngredient';
import { Animated } from 'react-animated-css';
import EmptyMessage from './EmptyMessage';
import { uid } from 'react-uid';

export default function Fridge() {
  const d = useDispatch();
  const firstUpdate = useRef(true);
  const [isEditing, setIsEditing] = useState(false);
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
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (isEditing) return;
    console.log('leftovers', leftovers);
  }, [isEditing]);

  // useEffect(() => {
  //   const ingredientsText = fridge
  //     .map(
  //       ({
  //         ingredient_name: name,
  //         ingredient_amount: amount,
  //         ingredient_unit: unit,
  //       }) => {
  //         if (isValidNumberString(amount))
  //           return `${name} ${fractionStringToTC(amount) || ''} ${unit || ''}`;
  //       }
  //     )

  //   setIngredientsText(ingredientsText);
  // }, [fridge]);
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
      {/* <Prompt when={true} message={'你有食材還未儲存'} /> */}
      <AddButton onClick={addNewLeftover}>
        {leftovers.length === 0 ? <Text>點我加入食材...</Text> : <AddIcon />}
      </AddButton>
    </Animated>
  );
}

const FridgeContent = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  background-color: white;
  padding: 15px 10px 10px;
  /* margin-left: 20px; */
  border-radius: 5px;
`;

const AddButton = styled.div`
  width: 100%;
  /* min-width: 20px;
  max-width: 100px; */
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
