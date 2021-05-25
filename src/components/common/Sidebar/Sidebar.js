import { theme } from '../../../variables';
import styled from 'styled-components';
import SidebarBody from './SidebarBody';
import { BsArrow90DegLeft } from 'react-icons/bs';
import LogoSrc from '../../../images/LogoWithTextOrange.png';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <Aside open={sidebarOpen}>
      <HeaderSection>
        <BackIcon onClick={() => setSidebarOpen(false)} />
        <img src={LogoSrc} alt='' />
      </HeaderSection>
      <SidebarBody />
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
  left: ${(props) => (props.open ? '0%' : '-100%')};
  transition: left ease 0.3s;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const HeaderSection = styled.section`
  padding: 40px 40px 20px;
  border-bottom: 3px solid ${theme.orange};
  height: 130px;
`;

const BackIcon = styled(BsArrow90DegLeft)`
  position: absolute;
  right: 10px;
  cursor: pointer;
  top: 10px;
  font-size: 30px;
  color: ${theme.orange};
`;
