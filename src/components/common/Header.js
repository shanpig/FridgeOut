import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../variables';
import LogoSrc from '../../images/LogoWithTextBlack.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsSearch } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import Sidebar from './Sidebar';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <MainHeader>
        <Burger onClick={() => setSidebarOpen(true)} />
        <Logo src={LogoSrc}></Logo>
        <Nav>
          <NavButton id='search'>
            <SearchIcon />
            <span>搜尋</span>
          </NavButton>
          <NavButton id='profile'>
            <ProfileIcon />
            <span>個人</span>
          </NavButton>
        </Nav>
      </MainHeader>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}></Sidebar>
    </>
  );
}

const MainHeader = styled.div`
  width: 100%;
  height: 70px;
  background-color: ${theme.lighterOrange};
  padding: 0 30px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.orange};
  position: fixed;
  z-index: 10;
  box-shadow: 0px 2px 10px -5px black;

  @media screen and (min-width: 769px) {
    background-color: ${theme.orange};
  }
`;

const Burger = styled(GiHamburgerMenu)`
  width: 25px;
  height: 25px;
  cursor: pointer;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const Logo = styled.img`
  width: 119px;
  height: 40px;
  max-height: 40px;
  margin: 0 auto;

  @media screen and (min-width: 769px) {
    margin: 0;
    margin-right: auto;
  }
`;

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
  align-items: center;
  background-color: ${theme.lighterOrange};

  @media screen and (min-width: 769px) {
    width: fit-content;
    position: unset;
    float: right;
    background-color: transparent;
  }
`;

const NavButton = styled.button`
  flex: 1 1 50%;
  height: 60%;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  & > span {
    color: black;
  }

  &:first-child {
    border-right: 2px solid ${theme.orange};
  }

  @media screen and (min-width: 769px) {
    white-space: nowrap;
    & > span {
      display: none;
    }

    &:first-child {
      border-right: unset;
    }
  }
`;

const SearchIcon = styled(BsSearch)`
  font-size: 25px;
`;

const ProfileIcon = styled(CgProfile)`
  font-size: 25px;
`;
