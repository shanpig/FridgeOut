import { useRef } from 'react';
import { theme } from '../../variables';
import styled from 'styled-components';
import { BsArrow90DegLeft } from 'react-icons/bs';
import LogoSrc from '../../images/LogoWithTextOrange.png';
import { AiFillCaretLeft, AiOutlineClose } from 'react-icons/ai';

function RawItem({ readOnly, className, ...props }) {
  let content, targetName;
  if (props.type === 'ingredient') {
    const { name, amount, unit } = props.ingredient;
    content = `${name} ${amount} ${unit}`;
    targetName = name;
  } else if (props.type === 'recipe') {
    const { name } = props.recipe;
    content = name;
    targetName = name;
  }
  return (
    <li className={className}>
      {content}
      {!readOnly ? (
        <CloseButton
          onClick={() => console.log(`remove ${targetName}`)}></CloseButton>
      ) : (
        ''
      )}
    </li>
  );
}

export default function SideBar({ sidebarOpen, setSidebarOpen }) {
  const SELECTED_LEFTOVER = useRef(null);
  const SELECTED_RECIPES = useRef(null);
  const REMAIN_LEFTOVERS = useRef(null);
  const NEEDED_INGREDIENT = useRef(null);
  return (
    <Aside open={sidebarOpen}>
      <HeaderSection>
        <BackIcon onClick={() => setSidebarOpen(false)} />
        <img src={LogoSrc} alt='' />
      </HeaderSection>

      <BodySection>
        <Section ref={SELECTED_LEFTOVER}>
          <SectionTitle
            onClick={(e) => SELECTED_LEFTOVER.current.classList.toggle('open')}>
            <h2>已選剩食</h2>
            <DropDownArrow />
          </SectionTitle>
          <List>
            <Item
              className='item'
              type='ingredient'
              ingredient={{ name: '雞胸肉', amount: 100, unit: '克' }}
            />
            <Item
              className='item'
              type='ingredient'
              ingredient={{ name: '雞胸肉', amount: 100, unit: '克' }}
            />
            <Item
              className='item'
              type='ingredient'
              ingredient={{ name: '雞胸肉', amount: 100, unit: '克' }}
            />
          </List>
        </Section>

        <Section ref={SELECTED_RECIPES}>
          <SectionTitle
            onClick={() => SELECTED_RECIPES.current.classList.toggle('open')}>
            <h2>已選食譜</h2>
            <DropDownArrow />
          </SectionTitle>
          <List>
            <Item className='item' type='recipe' recipe={{ name: '魯雞絲' }} />
            <Item className='item' type='recipe' recipe={{ name: '魯雞絲' }} />
            <Item className='item' type='recipe' recipe={{ name: '魯雞絲' }} />
            <Item className='item' type='recipe' recipe={{ name: '魯雞絲' }} />
            <Item className='item' type='recipe' recipe={{ name: '魯雞絲' }} />
          </List>
        </Section>

        <Section ref={REMAIN_LEFTOVERS}>
          <SectionTitle
            onClick={() => REMAIN_LEFTOVERS.current.classList.toggle('open')}>
            <h2>剩餘食材</h2>
            <DropDownArrow />
          </SectionTitle>
          <List>
            <Item
              className='item'
              type='ingredient'
              readOnly={true}
              ingredient={{ name: '雞胸肉', amount: 50, unit: '克' }}
            />
            <Item
              className='item'
              type='ingredient'
              readOnly={true}
              ingredient={{ name: '雞胸肉', amount: 50, unit: '克' }}
            />
            <Item
              className='item'
              type='ingredient'
              readOnly={true}
              ingredient={{ name: '雞胸肉', amount: 50, unit: '克' }}
            />
            <Item
              className='item'
              type='ingredient'
              readOnly={true}
              ingredient={{ name: '雞胸肉', amount: 50, unit: '克' }}
            />
          </List>
        </Section>

        <Section ref={NEEDED_INGREDIENT}>
          <SectionTitle
            onClick={() => NEEDED_INGREDIENT.current.classList.toggle('open')}>
            <h2>不足食材</h2>
            <DropDownArrow />
          </SectionTitle>
          <List>
            <Item
              className='item'
              type='ingredient'
              readOnly={true}
              ingredient={{ name: '醬油', amount: '', unit: '' }}
            />
          </List>
        </Section>
      </BodySection>
    </Aside>
  );
}

const Aside = styled.aside`
  background-color: white;
  position: relative;
  z-index: 20;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  left: ${(props) => (props.open ? '0%' : '-100%')};
  transition: left ease 0.3s;
`;

const HeaderSection = styled.section`
  padding: 40px 40px 20px;
  border-bottom: 3px solid ${theme.orange};
  height: 130px;
`;

const BodySection = styled.section``;

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

const BackIcon = styled(BsArrow90DegLeft)`
  position: absolute;
  right: 10px;
  cursor: pointer;
  top: 10px;
  font-size: 30px;
  color: ${theme.orange};
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
