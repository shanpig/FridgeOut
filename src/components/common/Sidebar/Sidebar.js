import LogoSrc from '../../../images/logo-small-nobg.svg';
import { IoChevronBackSharp } from 'react-icons/io5';

import SidebarBody from './SidebarBody';

import styled from 'styled-components';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <Aside open={sidebarOpen}>
      <Mask masked={sidebarOpen} onClick={closeSidebar} />
      <HeaderSection>
        <BackIcon onClick={closeSidebar} />
        <Logo />
      </HeaderSection>
      <SidebarBody closeSidebar={closeSidebar} />
    </Aside>
  );
}

const Aside = styled.aside`
  background-color: black;
  z-index: 999999;
  position: fixed;
  top: 0;
  bottom: 0;
  min-width: 240px;
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  left: ${(props) => (props.open ? '0%' : '-100%')};
  transition: left ease 0.3s;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const Mask = styled.div`
  display: ${(props) => (props.masked ? 'unset' : 'none')};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.7);
`;

const HeaderSection = styled.section`
  padding: 40px 40px 10px;
`;

const BackIcon = styled(IoChevronBackSharp)`
  position: absolute;
  right: 10px;
  cursor: pointer;
  top: 10px;
  font-size: 30px;
  font-weight: lighter;
  color: white;
  transition: 0.2s margin-right ease;
  & path {
    stroke-width: 24;
  }

  &:hover {
    margin-right: 5px;
  }
`;

const Logo = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background-image: url(${LogoSrc});
`;
