import { theme } from '../../variables';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { post } from '../../utils/firebase';
import GoBackButton from '../common/GoBackButton';

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
        <Form action="" onSubmit={submitHandler}>
          {user.left_overs.length === 0 ? (
            <Redirect to={`/profile/${user.name}/fridge`} />
          ) : (
            user.left_overs.map((leftover, i) => (
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
            ))
          )}
          <Submit type="submit" value="確認送出" />
        </Form>
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
  background-color: white;

  @media screen and (min-width: 769px) {
  }
`;

const Title = styled.h1`
  font-size: 1.2em;
  margin-bottom: 10px;
  text-align: center;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;

  & * {
    color: ${theme.darkbrown};
  }
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
  border-radius: 10px;
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
