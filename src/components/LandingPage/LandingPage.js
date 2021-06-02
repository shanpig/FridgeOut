import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme, headerConfig, mainContentConfig } from '../../variables';
import { Animated } from 'react-animated-css';
import { BsChevronRight } from 'react-icons/bs';
import backgroundImageSrc from '../../images/kitchen-table.jpg';
export default function LandingPage() {
  return (
    <Main>
      <MainContent>
        <Column>
          <Animated animationIn='fadeInDown'>
            <H1>Fridge Out</H1>
          </Animated>
          <Animated animationIn='fadeInUp'>
            <Text>尊重食材，用至分毫。</Text>
            <Text>淨空冰箱，淨空心靈。</Text>
            <Text>將剩食化為佳餚，是對糧食的珍惜。</Text>
          </Animated>
        </Column>
        <Column>
          <StyledLink to='/search'>
            <Animated animationIn='fadeInLeft' animationInDelay={500}>
              <Button>
                前往搜尋
                <BsChevronRight></BsChevronRight>
              </Button>
            </Animated>
          </StyledLink>
        </Column>
      </MainContent>
    </Main>
  );
}
const Main = styled.main`
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${backgroundImageSrc});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  min-height: calc(100vh - ${headerConfig.mobile_height});
  overflow: auto;
`;

const MainContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 40px 56px;
  width: 100%;
  height: ${mainContentConfig.mobile_height};
  overflow: auto;

  gap: 20px;
  @media screen and (min-width: 769px) {
    gap: 0;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Column = styled.div`
  @media screen and (min-width: 769px) {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 150px;
  }
`;

const GIF = styled.img`
  width: 100%;
  max-width: 600px;
`;

const H1 = styled.h1`
  font-size: 5em;
  font-weight: lighter;
  margin-bottom: 0.5em;
`;

const Text = styled.p`
  line-height: 3;
  font-size: 1.3em;
  font-family: Robo;
  text-align: center;

  @media screen and (max-width: 490px) {
    text-align: left;
  }

  @media screen and (min-width: 769px) {
    text-align: left;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media screen and (min-width: 769px) {
    justify-content: flex-end;
    padding-right: 60px;
  }
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  position: relative;
  gap: 10px;
  padding: 20px 5px 10px;
  transition: gap 0.2s ease-out;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    width: 0;
    height: 1px;
    margin: 0 auto;
    transition: width 0.2s ease-out;
  }
  &:hover {
    gap: 20px;
    /* background-color: rgba(0, 0, 0, 0.4); */
    &::after {
      width: 100%;
    }
  }
`;
