import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addInput } from '../../redux/reducers/keyword/keywordActions';

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
      const [ingredient_name, ingredient_amount, ingredient_unit] =
        input.split(' ');
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
      <Title>輸入剩食</Title>
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
              <button onClick={() => removeInputField(i)}>X{i}</button>
            </Field>
          );
        })}
        <button onClick={() => addInputField()}>+</button>
      </Form>
      <div>
        <button onClick={() => {}}>從我的冰箱加入</button>
        <button onClick={() => addAllInputs()}>確認新增</button>
      </div>
    </Popup>
  );
}

const Popup = styled.div`
  padding: 10px;
  display: ${(props) => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h1``;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Field = styled.div``;
