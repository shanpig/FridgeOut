import { theme } from '../../variables';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

export default function FilterBar() {
  return (
    <Bar>
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
  gap: 40px;
  padding: 5px 0;

  @media screen and (min-width: 769px) {
    padding: 30px 15px;
  }
`;

const Filter = styled.li`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const CheckBox = styled.input`
  transform: scale(2);
`;
const Label = styled.label``;
