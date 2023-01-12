import { GrFormClose } from 'react-icons/gr';

import { theme } from '../../../variables';

import InputPopup from './InputPopup';
import FridgeSelectionList from './FridgeSelectionList';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeInput } from '../../../redux/reducers/keyword/keywordActions';

import styled from 'styled-components';
import { Animated } from 'react-animated-css';

import { fractionStringToTC } from '../../../utils/math';

export default function SearchBar() {
  const d = useDispatch();
  const [open, setOpen] = useState(false);
  const keywords = useSelector((state) => state.searched_keywords);
  return (
    <Animated animationIn="fadeIn" animationInDuration={500}>
      <Bars>
        <InputBar>
          <BarLeft onClick={() => setOpen(true)}>新增食材</BarLeft>
          <BarRight>
            <KeywordInputs>
              {keywords.length === 0 ? (
                <Text>沒有搜尋的食材</Text>
              ) : (
                keywords.map((keyword, i) => {
                  const {
                    ingredient_name: name,
                    ingredient_amount: amount,
                    ingredient_unit: unit,
                  } = keyword;

                  return (
                    <Input key={i}>
                      {name} {fractionStringToTC(amount)} {unit}
                      <RemoveInput onClick={() => d(removeInput(keyword))} />
                    </Input>
                  );
                })
              )}
            </KeywordInputs>
          </BarRight>
        </InputBar>
        <FridgeSelectionBar>
          <FridgeSelectionList />
        </FridgeSelectionBar>
      </Bars>
      <InputPopup open={open} setOpen={setOpen} />
    </Animated>
  );
}

const Bars = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 5px;
`;

const Bar = styled.div`
  min-height: 40px;
  display: flex;
  align-items: stretch;
  position: relative;

  border-radius: 5px;
  gap: 5px;

  & * {
    font-family: 'Noto Sans TC';
  }
`;

const InputBar = styled(Bar)`
  background-color: rgba(255, 255, 255, 1);
`;

const FridgeSelectionBar = styled(Bar)``;

const BarPart = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;

  @media screen and (min-width: 769px) {
    padding: 10px;
  }
`;

const BarLeft = styled(BarPart)`
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  color: ${theme.darkbrown};
  background-color: ${theme.lighterOrange};
  border-bottom: 2px solid ${theme.orange};
  border-right: 2px solid ${theme.orange};
  font-size: 0.9em;

  &:hover {
    border: none;
    border-left: 2px solid ${theme.orange};
    border-top: 2px solid ${theme.orange};
  }
`;

const BarRight = styled(BarPart)`
  border-radius: 0 10px 10px 0;
  flex-grow: 1;
  padding: 10px 0;
`;

const Text = styled.div`
  color: #705253;
  display: flex;
  align-items: center;
  font-size: 0.9em;
`;

const KeywordInputs = styled.ul`
  padding-left: 10px;
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
  color: ${theme.darkbrown};
  border-bottom: 2px solid ${theme.orange};
`;

const RemoveInput = styled(GrFormClose)`
  margin-left: 10px;
  cursor: pointer;
`;
