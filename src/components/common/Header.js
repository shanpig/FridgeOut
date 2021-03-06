import SmallLogoSrc from '../../images/logo-small.svg';
import LargeLogoSrc from '../../images/logo.svg';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsSearch, BsPeople, BsPerson } from 'react-icons/bs';

import { theme, headerConfig } from '../../variables';

import Sidebar from './Sidebar/Sidebar';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import styled from 'styled-components';

export default function Header() {
  const { isLoggedIn, name, profile } = useSelector((state) => {
    const isLoggedIn = state.user_info.identity !== 'none';
    return {
      ...state.user_info,
      isLoggedIn,
    };
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function openSidebar() {
    setSidebarOpen(true);
  }

  return (
    <>
      <MainHeader>
        <BurgerButton onClick={openSidebar}>
          <Burger />
        </BurgerButton>
        <StyledLink to="/">
          <LogoImg
            src={SmallLogoSrc}
            srcSet={`${SmallLogoSrc} 500w, ${LargeLogoSrc} 769w`}
          />
        </StyledLink>
        <Nav>
          <NavButton activeClassName="active" to="/search" id="search">
            <SearchIcon />
            <span>搜尋</span>
          </NavButton>
          <NavButton activeClassName="active" to="/posts">
            <CommunityIcon />
            <span>社群</span>
          </NavButton>
          <NavButton
            activeClassName="active"
            to={isLoggedIn ? `/profile/${name}/fridge` : '/profile'}
            id="profile"
          >
            {profile ? <ProfileImage src={profile} /> : <ProfileIcon />}
            <span>{isLoggedIn ? '個人' : '登入'}</span>
          </NavButton>
        </Nav>
      </MainHeader>
      <MainSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </>
  );
}

const MainHeader = styled.div`
  width: 100%;
  background-color: black;
  padding: 0 30px;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 99999;
  height: ${headerConfig.mobile_height};
  box-shadow: 0px 2px 10px -5px black;

  @media screen and (min-width: 769px) {
    height: ${headerConfig.computer_height};
  }
`;

const BurgerButton = styled.div`
  width: 25px;
  height: 25px;
  cursor: pointer;

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const Burger = styled(GiHamburgerMenu)`
  color: white;
  width: 100%;
  height: 100%;
`;

const StyledLink = styled(Link)`
  margin: 0 auto;
  text-decoration: none;
  flex-grow: 1;

  @media screen and (min-width: 769px) {
    margin: 0;
    margin-right: auto;
  }
`;

const LogoImg = styled.div`
  background-image: url(${SmallLogoSrc});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 40px;

  @media screen and (min-width: 769px) {
    width: 150px;
    background-image: url(${LargeLogoSrc});
    background-position: left;
  }
`;

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgb(50, 50, 50);
  overflow-y: hidden;

  & * {
    color: white;
  }

  @media screen and (min-width: 769px) {
    width: fit-content;
    height: 100%;
    position: unset;
    float: right;
    background-color: transparent;
  }
`;

const NavButton = styled(NavLink)`
  flex: 1 1 50%;
  border: none;
  position: relative;
  text-decoration: none;
  width: 70px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: black;

  &.active {
    background-color: #5c5c5c;
  }

  &:not(:first-child) {
    border-left: 1px solid ${theme.darkbrown};
  }

  @media screen and (min-width: 769px) {
    & > span {
      opacity: 0;
      position: absolute;
      display: flex;
      padding: 1em;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.8);
      transition: all 0.2s ease;
    }

    &.active > span {
      background-color: #5c5c5c;
    }

    &:hover span {
      opacity: 1;
    }

    &:not(:first-child) {
      border-left: unset;
    }
  }
`;

const SearchIcon = styled(BsSearch)`
  font-size: 25px;
`;

const CommunityIcon = styled(BsPeople)`
  font-size: 25px;
`;

const ProfileIcon = styled(BsPerson)`
  font-size: 25px;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 25px;
  height: 25px;
`;

const MainSidebar = styled(Sidebar)`
  display: none;
`;
