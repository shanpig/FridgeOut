import { theme } from '../../variables';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  addInput,
  removeInput,
} from '../../redux/reducers/keyword/keywordActions';
import { Link } from 'react-router-dom';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { RiFridgeLine } from 'react-icons/ri';
import { useState, useEffect } from 'react';

export default function FridgeSelectionList() {
  const d = useDispatch();
  const isLoggedIn = useSelector(
    (state) => state.user_info.identity !== 'none'
  );
  const user = useSelector((state) => state.user_info);
  const selected = useSelector((state) => state.searched_keywords);
  const fridge = useSelector((state) => {
    console.log(state.user_info.left_overs);
    return state.user_info.left_overs;
  });
  const [selectionContent, setSelectionContent] = useState([]);

  function isSelected(ingredient) {
    return (
      selected.findIndex(
        (item) => item.ingredient_name === ingredient.ingredient_name
      ) >= 0
    );
  }

  function toggleIngredientSelection(ingredient) {
    if (isSelected(ingredient)) {
      d(removeInput(ingredient));
    } else {
      d(addInput(ingredient));
    }
  }

  useEffect(() => {
    console.log('fridge: ', fridge);
    let content;
    if (fridge.length === 0) {
      content = '你的冰箱空空如也';
    } else {
      content = fridge.map((ingredient) => (
        <Option
          selected={isSelected(ingredient)}
          onClick={() => toggleIngredientSelection(ingredient)}
        >
          {ingredient.ingredient_name} {ingredient.ingredient_amount}{' '}
          {ingredient.ingredient_unit}
        </Option>
      ));
    }
    setSelectionContent(content);
  }, [fridge]);

  return (
    <SelectionList>
      <SelectionTitle
        to={isLoggedIn ? `/profile/${user.name}/fridge` : '/login'}
      >
        <FridgeIcon />
        <div>冰箱</div>
      </SelectionTitle>
      <SelectionOptions>
        {isLoggedIn ? (
          selectionContent
        ) : (
          <LogInNotification>
            <StyledLink to="/login">登入</StyledLink>之後即可直接從冰箱取出食材
          </LogInNotification>
        )}
      </SelectionOptions>
    </SelectionList>
  );
}

const SelectionList = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 5px;

  @media screen and (min-width: 769px) {
    gap: 15px;
    padding: 0 10px;
  }
  /* padding: 5px 10px; */
`;

const SelectionTitle = styled(Link)`
  text-decoration: none;
  color: white;
  white-space: nowrap;
  width: 40px;
  position: relative;
  text-align: center;

  &:hover div {
    opacity: 1;
  }

  & div {
    display: block;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    opacity: 0;
    transition: all ease 0.2s;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const FridgeIcon = styled(RiFridgeLine)`
  width: 100%;
  font-size: 30px;
`;

const SelectionOptions = styled(PerfectScrollbar)`
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  position: relative;
  padding-bottom: 10px;
  margin-top: 5px;

  & .ps__rail-x {
    height: 0;
    opacity: 1;
  }

  & .ps__thumb-x {
    opacity: 1;
  }
  & .ps__rail-x:hover .ps__thumb-x {
    height: 6px;
  }
`;

const Option = styled.div`
  background-color: ${(props) =>
    props.selected ? `${theme.lighterOrange}` : 'rgba(255, 255, 255, 0.8)'};
  border-radius: 20px;
  padding: 7px 12px;
  cursor: pointer;
  font-size: 0.9em;
  color: ${theme.darkbrown};
  transition: all ease 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: ${theme.lighterOrange};
  }
`;

const StyledLink = styled(Link)`
  color: lightgray;
  text-decoration: none;
  border-bottom: 2px solid lightgray;

  &:hover {
    color: white;
    border-bottom: 2px solid white;
  }
`;

const LogInNotification = styled.li`
  color: lightgray;
  font-size: 0.9em;
  list-style-type: none;
  letter-spacing: 1.5px;
`;
