import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AiTwotoneEdit } from 'react-icons/ai';
import { fractionStringToTC } from '../../utils/math';
import { setLeftOvers } from '../../redux/reducers/user/userActions';

export default function Fridge() {
  const d = useDispatch();
  const firstUpdate = useRef(true);
  const [isEditing, setIsEditing] = useState(false);
  const fridge = useSelector((state) => state.user_info.left_overs);
  const [ingredientsText, setIngredientsText] = useState('');

  function checkIngredientsTextValidity() {
    const inputLines = ingredientsText.trim().split(/[\r\n]+/g);
    let leftovers = [];

    for (let line of inputLines) {
      let trimmedLine = line.trim();
      console.log(
        '🚀 ~ file: Fridge.js ~ line 20 ~ checkIngredientsTextValidity ~ trimmedLine',
        trimmedLine
      );

      if (!trimmedLine) continue;
      let ingredient = trimmedLine.split(' ');
      if (ingredient.length > 3) console.log(ingredient);
      else {
        let [ingredient_name, ingredient_amount, ingredient_unit] = ingredient;
        leftovers.push({ ingredient_name, ingredient_amount, ingredient_unit });
      }
    }
    console.log(leftovers);

    d(setLeftOvers(leftovers));
  }

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (isEditing) return;
    checkIngredientsTextValidity();
  }, [isEditing]);

  useEffect(() => {
    const ingredientsText = fridge
      .map(
        ({
          ingredient_name: name,
          ingredient_amount: amount,
          ingredient_unit: unit,
        }) => `${name} ${fractionStringToTC(amount) || ''} ${unit || ''}`
      )
      .join('\n');
    setIngredientsText(ingredientsText);
  }, [fridge]);

  return (
    <FridgeContent>
      <Ingredients
        disabled={!isEditing}
        rows={fridge.length + 1}
        onChange={(e) => setIngredientsText(e.target.value)}
        value={ingredientsText}
      />
      <EditButton onClick={() => setIsEditing(!isEditing)} />
    </FridgeContent>
  );
}

const FridgeContent = styled.div`
  position: relative;
  margin: 20px 0;
`;

const Ingredients = styled.textarea`
  width: 100%;
`;

const EditButton = styled(AiTwotoneEdit)`
  position: absolute;
  right: 10px;
  top: 10px;
`;
