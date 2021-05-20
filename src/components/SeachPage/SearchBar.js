import { theme } from '../../variables';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { GrFormClose, GrFormAdd } from 'react-icons/gr';

export default function SearchBar() {
  return (
    <Bar>
      <H2>食材：</H2>
      <KeywordInputs>
        <Input>
          醬油 <RemoveInput></RemoveInput>
        </Input>
        <Input>
          雞胸肉 100 g <RemoveInput></RemoveInput>
        </Input>
        <Input>
          蔥 1 支 <RemoveInput></RemoveInput>
        </Input>
      </KeywordInputs>
      <AddButton></AddButton>
    </Bar>
  );
}

const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const H2 = styled.h2`
  white-space: nowrap;
`;

const KeywordInputs = styled.ul`
  padding: 10px 0;
  display: flex;
  gap: 15px;
  overflow-x: auto;
`;

const Input = styled.li`
  display: flex;
  align-items: center;
  white-space: nowrap;
  border-bottom: 2px solid ${theme.orange};
`;

const RemoveInput = styled(GrFormClose)`
  margin-left: 10px;
`;

const AddButton = styled(GrFormAdd)`
  font-size: 1.5em;
  margin-left: auto;
`;
