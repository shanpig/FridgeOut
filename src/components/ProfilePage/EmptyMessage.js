import styled from 'styled-components';
import { theme } from '../../variables';

export default function EmptyMessage({ text }) {
  return (
    <NoMessages>
      <lottie-player
        src="https://assets2.lottiefiles.com/private_files/lf30_gctc76jz.json"
        background="transparent"
        speed="1"
        style={{ width: '200px', height: '200px' }}
        loop
        autoplay
      ></lottie-player>
      <Text>{text}</Text>
    </NoMessages>
  );
}

const NoMessages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
`;
const Text = styled.h2`
  color: ${theme.darkbrown};
`;
