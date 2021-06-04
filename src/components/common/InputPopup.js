import { theme } from '../../variables';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addInput } from '../../redux/reducers/keyword/keywordActions';
import { GrFormClose, GrFormAdd } from 'react-icons/gr';
import { fraction } from 'mathjs';
import { getFractionFromTCAmount, fractionStringToTC } from '../../utils/math';
import { useHistory } from 'react-router-dom';

export default function InputPopup({ open, setOpen }) {
  const [inputs, setInputs] = useState(['']);
  const identity = useSelector((state) => state.user_info.identity);
  const fridge = useSelector((state) => state.user_info.left_overs);
  const d = useDispatch();
  const history = useHistory();

  function addInputField() {
    let lastInput = inputs[inputs.length - 1];
    if (inputs.length && !lastInput.length) return;

    setInputs([...inputs, '']);
  }

  function removeInputField(i) {
    setInputs([...inputs.slice(0, i), ...inputs.slice(i + 1)]);
  }

  function onTextChange(e, i) {
    const text = e.target.value;
    setInputs([...inputs.slice(0, i), text, ...inputs.slice(i + 1)]);
  }

  function addAllInputs() {
    inputs.forEach((input) => {
      input = input.replace(/ +/g, ' ').trim();
      if (!input.length) return;
      let [ingredient_name, ingredient_amount, ingredient_unit] =
        input.split(' ');
      ingredient_amount = getFractionFromTCAmount(ingredient_amount);
      d(
        addInput({
          ingredient_name,
          ingredient_amount,
          ingredient_unit,
        })
      );
      setInputs(['']);
    });

    setOpen(false);
  }

  function addAllFridgeItems() {
    if (identity === 'none') return history.push('/login');
    let ingredients = fridge.map(
      (leftovers) =>
        `${leftovers.ingredient_name} ${fractionStringToTC(
          leftovers.ingredient_amount
        )} ${leftovers.ingredient_unit}`
    );
    setInputs(ingredients);
  }

  return (
    <Popup open={open}>
      <Mask onClick={() => setOpen(false)} />
      <Title>輸入剩食 (例：雞肉 100 克)</Title>
      <Form action="">
        {inputs.map((input, i) => {
          return (
            <Field key={i}>
              <TextInput
                type="text"
                value={input}
                onChange={(e) => onTextChange(e, i)}
                // disabled={i !== inputs.length - 1}
              />
              {i === inputs.length - 1 ? (
                <GrFormAdd onClick={() => addInputField()} />
              ) : (
                <GrFormClose onClick={() => removeInputField(i)} />
              )}
            </Field>
          );
        })}
      </Form>
      <ButtonGroup>
        <AddFromFridgeButton onClick={() => addAllFridgeItems()}>
          使用冰箱食材
        </AddFromFridgeButton>
        <ConfirmButton onClick={() => addAllInputs()}>確認新增</ConfirmButton>
      </ButtonGroup>
    </Popup>
  );
}

const Popup = styled.div`
  padding: 10px 20px;
  display: ${(props) => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  gap: 10px;
  position: absolute;
  background-color: white;
  border-radius: 1px;
  top: calc(100% + 10px);
  right: 0;
  z-index: 10;
  min-width: 300px;
  width: fit-content;
`;

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
`;

const Title = styled.h1``;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TextInput = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid ${theme.orange};
  position: relative;
  background-color: rgba(122, 122, 122, 0.1);
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8em;
`;

const Button = styled.button`
  font-size: 0.8em;
  padding: 5px 10px;
  border-bottom: 1px solid black;
  cursor: pointer;
  position: relative;
`;

const AddFromFridgeButton = styled(Button)`
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0;
    z-index: -1;
    background-color: black;
    transition: height ease 0.1s;
  }
  &:hover {
    color: white;
    &::after {
      height: 100%;
    }
  }
`;
const ConfirmButton = styled(Button)`
  background-color: black;
  color: white;
  &::after {
    height: 100%;
  }
`;
