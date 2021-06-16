import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function IngredientForm({ submitAction }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState('');
  const d = useDispatch();
  function submitHandler(e) {
    e.preventDefault();
    d(
      submitAction({
        ingredient_name: name,
        ingredient_amount: amount,
        ingredient_unit: unit,
      })
    );
  }
  return (
    <form action="" onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="輸入剩食種類"
        onChange={(e) => setName(e.target.value)}
        required
        value={name}
      />
      <input
        type="number"
        placeholder="輸入剩食份量"
        onChange={(e) => setAmount(e.target.value)}
        required
        min="0"
        value={amount}
      />
      <input
        type="text"
        placeholder="輸入剩食單位"
        onChange={(e) => setUnit(e.target.value)}
        required
        value={unit}
      />
      <input type="submit" value="加入食材" />
    </form>
  );
}
