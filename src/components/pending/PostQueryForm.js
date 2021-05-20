import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { post } from '../../utils/firebase';

const mockLeftovers = [
  {
    ingredient_name: '蛋',
    ingredient_amount: 5,
    ingredient_unit: '顆',
  },
  {
    ingredient_name: '紅蘿蔔',
    ingredient_amount: 0.5,
    ingredient_unit: '條',
  },
  {
    ingredient_name: '雞胸肉',
    ingredient_amount: 250,
    ingredient_unit: 'g',
  },
  {
    ingredient_name: '蔥',
    ingredient_amount: null,
    ingredient_unit: null,
  },
];

function findIngredientByName(list, ingredientName) {
  return list.find((item) => item.ingredient_name === ingredientName);
}

export default function PostQueryForm() {
  const user = useSelector((state) => state.user_info);
  const [selected, setSelected] = useState([]);

  function selectionHandler(e) {
    if (e.target.checked) {
      let ing = findIngredientByName(mockLeftovers, e.target.value);
      setSelected((selected) => [...selected, ing]);
    } else {
      setSelected((selected) =>
        selected.filter((s) => s.ingredient_name !== e.target.value)
      );
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    const message = {
      type: 'query',
      by: user.name,
      ingredients: selected,
      profile_image: user.profile,
    };

    post(message).then((id) =>
      console.log('message has posted on doc id: ', id)
    );
  }

  return (
    <>
      <h1>剩食求解</h1>
      <form action='' onSubmit={submitHandler}>
        {mockLeftovers.map((leftover, i) => (
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
        <input type='submit' value='確認送出' />
      </form>
      <div>
        {selected.map((s, i) => (
          <div key={i}>
            {s.ingredient_name} {s.ingredient_amount} {s.ingredient_unit}
          </div>
        ))}
      </div>
    </>
  );
}
