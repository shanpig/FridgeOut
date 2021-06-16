import { RiFridgeFill } from 'react-icons/ri';

import { theme } from '../../variables';

import GoBackButton from '../common/GoBackButton';

import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Animated } from 'react-animated-css';

import { post } from '../../utils/firebase';

const ReactSwal = withReactContent(Swal);

const SWAL_CONFIG = {
  customClass: {
    cancelButton: 'popup_button popup_button-cancel',
    confirmButton: 'popup_button popup_button-confirm',
    actions: 'actions',
    icon: 'icon',
  },
  buttonsStyling: false,
  reverseButtons: true,
};
const SWAL_FIRE_CONFIG = {
  showCancelButton: true,
  cancelButtonText: '去我的冰箱',
  confirmButtonText: '取消',
  icon: 'warning',
};

function findIngredientByName(list, ingredientName) {
  return list.find((item) => item.ingredient_name === ingredientName);
}

export default function PostQueryForm() {
  const history = useHistory();
  const [selected, setSelected] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const user = useSelector((state) => state.user_info);
  const fridge = useSelector((state) => state.user_info.left_overs);

  useEffect(() => {
    function checkIngredients() {
      const fridgeIsEmpty = fridge.length === 0;
      if (fridgeIsEmpty) showFridgeIsEmptyPrompt();
    }

    function showFridgeIsEmptyPrompt() {
      ReactSwal.mixin(SWAL_CONFIG)
        .fire({
          title: <PopupText>你的冰箱沒有食材喔</PopupText>,
          html: (
            <PopupText>
              你可以在輸入食材搜尋的同時，將食材加入冰箱，或是直接到我的冰箱進行輸入。
            </PopupText>
          ),
          ...SWAL_FIRE_CONFIG,
        })
        .then((result) => {
          if (result.dismiss === Swal.DismissReason.cancel) {
            history.push(`/profile/${user.name}/fridge`);
          }
        });
    }

    const isLoggedIn = user.identity !== 'none';
    if (isLoggedIn) checkIngredients();
  }, [user, fridge.length, history]);

  function isSelected(leftover) {
    return (
      selected.findIndex(
        (target) => target.ingredient_name === leftover.ingredient_name
      ) >= 0
    );
  }

  function selectionHandler(e) {
    if (e.target.checked) {
      let ingredient = findIngredientByName(user.left_overs, e.target.value);
      setSelected((selected) => [...selected, ingredient]);
    } else {
      setSelected((selected) =>
        selected.filter((s) => s.ingredient_name !== e.target.value)
      );
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    setIsUploading(true);
    const message = {
      type: 'query',
      by: user.name,
      id: user.id,
      ingredients: selected,
      profile_image: user.profile,
    };

    post(message).then(() => {
      setIsUploading(false);
      history.goBack();
    });
  }

  if (!user) return <></>;
  else if (user.identity === 'none') return <Redirect to="/login" />;
  return (
    <Main>
      <GoBackButton />
      <Title>選擇你想要發問的食材</Title>
      <Animated>
        <QueryForm action="" onSubmit={submitHandler}>
          <FridgeList>
            <FridgeIcon
              onClick={() => history.push(`/profile/${user.name}/fridge`)}
            />
            {user.left_overs.map((leftover, i) => (
              <Field className="field" key={i} selected={isSelected(leftover)}>
                <Input
                  type="checkbox"
                  name=""
                  id={leftover.ingredient_name}
                  value={leftover.ingredient_name}
                  onChange={selectionHandler}
                />
                <Label htmlFor={leftover.ingredient_name}>
                  {leftover.ingredient_name} {leftover.ingredient_amount}{' '}
                  {leftover.ingredient_unit}
                </Label>
              </Field>
            ))}
          </FridgeList>
          <ToBeAddedList>
            {selected.map((ingredient, i) => (
              <Field
                className="field"
                key={i}
                selected={isSelected(ingredient)}
              >
                <Input
                  type="checkbox"
                  name=""
                  id={ingredient.ingredient_name}
                  value={ingredient.ingredient_name}
                  onChange={selectionHandler}
                />
                <SelectedLabel htmlFor={ingredient.ingredient_name}>
                  {ingredient.ingredient_name} {ingredient.ingredient_amount}{' '}
                  {ingredient.ingredient_unit}
                </SelectedLabel>
              </Field>
            ))}
            <Submit
              disabled={fridge.length === 0 || selected.length === 0}
              type="submit"
              value={isUploading ? '上傳中...' : '確認送出'}
            />
          </ToBeAddedList>
        </QueryForm>
      </Animated>
    </Main>
  );
}

const Main = styled.main`
  padding: 10px;
  position: relative;

  @media screen and (min-width: 769px) {
    padding: 60px 42px;
  }
`;

const QueryForm = styled.form`
  padding: 30px;
  max-width: 600px;
  min-height: 300px;
  margin: 20px auto;
  border-radius: 20px;
  display: flex;
  align-items: stretch;
  gap: 0 20px;

  @media screen and (min-width: 769px) {
  }
`;

const Title = styled.h1`
  font-size: 1.2em;
  margin-bottom: 10px;
  text-align: center;
  color: white;
`;

const FridgeList = styled.div`
  flex: 1 1 50%;
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;

  & * {
    color: ${theme.darkbrown};
  }
`;
const FridgeIcon = styled(RiFridgeFill)`
  position: relative;
  margin: -40px auto 10px;
  cursor: pointer;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: white;
  padding: 10px;
  border: 3px solid ${theme.darkbrown};
  &:hover {
    transform: scale(1.1);
  }
`;

const ToBeAddedList = styled.div`
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 10px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
`;

const Field = styled.div`
  padding: 6px 20px;
  width: fit-content;
  border-radius: 20px;
  background-color: ${(props) =>
    props.selected ? `${theme.darkbrown}` : '#ddd'};
  transition: 0.3s ease all;

  &:hover {
    background-color: ${(props) => (props.selected ? `#aaa` : '#bababa')};
  }

  & label {
    color: ${(props) => (props.selected ? `white` : `${theme.darkbrown}`)};
  }
`;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  letter-spacing: 1px;
  cursor: pointer;
`;

const SelectedLabel = styled(Label)``;

const Submit = styled.input`
  margin-top: 30px;
  padding: 5px 0;
  cursor: pointer;
  border-radius: 10px;
  letter-spacing: 3px;
  margin-top: auto;
  color: ${(props) => (props.disabled ? '#999' : 'white')};
  background-color: ${(props) =>
    props.disabled ? `#ccc` : `${theme.darkbrown}`};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'initial')};
  transition: all ease 0.2s;
  border: none;
  width: 100%;

  &:hover {
    border-radius: 20px;
  }
`;

const PopupText = styled.div`
  color: ${theme.darkbrown};
`;
