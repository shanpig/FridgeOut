import styled from 'styled-components';
import { mainContentConfig } from '../../variables';
import IconSrc from '../../images/logo-small-nobg.svg';
import { Animated } from 'react-animated-css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const countDownTime = 5;

export default function PageNotFound() {
  const [time, setTime] = useState(countDownTime);
  const history = useHistory();

  useEffect(() => {
    const countDown = setTimeout(() => {
      if (time === 0) history.push('/');
      setTime(time - 1);
    }, 1000);

    return () => clearTimeout(countDown);
  }, [time]);
  return (
    <Main>
      <Animated animationInDuration={1500} animationIn="fadeInDown">
        <Icon src={IconSrc}></Icon>
      </Animated>
      <Animated animationInDuration={1500} animationIn="fadeInUp">
        <Text>沒有這個頁面</Text>
        <Text>
          將在 <CountDown>{time}</CountDown> 秒後重新導向至首頁...
        </Text>
      </Animated>
    </Main>
  );
}

const Main = styled.main`
  height: ${mainContentConfig.mobile_height};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px 0;
  font-family: 'Montserrat', 'Noto Sans TC';

  @media screen and (min-width: 769px) {
    height: ${mainContentConfig.computer_height};
  }
`;

// const Card = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

const H1 = styled.h1`
  font-size: 8em;
`;

const Icon = styled.img`
  width: 150px;
  height: 150px;
  /* animation: pulse 1s ease infinite; */
`;

const Text = styled.div`
  font-size: 1.5em;
  text-align: center;
  line-height: 1.7;
`;

const CountDown = styled.span``;
