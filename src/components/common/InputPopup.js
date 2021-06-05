import { headerConfig, mainContentConfig, theme } from '../../variables';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addInput } from '../../redux/reducers/keyword/keywordActions';
import { GrFormClose, GrFormAdd } from 'react-icons/gr';
import { fraction } from 'mathjs';
import { getFractionFromTCAmount, fractionStringToTC } from '../../utils/math';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';

export default function InputPopup() {
  const [open, setOpen] = useState(false);
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
    <>
      {/* <Mask isOpen={open} onClick={() => setOpen(false)} /> */}
      <ButtonContainer onClick={() => setOpen(true)}>
        <AddIcon></AddIcon>
      </ButtonContainer>
      <StyledPopup
        offsetY={15}
        open={open}
        onClose={() => setOpen(false)}
        modal={true}
        position="top right"
        closeOnDocumentClick
      >
        <Title
          onClick={() => {
            console.log('close');
            setOpen(false);
          }}
        >
          輸入剩食 (例：雞肉 100 克)
        </Title>
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
                  <AddInputIcon onClick={() => addInputField()} />
                ) : (
                  <RemoveInputIcon onClick={() => removeInputField(i)} />
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
      </StyledPopup>
    </>
  );
}

const StyledPopup = styled(Popup)`
  &-overlay {
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
  &-content {
    padding: 20px 30px;
    flex-direction: column;
    display: flex;
    gap: 10px;
    background-color: white;
    border-radius: 5px;

    & h1,
    input {
      color: ${theme.darkbrown};
    }
  }
`;

const ButtonContainer = styled.button`
  margin-left: auto;
`;

const AddIcon = styled(GrFormAdd)`
  transform: scale(1.5);
  min-width: 20px;
  min-height: 20px;

  cursor: pointer;

  @media screen and (min-width: 769px) {
    transform: scale(1.2);
    font-size: 1em;
  }
`;

// const Popup = styled.div`
//   padding: 10px 20px;
//   display: ${(props) => (props.open ? 'flex' : 'none')};
//   flex-direction: column;
//   gap: 10px;
//   position: absolute;
//   background-color: white;
//   border-radius: 1px;
//   top: calc(100% + 10px);
//   right: 0;
//   z-index: 999;
//   min-width: 300px;
//   width: fit-content;
// `;

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 1);
  display: ${(props) => (props.open ? 'unset' : 'none')};
`;

const Title = styled.h1`
  font-size: 0.9em;
  font-family: 'Roboto';
`;

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
  font-size: 1.1em;
  outline: none;
  border: none;
  padding: 3px 7px;
  border-bottom: 1px solid ${theme.orange};
  position: relative;
  background-color: rgba(122, 122, 122, 0.1);
`;

const AddInputIcon = styled(GrFormAdd)`
  font-size: 1.4em;
`;

const RemoveInputIcon = styled(GrFormClose)`
  font-size: 1.4em;
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
  /* border-bottom: 1px solid black; */
  cursor: pointer;
  position: relative;
  border-radius: 4px;
`;

const AddFromFridgeButton = styled(Button)`
  color: ${theme.darkbrown};
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    z-index: -1;
    background-color: ${theme.darkbrown};
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
  background-color: ${theme.darkbrown};
  color: white;
  &::after {
    height: 100%;
  }
`;
