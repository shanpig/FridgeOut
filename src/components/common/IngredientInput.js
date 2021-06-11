import styled from 'styled-components';
import { useState, useRef } from 'react';
import { AiFillSave, AiFillDelete, AiFillEdit } from 'react-icons/ai';
import ClickAwayListener from 'react-click-away-listener';

export default function IngredientInput({
  ingredient: {
    ingredient_name: name,
    ingredient_amount: amount,
    ingredient_unit: unit,
  },
  removeLeftover,
  setLeftover,
}) {
  console.log('i got ', name);
  const FORM = useRef(null);
  let defaultEditState = name.length === 0;
  const [isEditing, setIsEditing] = useState(defaultEditState);
  const [error, setError] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newAmount, setNewAmount] = useState(amount);
  const [newUnit, setNewUnit] = useState(unit);

  function onTextChange(newText, setState) {
    console.log(newText);
    setState(newText);
  }

  function saveEdition() {
    if (!FORM.current.checkValidity()) {
      setError(true);
      return;
    }
    setError(false);
    const newIngredient = {
      ingredient_name: newName,
      ingredient_amount: newAmount,
      ingredient_unit: newUnit,
    };
    console.log('writing new ingredient: ', newIngredient);
    setLeftover(newIngredient);
    setIsEditing(false);
  }

  return (
    <ClickAwayListener onClickAway={() => setIsEditing(false)}>
      <Ingredient.Edit ref={FORM} error={error}>
        <NameField>
          <Input
            required
            key="1"
            type="text"
            value={newName}
            placeholder="雞肉"
            onChange={(e) => onTextChange(e.target.value, setNewName)}
          ></Input>
        </NameField>
        <AmountField>
          <Input
            key="2"
            type="number"
            min={0}
            step={0.5}
            value={newAmount}
            placeholder="100"
            onChange={(e) => onTextChange(e.target.value, setNewAmount)}
          ></Input>
        </AmountField>
        <UnitField>
          <Input
            key="3"
            type="text"
            value={newUnit}
            placeholder="g"
            onChange={(e) => onTextChange(e.target.value, setNewUnit)}
          ></Input>
        </UnitField>
        {/* <Buttons>
          <SaveButton onClick={saveEdition}>save</SaveButton>
          <RemoveButton onClick={removeLeftover}>remove</RemoveButton>
        </Buttons> */}
      </Ingredient.Edit>
    </ClickAwayListener>
  );
}

const Edit = styled.form`
  display: flex;
  align-items: center;
  gap: 5px;
  box-sizing: border-box;
  width: 300px;

  & input {
    border: ${(props) => (props.error ? '1px solid red' : 'none')};
    background-color: ${(props) =>
      props.error ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.15)'};
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
  /* min-width: 100px;
  max-width: 200px; */
`;
const AmountField = styled(Field)`
  flex-grow: 1;
  flex-shrink: 3;
  /* max-width: 100px; */
`;
const UnitField = styled(AmountField)``;

const Input = styled.input`
  color: black;
  outline: none;
  border-radius: 0;
  padding: 5px;
  width: 100%;

  &:focus {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
