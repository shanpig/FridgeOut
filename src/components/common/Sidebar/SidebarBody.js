import { AiFillCaretLeft } from 'react-icons/ai';

import { theme } from '../../../variables';

import SidebarItem from './SidebarItem';

import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

import {
  assessIngredientsUsage,
  gatherIngredientsFromRecipes,
} from '../../../utils/recipes';

export default function SidebarBody({ className, closeSidebar }) {
  const SELECTED_RECIPES = useRef(null);
  const REMAIN_LEFTOVERS = useRef(null);
  const NEEDED_INGREDIENT = useRef(null);
  const selectedLeftover = useSelector((state) => state.searched_keywords);
  const selectedRecipes = useSelector((state) => state.user_info.my_kitchen);
  const [ingredientsLeft, setIngredientsLeft] = useState([]);
  const [ingredientsNeeded, setIngredientsNeeded] = useState([]);

  useEffect(() => {
    const ingredientsOnHand = selectedLeftover;
    const ingredientsRequired = gatherIngredientsFromRecipes(selectedRecipes);

    const [left, needed] = assessIngredientsUsage(
      ingredientsOnHand,
      ingredientsRequired
    );

    setIngredientsLeft(left);
    setIngredientsNeeded(needed);
  }, [selectedLeftover, selectedRecipes]);

  return (
    <BodySection className={className}>
      <Section ref={SELECTED_RECIPES} className="open">
        <SectionTitle
          onClick={() => SELECTED_RECIPES.current.classList.toggle('open')}
        >
          <H2>已選食譜</H2>
          <DropDownArrow />
        </SectionTitle>
        <List>
          {selectedRecipes &&
            selectedRecipes.map((recipe, i) => (
              <SelectedRecipeItem key={i}>
                <Item
                  linkTo={`/recipe/${recipe.id}`}
                  closeSidebar={closeSidebar}
                  className="item"
                  type="recipe"
                  recipe={recipe}
                />
              </SelectedRecipeItem>
            ))}
        </List>
      </Section>

      <Section ref={REMAIN_LEFTOVERS} className="open">
        <SectionTitle
          onClick={() => REMAIN_LEFTOVERS.current.classList.toggle('open')}
        >
          <H2>剩餘食材</H2>
          <DropDownArrow />
        </SectionTitle>
        <List>
          {ingredientsLeft &&
            ingredientsLeft.map((ingr, i) => (
              <Item
                key={i}
                className="item"
                type="ingredient"
                readOnly={true}
                ingredient={ingr}
              />
            ))}
        </List>
      </Section>

      <Section ref={NEEDED_INGREDIENT} className="open">
        <SectionTitle
          onClick={() => NEEDED_INGREDIENT.current.classList.toggle('open')}
        >
          <H2>不足食材</H2>
          <DropDownArrow />
        </SectionTitle>
        <List>
          {ingredientsNeeded.map((ingr, i) => (
            <Item
              key={i}
              className="item"
              type="ingredient"
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
  padding: 0;
  overflow-y: auto;

  & * {
    color: white;
  }
`;

const SectionTitle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const H2 = styled.h2`
  font-weight: bold;
  letter-spacing: 1.4px;
`;

const List = styled.ul`
  padding: 0;
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
  padding: 15px 0;
  margin: 0 15px;
  display: flex;
  flex-direction: column;
  &:not(:first-child) {
    border-top: 1px solid ${theme.darkbrown};
  }

  &.open ${DropDownArrow} {
    transform: rotateZ(-90deg);
  }
  &.open > ${List} {
    margin: 15px 0;
    height: fit-content;
  }
`;

const SelectedRecipeItem = styled.div``;

const Item = styled(SidebarItem)`
  width: 100%;
  padding: 3px 0;
  line-height: 1.3;
  letter-spacing: 0.8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
