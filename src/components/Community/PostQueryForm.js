import { theme } from '../../variables';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { post } from '../../utils/firebase';
import GoBackButton from '../common/GoBackButton';
import { RiFridgeFill } from 'react-icons/ri';

function findIngredientByName(list, ingredientName) {
  return list.find((item) => item.ingredient_name === ingredientName);
}

export default function PostQueryForm() {
  const history = useHistory();
  const user = useSelector((state) => state.user_info);
  const [selected, setSelected] = useState([]);

  function isSelected(leftover) {
    return (
      selected.findIndex(
        (target) => target.ingredient_name === leftover.ingredient_name
      ) >= 0
    );
  }

  function selectionHandler(e) {
    if (e.target.checked) {
      let ing = findIngredientByName(user.left_overs, e.target.value);
      setSelected((selected) => [...selected, ing]);
    } else {
      setSelected((selected) =>
        selected.filter((s) => s.ingredient_name !== e.target.value)
      );
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    if (selected.length === 0)
      return console.log('No ingredient submitted, cannot submit.');
    const message = {
      type: 'query',
      by: user.name,
      id: user.id,
      ingredients: selected,
      profile_image: user.profile,
    };

    post(message).then((id) => {
      console.log('message has posted on doc id: ', id);
      history.goBack();
    });
  }

  if (!user) return <></>;
  else if (user.identity === 'none') return <Redirect to="/login" />;
  return (
    <Main>
      <GoBackButton></GoBackButton>
      <Title>剩食求解</Title>
      <QueryForm>
        <FridgeList action="" onSubmit={submitHandler}>
          <FridgeIcon />
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
            <Item key={i}>
              {ingredient.ingredient_name} {ingredient.ingredient_amount}{' '}
              {ingredient.ingredient_unit}
            </Item>
          ))}
          <Submit type="submit" value="確認送出" />
        </ToBeAddedList>
      </QueryForm>
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

const QueryForm = styled.div`
  padding: 30px;
  max-width: 600px;
  margin: 20px auto;
  border-radius: 20px;
  display: flex;
  gap: 0 20px;

  /* background-color: white; */

  @media screen and (min-width: 769px) {
  }
`;

const Title = styled.h1`
  font-size: 1.2em;
  margin-bottom: 10px;
  text-align: center;
  color: white;
`;

const FridgeList = styled.form`
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

  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: white;
  padding: 10px;
  border: 3px solid ${theme.darkbrown};
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
    props.selected ? `${theme.darkbrown}` : '#eaeaea'};
  transition: 0.3s ease all;

  &:hover {
    background-color: ${(props) => (props.selected ? `#796451` : '#bababa')};
  }

  & label {
    color: ${(props) => (props.selected ? `white` : '${theme.darkbrown}')};
  }
`;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  letter-spacing: 1px;
  cursor: pointer;
`;

const Submit = styled.input`
  margin-top: 30px;
  padding: 5px 0;
  border-radius: 20px;
  cursor: pointer;
  letter-spacing: 3px;
  background-color: ${theme.lightOrange};
  /* color: white; */
  border: none;
  width: 100%;

  &:hover {
    background-color: ${theme.orange};
  }
`;

const Item = styled.div`
  width: fit-content;
  padding: 6px 20px;
  border-radius: 20px;
  background-color: #ddd;
  color: ${theme.darkbrown};
`;
