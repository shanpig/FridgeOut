import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../../variables';
export default function LandingPage() {
  return (
    <Main>
      <H1>FridgeOut！</H1>
      <Text>FridgeOut 是一個協助您處理剩食的網站。</Text>
      <Text>家裡時常開伙，老是剩下一堆剩餘食材，不知道如何處理？</Text>
      <Text>
        透過您的食材進行搜索，選擇食譜後，食材將自動從食譜中扣除，讓您可以掌握剩餘食材的使用方式！
      </Text>
      <Button>
        <StyledLink to='/search'>點我開始使用...</StyledLink>
      </Button>
    </Main>
  );
}
const Main = styled.main`
  padding: 40px 46px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const H1 = styled.h1`
  text-indent: 20px;
  font-size: 2em;
  text-align: center;
`;

const Text = styled.p`
  text-align: center;
  line-height: 1.3;
  font-family: Robo;
`;

const Button = styled.button`
  border-radius: 100px;
  padding: 10px 20px;
  background-color: ${theme.lightOrange};

  &:hover {
    background-color: ${theme.orange};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
