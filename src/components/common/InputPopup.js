import { headerConfig, mainContentConfig, theme } from '../../variables';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addInput } from '../../redux/reducers/keyword/keywordActions';
import { GrFormClose, GrFormAdd } from 'react-icons/gr';
import { fraction } from 'mathjs';
import IngredientInput from './IngredientInput';
import { getFractionFromTCAmount, fractionStringToTC } from '../../utils/math';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { uid } from 'react-uid';

const emptyInput = {
  ingredient_name: '',
  ingredient_amount: '',
  ingredient_unit: '',
};

export default function InputPopup({ open, setOpen }) {
  const [inputs, setInputs] = useState([emptyInput]);
  const identity = useSelector((state) => state.user_info.identity);
  const fridge = useSelector((state) => state.user_info.left_overs);
  const d = useDispatch();
  const history = useHistory();

  function addInputField() {
    setInputs([...inputs, emptyInput]);
  }

  function setSingleInputField(input, i) {
    const newInputs = [...inputs.slice(0, i), input, ...inputs.slice(i + 1)];
    setInputs(newInputs);
  }

  function removeSingleInputField(i) {
    let newInputs = [...inputs.slice(0, i), ...inputs.slice(i + 1)];
    if (newInputs.length === 0) newInputs = [emptyInput];
    setInputs(newInputs);
  }

  function addAllInputFields() {
    inputs.forEach((input) => {
      if (input.ingredient_name) d(addInput(input));
      setInputs([emptyInput]);
    });

    setOpen(false);
  }

  function addAllFridgeItemsToInput() {
    if (identity === 'none') return history.push('/login');
    setInputs(fridge);
  }

  return (
    <>
      {/* <ButtonContainer onClick={() => setOpen(true)}>
        <AddIcon></AddIcon>
      </ButtonContainer> */}
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
              <Field key={uid(input)}>
                <IngredientInput
                  ingredient={input}
                  removeLeftover={() => removeSingleInputField(i)}
                  setLeftover={(leftover) => setSingleInputField(leftover, i)}
                />
                <Button>
                  <RemoveInputIcon
                    onClick={() => removeSingleInputField(i)}
                  ></RemoveInputIcon>
                </Button>
              </Field>
            );
          })}
        </Form>
        <ButtonGroup>
          <AddFromFridgeButton onClick={addAllFridgeItemsToInput}>
            使用冰箱食材
          </AddFromFridgeButton>
          <ConfirmButton onClick={addAllInputFields}>確認新增</ConfirmButton>
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
  display: flex;
  align-items: center;
  margin-left: auto;
  &:hover {
    transform: scale(1.3);
  }
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
  background-color: rgba(122, 122, 122, 0.2);
  transition: all ease 0.2s;

  &:hover,
  &:focus {
    background-color: rgba(122, 122, 122, 0.1);
  }
`;

const AddInputIcon = styled(GrFormAdd)`
  font-size: 1.4em;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
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
  transition: all ease 0.3s;

  &:hover {
    border-radius: 20px;
  }
`;

const AddFromFridgeButton = styled(Button)`
  color: ${theme.darkbrown};
  background-color: #ececec;

  &:hover {
    background-color: ${theme.darkbrown};
    color: white;
  }
`;
const ConfirmButton = styled(Button)`
  background-color: ${theme.darkbrown};
  letter-spacing: 1.5px;
  color: white;
`;
