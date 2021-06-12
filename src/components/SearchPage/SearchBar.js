import { theme } from '../../variables';
import styled from 'styled-components';
import { useState } from 'react';
import { Animated } from 'react-animated-css';
import { useSelector, useDispatch } from 'react-redux';
import { GrFormClose, GrFormAdd } from 'react-icons/gr';
import InputPopup from '../common/InputPopup';
import { removeInput } from '../../redux/reducers/keyword/keywordActions';
import { fractionStringToTC } from '../../utils/math';
import FridgeSelectionList from './FridgeSelectionList';

export default function SearchBar() {
  const d = useDispatch();
  const [open, setOpen] = useState(false);
  const keywords = useSelector((state) => state.searched_keywords);
  const isLoggedIn = useSelector(
    (state) => state.user_info.identity !== 'none'
  );
  const fridge = useSelector((state) => state.user_info.left_overs);

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
                  // console.log(amount);
                  return (
                    <Input key={i}>
                      {name} {fractionStringToTC(amount)} {unit}
                      <RemoveInput
                        onClick={() => d(removeInput(keyword))}
                      ></RemoveInput>
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
  /* padding: 10px; */
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
  /* background-color: rgba(255, 255, 255, 0.8); */

  @media screen and (min-width: 769px) {
    padding: 10px;
  }
`;

const BarLeft = styled(BarPart)`
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  color: ${theme.darkbrown};
  /* transition: all ease 0.2s; */
  background-color: ${theme.lighterOrange};
  border-bottom: 2px solid ${theme.orange};
  border-right: 2px solid ${theme.orange};
  font-size: 0.9em;

  &:hover {
    /* font-size: 1.1em; */
    /* background-color: ${theme.orange}; */
    border: none;
    border-left: 2px solid ${theme.orange};
    border-top: 2px solid ${theme.orange};
    /* box-shadow: 1px 5px 3px lightgray; */
  }
`;

const BarRight = styled(BarPart)`
  border-radius: 0 10px 10px 0;
  flex-grow: 1;
  padding: 10px 0;
`;

const Button = styled.div`
  cursor: pointer;
  /* background-color: rgba(255, 255, 255, 0.7); */

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    /* box-shadow: 1px 5px 3px lightgray; */
  }
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
