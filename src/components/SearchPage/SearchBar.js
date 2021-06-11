import { theme } from '../../variables';
import styled from 'styled-components';
import { useState } from 'react';
import { Animated } from 'react-animated-css';
import { useSelector, useDispatch } from 'react-redux';
import { GrFormClose, GrFormAdd } from 'react-icons/gr';
import InputPopup from '../common/InputPopup';
import { removeInput } from '../../redux/reducers/keyword/keywordActions';
import { fractionStringToTC } from '../../utils/math';
import Popup from 'reactjs-popup';

export default function SearchBar() {
  const d = useDispatch();
  const [open, setOpen] = useState(false);
  const keywords = useSelector((state) => {
    return state.searched_keywords;
  });

  return (
    <Animated animationIn="fadeIn" animationInDuration={500}>
      <Bar>
        <BarLeft onClick={() => setOpen(true)}>新增食材</BarLeft>
        <BarRight>
          <KeywordInputs>
            {keywords.length === 0 ? (
              <Text>
                {/* <lottie-player
                  src="https://assets3.lottiefiles.com/packages/lf20_oayvt4tp.json"
                  background="transparent"
                  speed="1"
                  style={{
                    width: '1.5em',
                    height: '1.5em',
                    marginRight: '10px',
                  }}
                  loop
                  autoplay
                ></lottie-player> */}
                沒有搜尋的食材
              </Text>
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
      </Bar>
      <InputPopup open={open} setOpen={setOpen} />
    </Animated>
  );
}

const Bar = styled.div`
  /* padding: 10px; */
  height: 40px;
  display: flex;
  align-items: stretch;
  position: relative;
  /* background-color: rgba(255, 255, 255, 0.8); */
  gap: 3px;

  & * {
    color: black;
    font-family: 'Noto Sans TC';
  }
`;

const BarPart = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.8);
`;

const BarLeft = styled(BarPart)`
  border-radius: 10px 0 0 10px;
  cursor: pointer;
  /* background-color: rgba(255, 255, 255, 0.7); */

  &:hover {
    background-color: ${theme.lighterOrange};
    /* box-shadow: 1px 5px 3px lightgray; */
  }
`;
const BarRight = styled(BarPart)`
  border-radius: 0 10px 10px 0;
  flex-grow: 1;
`;

const Button = styled.div`
  cursor: pointer;
  /* background-color: rgba(255, 255, 255, 0.7); */

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    /* box-shadow: 1px 5px 3px lightgray; */
  }
`;

const H2 = styled.h2`
  padding-left: 10px;
  white-space: nowrap;
  font-weight: bold;
  font-size: 1.3em;
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
  border-bottom: 2px solid ${theme.orange};
`;

const RemoveInput = styled(GrFormClose)`
  margin-left: 10px;
  cursor: pointer;
`;
