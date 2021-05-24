import styled from 'styled-components';
import { theme } from '../../variables';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillCaretLeft, AiOutlineClose } from 'react-icons/ai';
import { removeInput } from '../../redux/reducers/keyword/keywordActions';
import { removeRecipeFromSelections } from '../../redux/reducers/selection/selectionActions';
import {
  assessIngredientsUsage,
  gatherIngredientsFromRecipes,
} from '../../utils/recipes';
import { fractionStringToTC } from '../../utils/math';

function RawItem({ readOnly, className, ...props }) {
  const d = useDispatch();
  let content, target;

  function remove(data, type) {
    if (type === 'ingredient') {
      d(removeInput(data));
    } else if (type === 'recipe') {
      d(removeRecipeFromSelections(data));
    }
  }

  if (props.type === 'ingredient') {
    let {
      ingredient_name: name,
      ingredient_amount: amount,
      ingredient_unit: unit,
    } = props.ingredient;
    if (amount) amount = fractionStringToTC(amount);
    content = `${name} ${amount} ${unit}`;
    target = props.ingredient;
  } else if (props.type === 'recipe') {
    const { title, id } = props.recipe;
    content = title;
    target = id;
  }
  return (
    <li className={className}>
      {content}
      {!readOnly ? (
        <CloseButton onClick={() => remove(target, props.type)}></CloseButton>
      ) : (
        ''
      )}
    </li>
  );
}

export default function SidebarBody() {
  const SELECTED_LEFTOVER = useRef(null);
  const SELECTED_RECIPES = useRef(null);
  const REMAIN_LEFTOVERS = useRef(null);
  const NEEDED_INGREDIENT = useRef(null);
  const selectedLeftover = useSelector((state) => state.searched_keywords);
  const selectedRecipes = useSelector((state) => state.selected_recipes);
  const [ingredientsLeft, setIngredientsLeft] = useState([]);
  const [ingredientsNeeded, setIngredientsNeeded] = useState([]);

  useEffect(() => {
    // if (selectedLeftover || selectedRecipes) return;
    const ingredientsOnHand = selectedLeftover;
    const ingredientsRequired = gatherIngredientsFromRecipes(selectedRecipes);

    // console.log('ingredientsOnHand: ', ingredientsOnHand);
    // console.log('ingredientsRequired: ', ingredientsRequired);
    const [left, needed] = assessIngredientsUsage(
      ingredientsOnHand,
      ingredientsRequired
    );

    setIngredientsLeft(left);
    setIngredientsNeeded(needed);
  }, [selectedLeftover, selectedRecipes]);

  return (
    <BodySection>
      <Section ref={SELECTED_LEFTOVER} className='open'>
        <SectionTitle
          onClick={(e) => SELECTED_LEFTOVER.current.classList.toggle('open')}>
          <h2>已選剩食</h2>
          <DropDownArrow />
        </SectionTitle>
        <List>
          {selectedLeftover &&
            selectedLeftover.map((leftover, i) => {
              return (
                <Item
                  key={i}
                  className='item'
                  type='ingredient'
                  ingredient={leftover}
                />
              );
            })}
        </List>
      </Section>

      <Section ref={SELECTED_RECIPES} className='open'>
        <SectionTitle
          onClick={() => SELECTED_RECIPES.current.classList.toggle('open')}>
          <h2>已選食譜</h2>
          <DropDownArrow />
        </SectionTitle>
        <List>
          {selectedRecipes &&
            selectedRecipes.map((recipe, i) => (
              <Item key={i} className='item' type='recipe' recipe={recipe} />
            ))}
        </List>
      </Section>

      <Section ref={REMAIN_LEFTOVERS} className='open'>
        <SectionTitle
          onClick={() => REMAIN_LEFTOVERS.current.classList.toggle('open')}>
          <h2>剩餘食材</h2>
          <DropDownArrow />
        </SectionTitle>
        <List>
          {ingredientsLeft &&
            ingredientsLeft.map((ingr) => (
              <Item
                className='item'
                type='ingredient'
                readOnly={true}
                ingredient={ingr}
              />
            ))}
        </List>
      </Section>

      <Section ref={NEEDED_INGREDIENT} className='open'>
        <SectionTitle
          onClick={() => NEEDED_INGREDIENT.current.classList.toggle('open')}>
          <h2>不足食材</h2>
          <DropDownArrow />
        </SectionTitle>
        <List>
          {ingredientsNeeded.map((ingr) => (
            <Item
              className='item'
              type='ingredient'
              readOnly={true}
              ingredient={ingr}
            />
          ))}
        </List>
      </Section>
    </BodySection>
  );
}

const BodySection = styled.section`
  flex-grow: 1;
`;

const SectionTitle = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
  user-select: none;
`;

const List = styled.ul`
  padding: 0 30px;
  height: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
`;

const DropDownArrow = styled(AiFillCaretLeft)`
  margin-left: auto;
  transition: 0.3s ease transform;
`;

const Section = styled.section`
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${theme.lightOrange};

  &.open ${DropDownArrow} {
    transform: rotateZ(-90deg);
  }
  &.open > ${List} {
    margin: 15px 0;
    height: fit-content;
  }
`;

const CloseButton = styled(AiOutlineClose)``;

const Item = styled(RawItem)`
  width: fit-content;
  padding: 3px 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid ${theme.orange};
  border-radius: 20px;

  & ${CloseButton} {
    cursor: pointer;
  }
`;
