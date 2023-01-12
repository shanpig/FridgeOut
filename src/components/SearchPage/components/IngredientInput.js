import { useRef } from 'react';

import styled from 'styled-components';

export default function IngredientInput({ ingredient, setLeftover }) {
  const FORM = useRef(null);

  function onTextChange(newText, key) {
    const text = newText.trim();
    setLeftover({
      ...ingredient,
      [key]: text,
    });
  }

  return (
    <IngredientInputField ref={FORM}>
      <NameField>
        <Input
          required
          key="1"
          type="text"
          value={ingredient.ingredient_name}
          placeholder="雞肉"
          onChange={(e) => onTextChange(e.target.value, 'ingredient_name')}
        />
      </NameField>
      <AmountField>
        <Input
          key="2"
          type="number"
          min={0}
          step={0.5}
          value={ingredient.ingredient_amount}
          placeholder="100"
          onChange={(e) => onTextChange(e.target.value, 'ingredient_amount')}
        />
      </AmountField>
      <UnitField>
        <Input
          key="3"
          type="text"
          value={ingredient.ingredient_unit}
          placeholder="g"
          onChange={(e) => onTextChange(e.target.value, 'ingredient_unit')}
        />
      </UnitField>
    </IngredientInputField>
  );
}

const IngredientInputField = styled.form`
  display: flex;
  align-items: center;
  gap: 3px;
  box-sizing: border-box;
  max-width: 300px;

  & input {
    border: none;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Field = styled.div`
  flex-basis: 30px;
  min-width: 30px;
`;

const NameField = styled(Field)`
  flex-grow: 3;
  & input {
    border-radius: 5px 0 0 5px;
  }
`;
const AmountField = styled(Field)`
  flex-grow: 1;
  flex-shrink: 3;
`;
const UnitField = styled(AmountField)`
  & input {
    border-radius: 0 5px 5px 0;
  }
`;

const Input = styled.input`
  color: black;
  outline: none;
  border-radius: 0;
  padding: 5px 10px;
  width: 100%;

  &::placeholder {
    color: #aaa;
  }

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
