import { useState, useRef } from 'react';

import styled from 'styled-components';

export default function RecipeIngredientInput({ ingredient, setLeftover }) {
  const AMOUNT = useRef(null);
  const [error, setError] = useState(false);

  function onAmountChange(newText, key) {
    const value = AMOUNT.current.value;

    if (value.match(/[^0-9.]/g)) setError(true);
    else setError(false);

    onTextChange(newText, key);
  }

  function onTextChange(newText, key) {
    const text = newText.trim();
    setLeftover({
      ...ingredient,
      [key]: text,
    });
  }

  return (
    <Ingredient.Edit error={error}>
      <NameField>
        <Input
          required
          key="1"
          type="text"
          value={ingredient ? ingredient.ingredient_name : ''}
          placeholder="雞肉"
          onChange={(e) => onTextChange(e.target.value, 'ingredient_name')}
        />
      </NameField>
      <AmountField>
        <Input
          key="2"
          type="number"
          min={0}
          ref={AMOUNT}
          error={error}
          step={0.5}
          value={ingredient.ingredient_amount}
          placeholder="100"
          onChange={(e) => onAmountChange(e.target.value, 'ingredient_amount')}
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
    </Ingredient.Edit>
  );
}

const Edit = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  box-sizing: border-box;

  & input {
    border: ${(props) => (props.error ? '1px solid red' : 'none')};
    background-color: ${(props) =>
      props.error ? 'rgba(255, 0, 0, 0.2)' : 'rgba(255,255,255,0.3)'};
  }
`;

const Display = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  &:hover {
    background-color: #cfcfcf;
  }
`;

const Ingredient = {
  Edit,
  Display,
};

const Field = styled.div`
  flex-basis: 30px;
  min-width: 30px;
`;

const NameField = styled(Field)`
  flex-grow: 3;
  & input {
    padding-left: 15px;
    border-radius: 20px 0 0 20px;
  }
`;
const AmountField = styled(Field)`
  flex-grow: 1;
  flex-shrink: 3;
`;
const UnitField = styled(AmountField)`
  & input {
    border-radius: 0 20px 20px 0;
  }
`;

const Input = styled.input`
  color: black;
  outline: none;
  padding: 5px 10px;
  width: 100%;
  transition: background-color 0.2s ease;

  &::placeholder {
    color: #aaa;
  }

  &::-webkit-inner-spin-button {
    appearance: none;
  }

  &:hover,
  &:focus {
    background-color: ${(props) =>
      props.error ? 'rgba(255, 0, 0, 0.2)' : 'white'};
  }
`;
