import { headerConfig, mainContentConfig, theme } from '../../variables';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addInput } from '../../redux/reducers/keyword/keywordActions';
import { GrFormClose, GrFormAdd } from 'react-icons/gr';
import { fraction } from 'mathjs';
import IngredientInput from './IngredientInput';
import { getFractionFromTCAmount, fractionStringToTC } from '../../utils/math';
import { Link, useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
// import { uid } from 'react-uid';
import { v1 as uid } from 'uuid';
import { addLeftOver } from '../../redux/reducers/user/userActions';

const emptyInput = {
  ingredient_name: '',
  ingredient_amount: '',
  ingredient_unit: '',
  input_uid: uid(),
};

export default function InputPopup({ open, setOpen }) {
  const [inputs, setInputs] = useState([emptyInput]);
  const ADDTOFRIDGE = useRef(null);
  const isLoggedIn = useSelector(
    (state) => state.user_info.identity !== 'none'
  );
  const fridge = useSelector((state) => state.user_info.left_overs);
  const d = useDispatch();
  const history = useHistory();

  function addInputField() {
    const input = { ...emptyInput, input_uid: uid() };
    setInputs([...inputs, input]);
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
      console.log(input);
      if (input.ingredient_name) {
        d(addInput(input));
        if (isLoggedIn && ADDTOFRIDGE.current.checked) d(addLeftOver(input));
      }
    });

    setInputs([emptyInput]);
    setOpen(false);
  }

  // function addAllFridgeItemsToInput() {
  //   if (identity === 'none') return history.push('/login');
  //   const newInputs = fridge.map((input) => {
  //     input.input_uid = uid();
  //     return input;
  //   });
  //   setInputs(newInputs);
  // }

  return (
    <StyledPopup
      offsetY={15}
      open={open}
      onClose={() => setOpen(false)}
      modal={true}
      position="top right"
      closeOnDocumentClick
    >
      <Title>輸入剩食 (例：雞肉 100 克)</Title>
      <Form action="">
        {inputs.map((input, i) => {
          return (
            <Field key={input.input_uid}>
              <IngredientInput
                ingredient={input}
                removeLeftover={() => removeSingleInputField(i)}
                setLeftover={(leftover) => setSingleInputField(leftover, i)}
              />
              <RemoveInputButton>
                <RemoveInputIcon onClick={() => removeSingleInputField(i)} />
              </RemoveInputButton>
            </Field>
          );
        })}
        <AddInputButton onClick={addInputField}>加入食材</AddInputButton>
      </Form>
      {isLoggedIn ? (
        <></>
      ) : (
        <LabelText>
          <LoginText to="/login">登入</LoginText>
          之後可同步新增至我的冰箱，下次輸入時便不須重新輸入。
        </LabelText>
      )}
      <ButtonGroup>
        {isLoggedIn ? (
          <AddToFridgeOption htmlFor="addToFridge">
            <AddToFridgeCheckbox
              ref={ADDTOFRIDGE}
              type="checkbox"
              name=""
              id="addToFridge"
            />
            <LabelText>同步新增到冰箱</LabelText>
          </AddToFridgeOption>
        ) : (
          <></>
        )}
        <ConfirmButton onClick={addAllInputFields}>確認新增</ConfirmButton>
      </ButtonGroup>
    </StyledPopup>
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

    & h1,
    input {
      color: ${theme.darkbrown};
    }

    @media screen and (min-width: 400px) {
      border-radius: 5px;
    }
  }
`;

const AddInputButton = styled.div`
  width: 100%;
  color: ${theme.darkbrown};
  text-align: center;
  background-color: #eee;
  border-radius: 20px;
  padding: 4px;
  margin-top: 5px;

  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }

  @media screen and (min-width: 400px) {
    padding: 7px;
  }
`;

const Title = styled.h1`
  font-size: 0.9em;
  font-family: 'Roboto';
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  font-size: 0.8em;
  padding: 5px 10px;
  /* border-bottom: 1px solid black; */
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  transition: all ease 0.2s;

  &:hover {
    border-radius: 20px;
  }
`;

const RemoveInputButton = styled(Button)`
  padding: 0;
  &:hover {
    transform: scale(1.5);
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
  margin-top: 10px;
`;

const AddToFridgeOption = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  /* margin-top: 10px; */
`;

const LabelText = styled.div`
  color: ${theme.darkbrown};
  white-space: break-all;
  font-size: 0.8em;
  line-height: 1.5;
`;

const LoginText = styled(Link)`
  color: ${theme.darkbrown};
  text-decoration: none;
  border-bottom: 1px solid ${theme.darkbrown};
`;

const AddToFridgeCheckbox = styled.input``;

// const AddFromFridgeButton = styled(Button)`
//   color: ${theme.darkbrown};
//   background-color: #ececec;

//   &:hover {
//     background-color: ${theme.darkbrown};
//     color: white;
//   }
// `;

const ConfirmButton = styled(Button)`
  background-color: ${theme.darkbrown};
  letter-spacing: 1.5px;
  color: white;
`;
