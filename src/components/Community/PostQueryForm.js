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

  if (user && user.identity === 'none') return <Redirect to='/login' />;
  return (
    <Main>
      <GoBackButton></GoBackButton>
      <QueryForm>
        <Title>剩食求解</Title>
        <Form action='' onSubmit={submitHandler}>
          {user.left_overs &&
            user.left_overs.map((leftover, i) => (
              <div className='field' key={i}>
                <input
                  type='checkbox'
                  name=''
                  value={leftover.ingredient_name}
                  onChange={selectionHandler}
                />
                <label>
                  {leftover.ingredient_name} {leftover.ingredient_amount}{' '}
                  {leftover.ingredient_unit}
                </label>
              </div>
            ))}
          <Submit type='submit' value='確認送出' />
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
  padding: 20px 30px;
  max-width: 600px;
  margin: 20px auto;
  background-color: #ededed;

  @media screen and (min-width: 769px) {
    background-color: white;
  }
`;

const Title = styled.h1`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Submit = styled.input`
  margin-top: 10px;
  padding: 3px 0;
  cursor: pointer;
`;
