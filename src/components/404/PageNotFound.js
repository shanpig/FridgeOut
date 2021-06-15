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
      if (time === 1) history.push('/');
      setTime(time - 1);
    }, 1000);

    return () => clearTimeout(countDown);
  }, [time, history]);

  return (
    <Main>
      <Animated animationInDuration={1500} animationIn="fadeInDown">
        <Icon src={IconSrc} />
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

const Icon = styled.img`
  width: 150px;
  height: 150px;
`;

const Text = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: white;
  line-height: 1.7;
`;

const CountDown = styled.span``;
