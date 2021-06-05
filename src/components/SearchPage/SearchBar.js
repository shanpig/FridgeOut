import { theme } from '../../variables';
import styled from 'styled-components';
import { useState } from 'react';
import { Animated } from 'react-animated-css';
import { useSelector, useDispatch } from 'react-redux';
import { GrFormClose, GrFormAdd } from 'react-icons/gr';
import InputPopup from '../common/InputPopup';
import { removeInput } from '../../redux/reducers/keyword/keywordActions';
import { fractionStringToTC } from '../../utils/math';

export default function SearchBar() {
  const d = useDispatch();
  const [popupOpen, setPopupOpen] = useState(false);
  const keywords = useSelector((state) => {
    return state.searched_keywords;
  });

  return (
    <Animated animationIn="fadeIn" animationInDuration={500}>
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
              // console.log(amount);
              return (
                <Input key={i}>
                  {name} {fractionStringToTC(amount)} {unit}
                  <RemoveInput
                    onClick={() => d(removeInput(keyword))}
                  ></RemoveInput>
                </Input>
              );
            })}
        </KeywordInputs>
        <InputPopup />
      </Bar>
    </Animated>
  );
}

const Bar = styled.div`
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  position: relative;
  background-color: rgba(255, 255, 255, 0.8);
  gap: 15px;

  & * {
    color: black;
    font-family: 'Noto Sans TC';
  }

  @media screen and (min-width: 769px) {
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
  flex-wrap: wrap;
`;

const Input = styled.li`
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-size: 0.9em;
  line-height: 1.5;
  border-bottom: 2px solid ${theme.orange};
`;

const RemoveInput = styled(GrFormClose)`
  margin-left: 10px;
  cursor: pointer;
`;
