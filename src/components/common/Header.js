import React, { useState } from "react";
import styled from "styled-components";
import { theme, headerConfig } from "../../variables";
import { Link } from "react-router-dom";
import LogoSrc from "../../images/logo-small.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSearch, BsPeople, BsPerson } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import Sidebar from "./Sidebar/Sidebar";
import { useSelector } from "react-redux";

export default function Header() {
  const { identity, name, profile } = useSelector((state) => state.user_info);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <MainHeader>
        <Burger onClick={() => setSidebarOpen(true)} />
        <StyledLink to="/">
          {/* <Logo>LOGO</Logo> */}
          <LogoImg src={LogoSrc}></LogoImg>
        </StyledLink>
        <Nav>
          <NavButton to="/search" id="search">
            <SearchIcon />
            <span>搜尋</span>
          </NavButton>
          <NavButton to="/posts">
            <CommunityIcon />
            <span>社群</span>
          </NavButton>
          <NavButton
            to={identity !== "none" ? `/profile/${name}/fridge` : "/login"}
            id="profile"
          >
            {profile ? <ProfileImage src={profile} /> : <ProfileIcon />}
            <span>個人</span>
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
  z-index: 10;
  height: ${headerConfig.mobile_height};
  box-shadow: 0px 2px 10px -5px black;

  @media screen and (min-width: 769px) {
    height: ${headerConfig.computer_height};
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

const StyledLink = styled(Link)`
  margin: 0 auto;
  text-decoration: none;
  transform: translate(-15px, 0);
  @media screen and (min-width: 769px) {
    margin: 0;
    margin-right: auto;
  }
`;

const Logo = styled.h2`
  width: 119px;
  height: 40px;
  max-height: 40px;
  font-size: 30px;
  line-height: 40px;
  text-align: center;
`;

const LogoImg = styled.img`
  height: 40px;
`;

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgb(50, 50, 50);
  overflow-y: hidden;

  @media screen and (min-width: 769px) {
    width: fit-content;
    position: unset;
    float: right;
    background-color: transparent;
  }
`;

const NavButton = styled(Link)`
  flex: 1 1 50%;
  background-color: transparent;
  border: none;
  position: relative;
  text-decoration: none;
  width: 70px;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:not(:first-child) {
    border-left: 1px solid lightslategrey;
  }

  @media screen and (min-width: 769px) {
    & > span {
      /* display: none; */
      opacity: 0;
      position: absolute;
      display: flex;
      height: 100%;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.8);
      transition: all 0.2s ease;
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
