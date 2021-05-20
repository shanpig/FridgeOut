import { theme } from '../../variables';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

export default function FilterBar() {
  return (
    <Bar>
      <Filter>
        <CheckBox id='most-leftovers' type='checkbox' />
        <Label htmlFor='most-leftovers'>用到最多種剩食</Label>
      </Filter>
      <Filter>
        <CheckBox id='no-purchasing' type='checkbox' />
        <Label htmlFor='no-purchasing'>不用採買</Label>
      </Filter>
    </Bar>
  );
}

const Bar = styled.ul`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Filter = styled.li``;

const CheckBox = styled.input``;
const Label = styled.label``;
