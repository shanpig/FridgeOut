import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { AiFillSave, AiFillDelete, AiFillEdit } from 'react-icons/ai';

export default function IngredientInput({
  ingredient,
  removeLeftover,
  setLeftover,
}) {
  const FORM = useRef(null);
  const [error, setError] = useState(false);

  // const [ingredientInput, setIngredientInput] = useState(ingredient);

  function onTextChange(newText, key) {
    const text = newText.trim();
    setLeftover({
      ...ingredient,
      [key]: text,
    });
  }

  return (
    <Ingredient.Edit ref={FORM} error={error}>
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
    </Ingredient.Edit>
  );
}

const Edit = styled.form`
  display: flex;
  align-items: center;
  gap: 3px;
  box-sizing: border-box;
  max-width: 300px;

  & input {
    border: ${(props) => (props.error ? '1px solid red' : 'none')};
    background-color: ${(props) =>
      props.error ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'};
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

const Buttons = styled.div`
  margin-left: auto;
  display: flex;
  gap: 5px;
`;
const EditButton = styled(AiFillEdit)`
  width: 30px;
  font-size: 20px;
  cursor: pointer;
  fill: black;
  &:hover {
    transform: scale(1.3);
  }
`;
const RemoveButton = styled(AiFillDelete)`
  width: 30px;
  font-size: 20px;
  cursor: pointer;
  fill: black;
  &:hover {
    transform: scale(1.3);
    fill: red;
  }
`;
const SaveButton = styled(AiFillSave)`
  width: 30px;
  font-size: 20px;
  cursor: pointer;
  fill: black;
  &:hover {
    transform: scale(1.3);
  }
`;
const Text = styled.p`
  padding: 5px;
  color: black;
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
  /* min-width: 100px;
  max-width: 200px; */
`;
const AmountField = styled(Field)`
  flex-grow: 1;
  flex-shrink: 3;
  /* max-width: 100px; */
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
