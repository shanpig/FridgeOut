import { theme } from '../../variables';
import styled from 'styled-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { GrFormClose, GrFormAdd } from 'react-icons/gr';
import InputPopup from '../common/InputPopup';

export default function SearchBar() {
  const [popupOpen, setPopupOpen] = useState(false);
  const keywords = useSelector((state) => {
    return state.searched_keywords;
  });

  return (
    <Bar>
      <H2>食材：</H2>
      <KeywordInputs>
        {keywords &&
          keywords.map((keyword, i) => {
            const {
              ingredient_name: name,
              ingredient_amount: amount,
              ingredient_unit: unit,
            } = keyword;
            return (
              <Input key={i}>
                {name} {amount} {unit}
                <RemoveInput
                  onClick={() =>
                    console.log('remove input: ', name)
                  }></RemoveInput>
              </Input>
            );
          })}
      </KeywordInputs>
      <AddButton onClick={() => setPopupOpen(!popupOpen)}></AddButton>
      <InputPopup open={popupOpen} setOpen={setPopupOpen} />
    </Bar>
  );
}

const Bar = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  gap: 15px;

  @media screen and (min-width: 769px) {
    background-color: white;
    padding: 10px;
  }
`;

const H2 = styled.h2`
  white-space: nowrap;
  font-weight: bold;
`;

const KeywordInputs = styled.ul`
  display: flex;
  gap: 15px;
  overflow-x: auto;

  @media screen and (min-width: 769px) {
    overflow-x: unset;
    flex-wrap: wrap;
  }
`;

const Input = styled.li`
  display: flex;
  align-items: center;
  white-space: nowrap;
  border-bottom: 2px solid ${theme.orange};
`;

const RemoveInput = styled(GrFormClose)`
  margin-left: 10px;
  cursor: pointer;
`;

const AddButton = styled(GrFormAdd)`
  font-size: 1.5em;
  margin-left: auto;
  cursor: pointer;
`;
