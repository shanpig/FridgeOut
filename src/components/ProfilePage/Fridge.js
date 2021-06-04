import { theme } from '../../variables';
import { useRef, useEffect, useState } from 'react';
import styled, { isStyledComponent } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AiTwotoneEdit, AiFillSave, AiOutlinePlus } from 'react-icons/ai';
import { fractionStringToTC, isValidNumberString } from '../../utils/math';
import { setLeftOvers } from '../../redux/reducers/user/userActions';
import FridgeIngredient from './FridgeIngredient';

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
  // function checkIngredientsTextValidity() {
  //   const inputLines = ingredientsText.trim().split(/[\r\n]+/g);
  //   let leftovers = [];

  //   for (let line of inputLines) {
  //     let trimmedLine = line.trim();
  //     console.log(
  //       '🚀 ~ file: Fridge.js ~ line 20 ~ checkIngredientsTextValidity ~ trimmedLine',
  //       trimmedLine
  //     );
  //     if (!trimmedLine) continue;

  //     let ingredient = trimmedLine.split(' ');
  //     if (ingredient.length !== 3 && ingredient.length !== 1)
  //       console.log("ingredient doesn't have three or one part");
  //     else if (isValidNumberString(ingredient)) console.log('wrong format');
  //     else {
  //       let [ingredient_name, ingredient_amount, ingredient_unit] = ingredient;
  //       leftovers.push({ ingredient_name, ingredient_amount, ingredient_unit });
  //     }
  //   }
  //   console.log(leftovers);

  //   d(setLeftOvers(leftovers));
  // }

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
    <FridgeContent>
      {leftovers.map((ingredient, i) => (
        <FridgeIngredient
          key={i}
          ingredient={ingredient}
          removeLeftover={() => removeSingleLeftover(i)}
          setLeftover={(leftover) => setSingleLeftover(leftover, i)}
        />
      ))}
      <AddButton onClick={addNewLeftover}>
        <AddIcon />
      </AddButton>
    </FridgeContent>
  );
}

const FridgeContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  background-color: white;
  padding: 10px;
`;

const AddButton = styled.div`
  width: 100%;
  /* min-width: 20px;
  max-width: 100px; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto 0;
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
  padding: 3px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const AddIcon = styled(AiOutlinePlus)`
  fill: black;
`;
