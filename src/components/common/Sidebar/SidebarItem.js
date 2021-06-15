import { theme } from '../../../variables';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { removeInput } from '../../../redux/reducers/keyword/keywordActions';
import { removeFromKitchen } from '../../../redux/reducers/user/userActions';
import {
  fractionStringToTC,
  getFractionFromTCAmount,
} from '../../../utils/math';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

export default function SidebarItem({ readOnly, className, ...props }) {
  const d = useDispatch();
  let content, target;

  function remove(data, type) {
    if (type === 'ingredient') {
      d(removeInput(data));
    } else if (type === 'recipe') {
      d(removeFromKitchen(data));
    }
  }

  if (props.type === 'ingredient') {
    let {
      ingredient_name: name,
      ingredient_amount: amount,
      ingredient_unit: unit,
    } = props.ingredient;
    if (amount) {
      amount = getFractionFromTCAmount(amount);
      amount = fractionStringToTC(amount);
    }
    content = `${name} ${amount} ${unit}`;
    target = props.ingredient;
  } else if (props.type === 'recipe') {
    const { title, id } = props.recipe;
    content = title;
    target = props.recipe;
  }
  return (
    <Item className={className}>
      <Text to={props.type === 'recipe' ? props.linkTo : ''}>{content}</Text>
      {!readOnly ? (
        <CloseButton onClick={() => remove(target, props.type)} />
      ) : (
        ''
      )}
    </Item>
  );
}
const Item = styled.li``;
const Text = styled(Link)`
  text-decoration: none;
  cursor: ${(props) => (props.to ? 'pointer' : 'unset')};

  &:hover {
    color: ${(props) => (props.to ? theme.orange : '')};
  }
`;
const CloseButton = styled(AiOutlineClose)`
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;
