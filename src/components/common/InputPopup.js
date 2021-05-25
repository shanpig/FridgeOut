import { theme } from '../../variables';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addInput } from '../../redux/reducers/keyword/keywordActions';
import { GrFormClose, GrFormAdd } from 'react-icons/gr';
import { fraction } from 'mathjs';

export default function InputPopup({ open, setOpen }) {
  const [inputs, setInputs] = useState(['']);
  const d = useDispatch();

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
      ingredient_amount = fraction(ingredient_amount);
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

  return (
    <Popup open={open}>
      <Title>輸入剩食 (例：雞肉 100 克)</Title>
      <Form action=''>
        {inputs.map((input, i) => {
          return (
            <Field key={i}>
              <input
                type='text'
                value={input}
                onChange={(e) => onTextChange(e, i)}
                disabled={i !== inputs.length - 1}
              />
              <GrFormClose onClick={() => removeInputField(i)} />
            </Field>
          );
        })}
        <GrFormAdd onClick={() => addInputField()} />
      </Form>
      <ButtonGroup>
        <AddFromFridgeButton onClick={() => {}}>
          從我的冰箱加入
        </AddFromFridgeButton>
        <ConfirmButton onClick={() => addAllInputs()}>確認新增</ConfirmButton>
      </ButtonGroup>
    </Popup>
  );
}

const Popup = styled.div`
  padding: 10px 20px;
  border: 1px solid ${theme.orange};
  display: ${(props) => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  gap: 10px;
  position: absolute;
  background-color: white;
  border-radius: 5px;
  top: calc(100% + 10px);
  right: 0;
  z-index: 10;
  min-width: 300px;
  width: fit-content;
`;

const Title = styled.h1``;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8em;
`;

const AddFromFridgeButton = styled.button`
  border: 1px solid ${theme.orange};
  font-size: 0.8em;
  padding: 5px 10px;
  border-radius: 20px;
`;
const ConfirmButton = styled.button`
  background-color: ${theme.orange};
  font-size: 0.8em;
  padding: 5px 10px;
  border-radius: 20px;
`;
