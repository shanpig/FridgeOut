import { useRef } from 'react';
import { theme } from '../../variables';
import styled from 'styled-components';
import SidebarBody from './SidebarBody';
import { BsArrow90DegLeft } from 'react-icons/bs';
import { AiFillCaretLeft, AiOutlineClose } from 'react-icons/ai';
import LogoSrc from '../../images/LogoWithTextOrange.png';

// function RawItem({ readOnly, className, ...props }) {
//   let content, targetName;
//   if (props.type === 'ingredient') {
//     const { name, amount, unit } = props.ingredient;
//     content = `${name} ${amount} ${unit}`;
//     targetName = name;
//   } else if (props.type === 'recipe') {
//     const { name } = props.recipe;
//     content = name;
//     targetName = name;
//   }
//   return (
//     <li className={className}>
//       {content}
//       {!readOnly ? (
//         <CloseButton
//           onClick={() => console.log(`remove ${targetName}`)}></CloseButton>
//       ) : (
//         ''
//       )}
//     </li>
//   );
// }

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
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

      <SidebarBody></SidebarBody>
    </Aside>
  );
}

const Aside = styled.aside`
  background-color: white;
  z-index: 20;
  position: fixed;
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

// const Item = styled(RawItem)`
//   width: fit-content;
//   padding: 3px 10px;
//   display: flex;
//   align-items: center;
//   gap: 20px;
//   border: 1px solid ${theme.orange};
//   border-radius: 20px;

//   & ${CloseButton} {
//     cursor: pointer;
//   }
// `;
